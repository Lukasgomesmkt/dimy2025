/**
 * Serviço de armazenamento persistente
 *
 * Este serviço utiliza localStorage para armazenar dados no navegador
 * e também mantém uma cópia em memória para acesso rápido.
 */

// Tipos de dados
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "client" | "professional";
  birthDate?: string;
  createdAt: string;
  lastLogin?: string;
  preferences?: UserPreferences;
  appointments?: AppointmentSummary[];
}

export interface UserPreferences {
  theme?: "light" | "dark";
  language?: "pt-BR" | "en" | "es";
  notifications?: boolean;
  emailNotifications?: boolean;
}

export interface AppointmentSummary {
  id: string;
  date: string;
  service: string;
  barber: string;
  status: "scheduled" | "completed" | "cancelled";
}

// Chaves de armazenamento
const STORAGE_KEYS = {
  USERS: "barbershop_users",
  CURRENT_USER: "barbershop_current_user",
  AUTH_TOKEN: "authToken",
};

// Cache em memória
let usersCache: StoredUser[] | null = null;
let currentUserCache: StoredUser | null = null;

/**
 * Inicializa o serviço de armazenamento
 */
export function initStorage(): void {
  try {
    if (typeof window === "undefined") return;

    // Carregar usuários do localStorage
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (storedUsers) {
      usersCache = JSON.parse(storedUsers);
    } else {
      usersCache = [];
      // Adicionar usuário pré-cadastrado Lucas Gomes
      const lucasGomes: StoredUser = {
        id: "user-lucas-gomes",
        name: "Lucas Gomes",
        email: "lucas.gomes@example.com",
        phone: "11999887766",
        type: "client",
        birthDate: "1990-01-15",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: "dark",
          language: "pt-BR",
          notifications: true,
          emailNotifications: true,
        },
        appointments: [
          {
            id: "apt-001",
            date: "2025-04-15T14:00:00Z",
            service: "Corte de Cabelo",
            barber: "Carlos Silva",
            status: "scheduled",
          }
        ]
      };
      usersCache.push(lucasGomes);
      saveUsers();
    }

    // Carregar usuário atual do localStorage
    const storedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedCurrentUser) {
      currentUserCache = JSON.parse(storedCurrentUser);
    }
  } catch (error) {
    console.error("Erro ao inicializar o armazenamento:", error);
    usersCache = [];
  }
}

/**
 * Salva os usuários no localStorage
 */
function saveUsers(): void {
  try {
    if (typeof window === "undefined" || !usersCache) return;

    // Converter para string JSON e salvar no localStorage
    const usersJson = JSON.stringify(usersCache);
    localStorage.setItem(STORAGE_KEYS.USERS, usersJson);

    // Verificar se os dados foram salvos corretamente
    const savedData = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!savedData) {
      console.error("Falha ao salvar usuários: dados não encontrados após salvar");
    } else {
      console.log(`Usuários salvos com sucesso. Total de usuários: ${usersCache.length}`);
    }
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
  }
}

/**
 * Salva o usuário atual no localStorage
 */
function saveCurrentUser(): void {
  try {
    if (typeof window === "undefined" || !currentUserCache) return;

    // Converter para string JSON e salvar no localStorage
    const userJson = JSON.stringify(currentUserCache);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userJson);

    // Verificar se os dados foram salvos corretamente
    const savedData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!savedData) {
      console.error("Falha ao salvar usuário atual: dados não encontrados após salvar");
    } else {
      console.log(`Usuário atual salvo com sucesso: ${currentUserCache.name} (${currentUserCache.email})`);
    }
  } catch (error) {
    console.error("Erro ao salvar usuário atual:", error);
  }
}

/**
 * Obtém todos os usuários
 */
export function getAllUsers(): StoredUser[] {
  if (!usersCache) {
    initStorage();
  }
  return usersCache || [];
}

/**
 * Obtém um usuário pelo ID
 */
export function getUserById(id: string): StoredUser | null {
  const users = getAllUsers();
  return users.find(user => user.id === id) || null;
}

/**
 * Obtém um usuário pelo email
 */
export function getUserByEmail(email: string): StoredUser | null {
  const users = getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Adiciona ou atualiza um usuário
 */
export function saveUser(user: StoredUser): void {
  if (!usersCache) {
    initStorage();
  }

  if (!usersCache) {
    usersCache = [];
  }

  const index = usersCache.findIndex(u => u.id === user.id);

  if (index >= 0) {
    // Atualizar usuário existente
    usersCache[index] = { ...usersCache[index], ...user };
  } else {
    // Adicionar novo usuário
    usersCache.push(user);
  }

  saveUsers();
}

/**
 * Define o usuário atual
 */
export function setCurrentUser(user: StoredUser): void {
  currentUserCache = user;
  saveCurrentUser();

  // Atualizar a data do último login
  user.lastLogin = new Date().toISOString();
  saveUser(user);

  // Salvar o token de autenticação
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `token-${user.id}-${Date.now()}`);
    }
  } catch (error) {
    console.error("Erro ao salvar token de autenticação:", error);
  }
}

/**
 * Obtém o usuário atual
 */
export function getCurrentUser(): StoredUser | null {
  if (!currentUserCache) {
    try {
      if (typeof window !== "undefined") {
        const storedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (storedCurrentUser) {
          currentUserCache = JSON.parse(storedCurrentUser);
        }
      }
    } catch (error) {
      console.error("Erro ao obter usuário atual:", error);
    }
  }

  return currentUserCache;
}

/**
 * Limpa o usuário atual (logout)
 */
export function clearCurrentUser(): void {
  currentUserCache = null;

  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  } catch (error) {
    console.error("Erro ao limpar usuário atual:", error);
  }
}

/**
 * Verifica se um email já está em uso
 */
export function isEmailInUse(email: string, excludeUserId?: string): boolean {
  const users = getAllUsers();
  return users.some(user =>
    user.email.toLowerCase() === email.toLowerCase() &&
    (!excludeUserId || user.id !== excludeUserId)
  );
}

/**
 * Verifica se um telefone já está em uso
 */
export function isPhoneInUse(phone: string, excludeUserId?: string): boolean {
  const users = getAllUsers();
  const normalizedPhone = phone.replace(/\D/g, '');

  return users.some(user => {
    const userNormalizedPhone = user.phone.replace(/\D/g, '');
    return userNormalizedPhone === normalizedPhone &&
           (!excludeUserId || user.id !== excludeUserId);
  });
}

// Inicializar o serviço quando este módulo for importado
if (typeof window !== "undefined") {
  initStorage();
}
