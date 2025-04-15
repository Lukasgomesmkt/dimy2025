import { NextRequest } from 'next/server';
import {
  getAppointmentById,
  getClientAppointments,
  getProfessionalAppointments,
  updateAppointmentStatus
} from '@/lib/services/appointment.service';
import { insert } from '@/lib/services/database.service';
import { ApiHandlerService, ApiError } from '@/lib/services/api-handler.service';
import { Appointment } from '@/lib/types';

type CreateAppointmentData = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>;

export async function GET(request: NextRequest) {
  return ApiHandlerService.execute<Appointment | Appointment[]>(async (req) => {
    // Verificar autenticação
    await ApiHandlerService.requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const clientId = searchParams.get('clientId');
    const professionalId = searchParams.get('professionalId');

    if (id) {
      const appointment = await getAppointmentById(id);
      if (!appointment) {
        throw new ApiError('Agendamento não encontrado', 404);
      }
      return {
        success: true,
        data: appointment
      };
    }

    if (clientId) {
      const appointments = await getClientAppointments(clientId);
      return {
        success: true,
        data: appointments
      };
    }

    if (professionalId) {
      const appointments = await getProfessionalAppointments(professionalId);
      return {
        success: true,
        data: appointments
      };
    }

    throw new ApiError('ID do cliente ou profissional é obrigatório');
  }, request);
}

export async function POST(request: NextRequest) {
  return ApiHandlerService.execute<Appointment>(async (req) => {
    // Verificar autenticação
    await ApiHandlerService.requireAuth(req);

    const data = await req.json();

    // Validar dados do agendamento
    const appointmentData = ApiHandlerService.validate<CreateAppointmentData>(data, {
      clientId: { required: true },
      professionalId: { required: true },
      serviceId: { required: true },
      date: { required: true },
      status: { required: true }
    });

    // Criar agendamento
    const now = new Date().toISOString();
    const appointment = await insert('appointments', {
      ...appointmentData,
      createdAt: now,
      updatedAt: now
    });

    if (!appointment) {
      throw new ApiError('Não foi possível criar o agendamento');
    }

    return {
      success: true,
      data: appointment
    };
  }, request);
}

export async function PUT(request: NextRequest) {
  return ApiHandlerService.execute<Appointment>(async (req) => {
    // Verificar autenticação
    await ApiHandlerService.requireAuth(req);

    const data = await req.json();
    const { id, status } = ApiHandlerService.validate<{ id: string; status: Appointment['status'] }>(data, {
      id: { required: true },
      status: { required: true }
    });

    const appointment = await updateAppointmentStatus(id, status);
    if (!appointment) {
      throw new ApiError('Agendamento não encontrado');
    }

    return {
      success: true,
      data: appointment
    };
  }, request);
}
