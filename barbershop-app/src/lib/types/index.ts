export * from './base';
export * from './user';
export * from './client';
export * from './product';
export * from './service';
export * from './appointment';
export * from './order';

// Table names type
export type TableName = 'users' | 'products' | 'services' | 'orders' | 'appointments' | 'clients' | 'interactions';

// JSON type for database compatibility
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
