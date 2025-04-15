/**
 * Serviço de agendamentos
 *
 * Este serviço gerencia os agendamentos da barbearia, incluindo
 * criação, atualização, cancelamento e consulta de agendamentos.
 */

import { Appointment } from '../types';
import { get, getAll, update } from './database.service';
import { logger } from './logger.service';
import { cache } from './cache.service';

const CACHE_TTL = 5 * 60; // 5 minutes

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  try {
    // Check cache first
    const cached = cache.get(`appointment_${id}`);
    if (cached) return cached as Appointment;

    const appointment = await get<Appointment>('appointments', id);
    if (appointment) {
      cache.set(`appointment_${id}`, appointment, { ttl: CACHE_TTL });
    }
    return appointment;
  } catch (error) {
    logger.error('Error fetching appointment:', error);
    return null;
  }
}

export async function getClientAppointments(clientId: string): Promise<Appointment[]> {
  try {
    // Check cache first
    const cacheKey = `appointments_client_${clientId}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached as Appointment[];

    const appointments = await getAll<'appointments'>('appointments');
    const filtered = appointments.filter(a => (a as Appointment).clientId === clientId);

    cache.set(cacheKey, filtered, { ttl: CACHE_TTL });
    return filtered as Appointment[];
  } catch (error) {
    logger.error('Error fetching client appointments:', error);
    return [];
  }
}

export async function getProfessionalAppointments(professionalId: string): Promise<Appointment[]> {
  try {
    // Check cache first
    const cacheKey = `appointments_professional_${professionalId}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached as Appointment[];

    const appointments = await getAll<'appointments'>('appointments');
    const filtered = appointments.filter(a => (a as Appointment).professionalId === professionalId);

    cache.set(cacheKey, filtered, { ttl: CACHE_TTL });
    return filtered as Appointment[];
  } catch (error) {
    logger.error('Error fetching professional appointments:', error);
    return [];
  }
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment | null> {
  try {
    const appointment = await update('appointments', id, {
      status,
      updatedAt: new Date().toISOString()
    });

    if (appointment) {
      // Update appointment cache
      cache.set(`appointment_${id}`, appointment, { ttl: CACHE_TTL });
      // Clear client and professional caches
      cache.remove(`appointments_client_${appointment.clientId}`);
      cache.remove(`appointments_professional_${appointment.professionalId}`);
    }

    return appointment;
  } catch (error) {
    logger.error('Error updating appointment status:', error);
    return null;
  }
}
