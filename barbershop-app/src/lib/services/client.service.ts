/**
 * Serviço de clientes
 *
 * Este serviço gerencia todas as operações relacionadas a clientes,
 * incluindo atualização de dados e interações.
 */

import { User, ClientInteraction } from '../types';
import { getById, update, getAll, query } from './database.service';
import { cache } from './cache.service';
import { logger } from './logger.service';

// Cache TTL em segundos
const CACHE_TTL = {
  SHORT: 5 * 60, // 5 minutos
  MEDIUM: 15 * 60, // 15 minutos
  LONG: 60 * 60, // 1 hora
};

/**
 * Obtém todos os clientes
 */
export async function getAllClients(): Promise<User[]> {
  const cacheKey = 'all_clients';

  // Tentar obter do cache primeiro
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData as User[];

  const users = await getAll<User>('users');
  const clients = users.filter(user => user.type === 'client');

  cache.set(cacheKey, clients, { ttl: CACHE_TTL.SHORT });
  return clients;
}

/**
 * Obtém um cliente pelo ID
 */
export async function getClientById(id: string): Promise<User | null> {
  const cacheKey = `client_${id}`;

  // Tentar obter do cache primeiro
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData as User;

  const user = await getById<User>('users', id);
  if (!user || user.type !== 'client') return null;

  cache.set(cacheKey, user, { ttl: CACHE_TTL.MEDIUM });
  return user;
}

/**
 * Obtém as interações de um cliente
 */
export async function getClientInteractions(clientId: string): Promise<ClientInteraction[]> {
  const cacheKey = `client_interactions_${clientId}`;

  // Tentar obter do cache primeiro
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData as ClientInteraction[];

  const interactions = await query<ClientInteraction>('interactions', { clientId });

  cache.set(cacheKey, interactions, { ttl: CACHE_TTL.SHORT });
  return interactions;
}

/**
 * Adiciona uma nova interação com o cliente
 */
export async function addClientInteraction(interaction: Omit<ClientInteraction, 'id'>): Promise<ClientInteraction> {
  const newInteraction: ClientInteraction = {
    id: `interaction-${Date.now()}`,
    ...interaction,
    date: new Date().toISOString()
  };

  // Invalidar cache de interações
  cache.remove(`client_interactions_${interaction.clientId}`);

  return newInteraction;
}

/**
 * Atualiza os dados do cliente
 */
export async function updateClientData(id: string, data: Partial<User>): Promise<User | null> {
  const user = await getClientById(id);
  if (!user) return null;

  const updatedUser = await update('users', id, {
    ...data,
    updatedAt: new Date().toISOString()
  });

  if (updatedUser) {
    // Invalidar caches
    cache.remove(`client_${id}`);
    cache.remove('all_clients');
  }

  return updatedUser;
}

/**
 * Desativa um cliente
 */
export async function deactivateClient(id: string): Promise<boolean> {
  const user = await getClientById(id);
  if (!user) return false;

  const updatedUser = await update('users', id, {
    isActive: false,
    updatedAt: new Date().toISOString()
  });

  if (updatedUser) {
    // Invalidar caches
    cache.remove(`client_${id}`);
    cache.remove('all_clients');
    return true;
  }

  return false;
}
