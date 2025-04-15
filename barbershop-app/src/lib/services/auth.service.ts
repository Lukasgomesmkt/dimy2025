/**
 * Serviço de autenticação unificado
 */

import { RegisterData } from './validation.service';
import { DatabaseService } from './database.service';
import { CryptoService } from './crypto.service';
import { User } from '../types';

export class AuthService {
  private db: DatabaseService;
  private crypto: CryptoService;

  constructor() {
    this.db = new DatabaseService();
    this.crypto = new CryptoService();
  }

  async registerUser(data: RegisterData): Promise<User> {
    const hashedPassword = await this.crypto.hashPassword(data.password);
    const user = await this.db.create('users', {
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async verifyLocalPassword(email: string, password: string): Promise<boolean> {
    const user = await this.db.findOne('users', { email });
    if (!user) return false;
    return this.crypto.comparePasswords(password, user.password);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.db.findOne('users', { email });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await this.crypto.hashPassword(data.password);
    }
    return this.db.update('users', id, data);
  }
}
