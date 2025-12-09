import React, { useState } from 'react';
import { MOCK_JOURNAL_ENTRIES } from '../constants';
import { analyzeFinancialData } from '../services/geminiService';
import { AIAnalysisResult } from '../types';
import { FileText, Loader2, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

const AccountingModule: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  const handleAIAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeFinancialData(JSON.stringify(MOCK_JOURNAL_ENTRIES));
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">General Ledger & Journals</h2>
        <button 
            onClick={handleAIAnalysis}
            disabled={analyzing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
        >
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {analyzing ? 'Analyzing Books...' : 'AI Financial Audit'}
        </button>
      </div>

      {analysis && (
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${analysis.riskLevel === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {analysis.riskLevel === 'HIGH' ? <AlertTriangle className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">AI Financial Assessment</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{analysis.summary}</p>
                    
                    <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-2">Strategic Recommendations</h4>
                    <ul className="space-y-2">
                        {analysis.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-100">
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{i + 1}</span>
                                {rec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Ref ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Account</th>
                        <th className="px-6 py-4 text-right">Debit</th>
                        <th className="px-6 py-4 text-right">Credit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_JOURNAL_ENTRIES.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-indigo-600">{entry.reference}</td>
                            <td className="px-6 py-4 text-slate-600">{entry.date}</td>
                            <td className="px-6 py-4 text-slate-800">{entry.description}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                                    {entry.account}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-600 font-medium">
                                {entry.type === 'DEBIT' ? `$${entry.amount.toLocaleString()}` : '-'}
                            </td>
                            <td className="px-6 py-4 text-right text-slate-600 font-medium">
                                {entry.type === 'CREDIT' ? `$${entry.amount.toLocaleString()}` : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-8 text-sm font-bold text-slate-700">
            <span>Total Debits: $59,950</span>
            <span>Total Credits: $59,950</span>
        </div>
      </div>
    </div>
  );
};

export default AccountingModule;