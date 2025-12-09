import React from 'react';
import { ModuleType } from '../types';
import { LayoutDashboard, BookOpen, Package, Users, ShoppingCart, UserCheck, Bell, Search, Hexagon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, onModuleChange }) => {
  const navItems = [
    { id: ModuleType.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ModuleType.ACCOUNTING, label: 'Accounting', icon: BookOpen },
    { id: ModuleType.INVENTORY, label: 'Inventory', icon: Package },
    { id: ModuleType.CRM, label: 'CRM', icon: Users },
    { id: ModuleType.PROCUREMENT, label: 'Procurement', icon: ShoppingCart },
    { id: ModuleType.HR, label: 'HR & Payroll', icon: UserCheck },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                <Hexagon className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Nexus<span className="text-indigo-400">ERP</span></h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                    JD
                </div>
                <div>
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-slate-500">Chief Accountant</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                    type="text" 
                    placeholder="Global search (invoices, clients, SKU)..." 
                    className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;