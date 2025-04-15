/**
 * Testes para o serviço de banco de dados
 */

import { 
  initDatabase, 
  getAll, 
  getById, 
  insert, 
  update, 
  remove, 
  query,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser
} from '../database.service';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock do objeto window
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Database Service', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
    
    // Mock de retorno padrão para getItem
    localStorageMock.getItem.mockImplementation(() => null);
  });
  
  describe('initDatabase', () => {
    it('should initialize the database and create empty collections if none exist', () => {
      initDatabase();
      
      // Verificar se tentou carregar dados do localStorage
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(6);
      
      // Verificar se criou coleções vazias
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(6);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('barbershop_users', '[]');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('barbershop_appointments', '[]');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('barbershop_products', '[]');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('barbershop_orders', '[]');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('barbershop_services', '[]');
    });
    
    it('should load existing data from localStorage', () => {
      // Simular dados existentes
      const users = [{ id: 'user-1', name: 'Test User' }];
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'barbershop_users') {
          return JSON.stringify(users);
        }
        return null;
      });
      
      initDatabase();
      
      // Verificar se carregou dados existentes
      expect(localStorageMock.getItem).toHaveBeenCalledWith('barbershop_users');
      
      // Não deve criar uma coleção vazia para usuários
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith('barbershop_users', '[]');
    });
  });
  
  describe('CRUD operations', () => {
    beforeEach(() => {
      // Inicializar o banco de dados antes de cada teste
      initDatabase();
      
      // Limpar mocks após inicialização
      jest.clearAllMocks();
    });
    
    describe('insert', () => {
      it('should insert a new item and save to localStorage', async () => {
        const user = { id: 'user-1', name: 'Test User' };
        
        // Simular que a coleção de usuários já existe
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify([]);
          }
          return null;
        });
        
        await insert('users', user);
        
        // Verificar se salvou no localStorage
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'barbershop_users',
          expect.stringContaining('Test User')
        );
      });
    });
    
    describe('getAll', () => {
      it('should return all items from a collection', async () => {
        const users = [
          { id: 'user-1', name: 'User 1' },
          { id: 'user-2', name: 'User 2' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await getAll('users');
        
        expect(result).toEqual(users);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('barbershop_users');
      });
      
      it('should return an empty array if collection does not exist', async () => {
        localStorageMock.getItem.mockImplementation(() => null);
        
        const result = await getAll('nonexistent');
        
        expect(result).toEqual([]);
      });
    });
    
    describe('getById', () => {
      it('should return an item by ID', async () => {
        const users = [
          { id: 'user-1', name: 'User 1' },
          { id: 'user-2', name: 'User 2' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await getById('users', 'user-2');
        
        expect(result).toEqual(users[1]);
      });
      
      it('should return null if item does not exist', async () => {
        const users = [{ id: 'user-1', name: 'User 1' }];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await getById('users', 'nonexistent');
        
        expect(result).toBeNull();
      });
    });
    
    describe('update', () => {
      it('should update an existing item', async () => {
        const users = [
          { id: 'user-1', name: 'User 1', email: 'user1@example.com' },
          { id: 'user-2', name: 'User 2', email: 'user2@example.com' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const updatedData = { name: 'Updated User' };
        const result = await update('users', 'user-1', updatedData);
        
        // Verificar resultado
        expect(result).toEqual({
          id: 'user-1',
          name: 'Updated User',
          email: 'user1@example.com'
        });
        
        // Verificar se salvou no localStorage
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'barbershop_users',
          expect.stringContaining('Updated User')
        );
      });
      
      it('should return null if item does not exist', async () => {
        const users = [{ id: 'user-1', name: 'User 1' }];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await update('users', 'nonexistent', { name: 'Updated' });
        
        expect(result).toBeNull();
      });
    });
    
    describe('remove', () => {
      it('should remove an item by ID', async () => {
        const users = [
          { id: 'user-1', name: 'User 1' },
          { id: 'user-2', name: 'User 2' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await remove('users', 'user-1');
        
        expect(result).toBe(true);
        
        // Verificar se salvou no localStorage sem o item removido
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'barbershop_users',
          expect.not.stringContaining('User 1')
        );
      });
      
      it('should return false if item does not exist', async () => {
        const users = [{ id: 'user-1', name: 'User 1' }];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await remove('users', 'nonexistent');
        
        expect(result).toBe(false);
      });
    });
    
    describe('query', () => {
      it('should filter items based on criteria', async () => {
        const users = [
          { id: 'user-1', name: 'User 1', type: 'client' },
          { id: 'user-2', name: 'User 2', type: 'professional' },
          { id: 'user-3', name: 'User 3', type: 'client' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await query('users', { type: 'client' });
        
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('user-1');
        expect(result[1].id).toBe('user-3');
      });
      
      it('should return empty array if no items match criteria', async () => {
        const users = [
          { id: 'user-1', name: 'User 1', type: 'client' },
          { id: 'user-2', name: 'User 2', type: 'professional' }
        ];
        
        // Simular dados existentes
        localStorageMock.getItem.mockImplementation((key) => {
          if (key === 'barbershop_users') {
            return JSON.stringify(users);
          }
          return null;
        });
        
        const result = await query('users', { type: 'admin' });
        
        expect(result).toEqual([]);
      });
    });
  });
  
  describe('User management', () => {
    beforeEach(() => {
      // Inicializar o banco de dados antes de cada teste
      initDatabase();
      
      // Limpar mocks após inicialização
      jest.clearAllMocks();
    });
    
    describe('setCurrentUser and getCurrentUser', () => {
      it('should set and get the current user', () => {
        const user = { id: 'user-1', name: 'Test User' };
        
        setCurrentUser(user);
        
        // Verificar se salvou no localStorage
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'barbershop_current_user',
          JSON.stringify(user)
        );
        
        // Verificar se getCurrentUser retorna o usuário correto
        const currentUser = getCurrentUser();
        expect(currentUser).toEqual(user);
      });
      
      it('should handle null user', () => {
        setCurrentUser(null);
        
        // Verificar se removeu do localStorage
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('barbershop_current_user');
        
        // Verificar se getCurrentUser retorna null
        const currentUser = getCurrentUser();
        expect(currentUser).toBeNull();
      });
    });
    
    describe('clearCurrentUser', () => {
      it('should clear the current user', () => {
        // Primeiro definir um usuário
        const user = { id: 'user-1', name: 'Test User' };
        setCurrentUser(user);
        
        // Limpar mocks
        jest.clearAllMocks();
        
        // Limpar usuário
        clearCurrentUser();
        
        // Verificar se removeu do localStorage
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('barbershop_current_user');
        
        // Verificar se getCurrentUser retorna null
        const currentUser = getCurrentUser();
        expect(currentUser).toBeNull();
      });
    });
  });
});
