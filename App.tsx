import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AccountingModule from './components/AccountingModule';
import InventoryModule from './components/InventoryModule';
import CRMModule from './components/CRMModule';
import { ModuleType } from './types';

// Placeholder components for unimplemented modules
const PlaceholderModule = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-96 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
    <h3 className="text-xl font-bold mb-2">{name} Module</h3>
    <p>This module is under development for the demo.</p>
  </div>
);

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.ACCOUNTING:
        return <AccountingModule />;
      case ModuleType.INVENTORY:
        return <InventoryModule />;
      case ModuleType.CRM:
        return <CRMModule />;
      case ModuleType.PROCUREMENT:
        return <PlaceholderModule name="Procurement" />;
      case ModuleType.HR:
        return <PlaceholderModule name="HR & Payroll" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
      {renderModule()}
    </Layout>
  );
};

export default App;