import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', Revenue: 4000, Expenses: 2400 },
  { name: 'Feb', Revenue: 3000, Expenses: 1398 },
  { name: 'Mar', Revenue: 2000, Expenses: 9800 },
  { name: 'Apr', Revenue: 2780, Expenses: 3908 },
  { name: 'May', Revenue: 1890, Expenses: 4800 },
  { name: 'Jun', Revenue: 2390, Expenses: 3800 },
  { name: 'Jul', Revenue: 3490, Expenses: 4300 },
];

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
      <div className={`flex items-center mt-2 text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        <span className="font-semibold">{trend}</span>
        <span className="text-slate-400 ml-1">vs last month</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Executive Overview</h2>
            <p className="text-slate-500 text-sm">Real-time enterprise performance metrics.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                Generate AI Report
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$128,430" trend="+12.5%" icon={DollarSign} color="bg-indigo-500" />
        <StatCard title="Active Leads" value="45" trend="+5.2%" icon={Users} color="bg-blue-500" />
        <StatCard title="Inventory Value" value="$84,200" trend="-2.4%" icon={Package} color="bg-emerald-500" />
        <StatCard title="Net Profit" value="$32,450" trend="+8.1%" icon={TrendingUp} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Financial Performance</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Cash Flow Projection (AI Model)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;