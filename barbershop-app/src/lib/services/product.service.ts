/**
 * Serviço de produtos e serviços
 * 
 * Este serviço gerencia os produtos e serviços oferecidos pela barbearia,
 * incluindo estoque, preços e categorias.
 */

import { Product, Service, Order, OrderItem } from '../types';
import { 
  getAll, 
  query, 
  insert, 
  update, 
  getById, 
  remove 
} from './database.service';
import { addClientInteraction } from './client.service';

/**
 * Obtém todos os produtos
 */
export async function getAllProducts(): Promise<Product[]> {
  return await getAll<Product>('products');
}

/**
 * Obtém um produto pelo ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  return await getById<Product>('products', id);
}

/**
 * Obtém produtos por categoria
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await query<Product>('products', { category });
}

/**
 * Cria um novo produto
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
  try {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    return await insert<Product>('products', newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return null;
  }
}

/**
 * Atualiza um produto existente
 */
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  try {
    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return await update<Product>('products', id, updatedData);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return null;
  }
}

/**
 * Atualiza o estoque de um produto
 */
export async function updateProductStock(id: string, quantity: number): Promise<Product | null> {
  try {
    const product = await getProductById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    
    const newStock = product.stock + quantity;
    if (newStock < 0) {
      throw new Error('Estoque insuficiente');
    }
    
    return await update<Product>('products', id, {
      stock: newStock,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    return null;
  }
}

/**
 * Desativa um produto
 */
export async function deactivateProduct(id: string): Promise<boolean> {
  try {
    const updated = await update<Product>('products', id, {
      isActive: false,
      updatedAt: new Date().toISOString()
    });
    
    return !!updated;
  } catch (error) {
    console.error('Erro ao desativar produto:', error);
    return false;
  }
}

/**
 * Obtém todos os serviços
 */
export async function getAllServices(): Promise<Service[]> {
  return await getAll<Service>('services');
}

/**
 * Obtém um serviço pelo ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  return await getById<Service>('services', id);
}

/**
 * Obtém serviços por categoria
 */
export async function getServicesByCategory(category: string): Promise<Service[]> {
  return await query<Service>('services', { category });
}

/**
 * Cria um novo serviço
 */
export async function createService(serviceData: Omit<Service, 'id'>): Promise<Service | null> {
  try {
    const newService: Service = {
      ...serviceData,
      id: `service-${Date.now()}`,
      isActive: true
    };
    
    return await insert<Service>('services', newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    return null;
  }
}

/**
 * Atualiza um serviço existente
 */
export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  try {
    return await update<Service>('services', id, data);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    return null;
  }
}

/**
 * Desativa um serviço
 */
export async function deactivateService(id: string): Promise<boolean> {
  try {
    const updated = await update<Service>('services', id, {
      isActive: false
    });
    
    return !!updated;
  } catch (error) {
    console.error('Erro ao desativar serviço:', error);
    return false;
  }
}

/**
 * Cria um novo pedido
 */
export async function createOrder(
  clientId: string, 
  items: Array<{ productId: string, quantity: number }>,
  paymentMethod: string
): Promise<Order | null> {
  try {
    // Verificar estoque e calcular total
    let total = 0;
    const orderItems: OrderItem[] = [];
    
    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto ${product.name}`);
      }
      
      const subtotal = product.price * item.quantity;
      total += subtotal;
      
      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal
      });
      
      // Atualizar estoque
      await updateProductStock(product.id, -item.quantity);
    }
    
    // Criar pedido
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      clientId,
      items: orderItems,
      total,
      status: 'pending',
      paymentMethod,
      createdAt: new Date().toISOString()
    };
    
    const order = await insert<Order>('orders', newOrder);
    
    // Registrar interação do cliente
    await addClientInteraction({
      clientId,
      type: 'purchase',
      date: new Date().toISOString(),
      value: total,
      details: `Compra de ${orderItems.length} produtos`,
      source: 'loja'
    });
    
    return order;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return null;
  }
}

/**
 * Atualiza o status de um pedido
 */
export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
  try {
    return await update<Order>('orders', id, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return null;
  }
}

/**
 * Obtém pedidos de um cliente
 */
export async function getClientOrders(clientId: string): Promise<Order[]> {
  return await query<Order>('orders', { clientId });
}

/**
 * Obtém um pedido pelo ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  return await getById<Order>('orders', id);
}

/**
 * Cancela um pedido
 */
export async function cancelOrder(id: string): Promise<boolean> {
  try {
    const order = await getOrderById(id);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    // Verificar se o pedido já foi entregue
    if (order.status === 'delivered') {
      throw new Error('Não é possível cancelar um pedido já entregue');
    }
    
    // Atualizar status
    const updated = await update<Order>('orders', id, {
      status: 'cancelled',
      updatedAt: new Date().toISOString()
    });
    
    if (updated) {
      // Devolver itens ao estoque
      for (const item of order.items) {
        await updateProductStock(item.productId, item.quantity);
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao cancelar pedido:', error);
    return false;
  }
}
