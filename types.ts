export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  ACCOUNTING = 'ACCOUNTING',
  INVENTORY = 'INVENTORY',
  CRM = 'CRM',
  PROCUREMENT = 'PROCUREMENT',
  HR = 'HR'
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  account: string;
  type: TransactionType;
  amount: number;
  reference: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  lastUpdated: string;
  reorderLevel: number;
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  WON = 'WON',
  LOST = 'LOST'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  value: number;
  status: LeadStatus;
  aiScore?: number; // 0-100
  lastContact: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface AIAnalysisResult {
  summary: string;
  recommendations: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}