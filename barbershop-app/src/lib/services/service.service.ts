import { Service } from '../types';
import { create, get, getAll, update, remove } from './database.service';
import { logger } from './logger.service';

export async function createService(data: Omit<Service, keyof BaseRecord>): Promise<Service | null> {
  try {
    const now = new Date().toISOString();
    const service = await create<Service>('services', {
      ...data,
      id: crypto.randomUUID(),
      isActive: true,
      createdAt: now,
      updatedAt: now
    });
    return service;
  } catch (error) {
    logger.error('Error creating service:', error);
    return null;
  }
}

export async function getService(id: string): Promise<Service | null> {
  try {
    const service = await get<Service>('services', id);
    return service;
  } catch (error) {
    logger.error('Error getting service:', error);
    return null;
  }
}

export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await getAll<'services'>('services');
    return services as Service[];
  } catch (error) {
    logger.error('Error getting all services:', error);
    return [];
  }
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  try {
    const service = await update<Service>('services', id, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return service;
  } catch (error) {
    logger.error('Error updating service:', error);
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    await remove('services', id);
    return true;
  } catch (error) {
    logger.error('Error deleting service:', error);
    return false;
  }
}
