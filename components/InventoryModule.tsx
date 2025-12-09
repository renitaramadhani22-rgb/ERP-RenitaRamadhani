import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { forecastInventory } from '../services/geminiService';
import { InventoryItem } from '../types';
import { Package, AlertCircle, BrainCircuit } from 'lucide-react';

const InventoryModule: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [forecast, setForecast] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleForecast = async (item: InventoryItem) => {
    setSelectedItem(item);
    setLoading(true);
    setForecast('');
    
    // Simulate history for the prompt
    const history = `Last 3 months usage: 12 units, 15 units, 18 units. Trend is increasing. Current stock: ${item.quantity}.`;
    
    const result = await forecastInventory(item.name, history);
    setForecast(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900">Add Stock</button>
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Stock Count</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">SKU</th>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4 text-center">Qty</th>
                        <th className="px-6 py-4 text-right">Value</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_INVENTORY.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">{item.sku}</td>
                            <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                                <Package className="w-4 h-4 text-indigo-400" />
                                {item.name}
                                {item.quantity <= item.reorderLevel && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Low Stock</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-slate-700">{item.quantity}</td>
                            <td className="px-6 py-4 text-right text-slate-600">${item.unitPrice.toLocaleString()}</td>
                            <td className="px-6 py-4 text-center">
                                <button 
                                    onClick={() => handleForecast(item)}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    title="AI Forecast"
                                >
                                    <BrainCircuit className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 h-fit">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                AI Demand Forecasting
            </h3>
            {selectedItem ? (
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Analyzing Product</p>
                        <p className="text-lg font-bold text-slate-800">{selectedItem.name}</p>
                    </div>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-500" />
                            <p className="text-sm">Calculating stock depletion...</p>
                        </div>
                    ) : (
                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-indigo-900 text-sm leading-relaxed shadow-sm">
                            {forecast}
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a product from the list to view AI-powered demand forecasts.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

function Loader2(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}

export default InventoryModule;