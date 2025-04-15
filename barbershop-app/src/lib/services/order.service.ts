// Serviço de pedidos (orders) - mock inicial
import { Order } from '../types';
import { get, getAll, update } from './database.service';

/**
 * Obtém um pedido pelo ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  return await get('orders', id) as Order | null;
}

/**
 * Obtém pedidos de um cliente
 */
export async function getClientOrders(clientId: string): Promise<Order[]> {
  const all = await getAll('orders');
  return (all as Order[]).filter(order => order.clientId === clientId);
}

/**
 * Atualiza o status de um pedido
 */
export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
  return await update('orders', id, {
    status,
    updatedAt: new Date().toISOString()
  }) as Order;
}

/**
 * Cancela um pedido
 */
export async function cancelOrder(id: string): Promise<boolean> {
  const updated = await update('orders', id, {
    status: 'cancelled',
    updatedAt: new Date().toISOString()
  });
  return !!updated;
}
