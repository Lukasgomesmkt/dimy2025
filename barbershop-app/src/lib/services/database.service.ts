/**
 * Serviço de banco de dados
 *
 * Este serviço fornece uma camada de abstração para operações de banco de dados,
 * permitindo alternar facilmente entre localStorage e Supabase.
 */

import { cache } from './cache.service';
import { logger } from './logger.service';
import { supabase } from '../config/supabase';
import { BaseRecord, TableName, DatabaseSchema } from '../types/database';

// Cache TTL em segundos
const CACHE_TTL = {
  SHORT: 60 * 5, // 5 minutos
  MEDIUM: 60 * 30, // 30 minutos
  LONG: 60 * 60 * 24, // 24 horas
};

/**
 * Cria um novo registro na tabela especificada
 */
export async function create<T extends keyof DatabaseSchema>(
  table: T,
  data: Omit<DatabaseSchema[T], keyof BaseRecord>
): Promise<DatabaseSchema[T]> {
  const { data: record, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) {
    logger.error(`Erro ao criar registro na tabela ${table}:`, error);
    throw error;
  }

  cache.set(`table_${table}_id_${record.id}`, record, { ttl: CACHE_TTL.LONG });
  return record;
}

/**
 * Obtém um registro pelo ID na tabela especificada
 */
export async function get<T extends keyof DatabaseSchema>(
  table: T,
  id: string
): Promise<DatabaseSchema[T] | null> {
  const cached = cache.get(`table_${table}_id_${id}`);
  if (cached) return cached as DatabaseSchema[T];

  const { data: record, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    logger.error(`Erro ao obter registro da tabela ${table}:`, error);
    return null;
  }

  if (record) {
    cache.set(`table_${table}_id_${id}`, record, { ttl: CACHE_TTL.LONG });
  }

  return record;
}

/**
 * Obtém todos os registros ativos de uma tabela
 */
export async function getAll<T extends keyof DatabaseSchema>(
  table: T
): Promise<DatabaseSchema[T][]> {
  const cached = cache.get(`table_${table}_all`);
  if (cached) return cached as DatabaseSchema[T][];

  const { data: records, error } = await supabase
    .from(table)
    .select('*')
    .eq('isActive', true);

  if (error) {
    logger.error(`Erro ao obter todos os registros da tabela ${table}:`, error);
    return [];
  }

  cache.set(`table_${table}_all`, records, { ttl: CACHE_TTL.SHORT });
  return records;
}

/**
 * Atualiza um registro existente na tabela especificada
 */
export async function update<T extends keyof DatabaseSchema>(
  table: T,
  id: string,
  data: Partial<Omit<DatabaseSchema[T], keyof BaseRecord>>
): Promise<DatabaseSchema[T]> {
  const { data: record, error } = await supabase
    .from(table)
    .update({ ...data, updatedAt: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    logger.error(`Erro ao atualizar registro na tabela ${table}:`, error);
    throw error;
  }

  cache.delete(`table_${table}_id_${id}`);
  cache.delete(`table_${table}_all`);
  return record;
}

/**
 * Remove (soft delete) um registro na tabela especificada
 */
export async function remove(table: TableName, id: string): Promise<void> {
  const { error } = await supabase
    .from(table)
    .update({ isActive: false, updatedAt: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    logger.error(`Erro ao remover registro na tabela ${table}:`, error);
    throw error;
  }

  cache.delete(`table_${table}_id_${id}`);
  cache.delete(`table_${table}_all`);
}
