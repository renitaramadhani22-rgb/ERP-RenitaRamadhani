import { InventoryItem, JournalEntry, Lead, LeadStatus, TransactionType, Employee } from './types';

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  { id: 'JE-001', date: '2023-10-01', description: 'Sales Revenue - Q3', account: '4000-Revenue', type: TransactionType.CREDIT, amount: 45000, reference: 'INV-1001' },
  { id: 'JE-002', date: '2023-10-01', description: 'Bank Deposit', account: '1000-Cash', type: TransactionType.DEBIT, amount: 45000, reference: 'DEP-1001' },
  { id: 'JE-003', date: '2023-10-02', description: 'Office Rent', account: '6000-Expenses', type: TransactionType.DEBIT, amount: 2500, reference: 'BILL-502' },
  { id: 'JE-004', date: '2023-10-03', description: 'Inventory Purchase', account: '1200-Inventory', type: TransactionType.DEBIT, amount: 12000, reference: 'PO-900' },
  { id: 'JE-005', date: '2023-10-03', description: 'Accounts Payable', account: '2000-AP', type: TransactionType.CREDIT, amount: 12000, reference: 'PO-900' },
  { id: 'JE-006', date: '2023-10-05', description: 'Consulting Services', account: '4100-Service Rev', type: TransactionType.CREDIT, amount: 8000, reference: 'INV-1002' },
  { id: 'JE-007', date: '2023-10-07', description: 'Server Hosting', account: '6100-IT Expenses', type: TransactionType.DEBIT, amount: 450, reference: 'AWS-OCT' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'SKU-001', sku: 'LAP-PRO-16', name: 'Laptop Pro 16"', category: 'Electronics', quantity: 42, unitPrice: 2400, lastUpdated: '2023-10-25', reorderLevel: 10 },
  { id: 'SKU-002', sku: 'MON-4K-27', name: '4K Monitor 27"', category: 'Electronics', quantity: 15, unitPrice: 650, lastUpdated: '2023-10-24', reorderLevel: 20 },
  { id: 'SKU-003', sku: 'KEY-MECH-RGB', name: 'Mechanical Keyboard', category: 'Accessories', quantity: 120, unitPrice: 120, lastUpdated: '2023-10-20', reorderLevel: 50 },
  { id: 'SKU-004', sku: 'ERG-CHAIR-V2', name: 'ErgoChair V2', category: 'Furniture', quantity: 8, unitPrice: 850, lastUpdated: '2023-10-15', reorderLevel: 5 },
  { id: 'SKU-005', sku: 'DK-STAND', name: 'Standing Desk', category: 'Furniture', quantity: 12, unitPrice: 1100, lastUpdated: '2023-10-10', reorderLevel: 5 },
];

export const MOCK_LEADS: Lead[] = [
  { id: 'LD-101', name: 'Alice Freeman', company: 'TechNova Corp', email: 'alice@technova.com', value: 50000, status: LeadStatus.PROPOSAL, lastContact: '2023-10-26', aiScore: 85 },
  { id: 'LD-102', name: 'Bob Smith', company: 'LogiChain Inc', email: 'bob@logichain.com', value: 120000, status: LeadStatus.QUALIFIED, lastContact: '2023-10-25', aiScore: 60 },
  { id: 'LD-103', name: 'Charlie Davis', company: 'RetailGlobal', email: 'c.davis@retailglobal.com', value: 15000, status: LeadStatus.NEW, lastContact: '2023-10-27', aiScore: 30 },
  { id: 'LD-104', name: 'Dana Lee', company: 'BioHealth Systems', email: 'dana@biohealth.com', value: 250000, status: LeadStatus.WON, lastContact: '2023-10-20', aiScore: 98 },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP-001', name: 'John Doe', role: 'Senior Accountant', department: 'Finance', salary: 85000, status: 'Active' },
  { id: 'EMP-002', name: 'Jane Roe', role: 'HR Manager', department: 'Human Resources', salary: 92000, status: 'Active' },
  { id: 'EMP-003', name: 'Richard Miles', role: 'Sales Executive', department: 'Sales', salary: 65000, status: 'On Leave' },
];