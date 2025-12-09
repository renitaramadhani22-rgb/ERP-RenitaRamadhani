import React, { useState } from 'react';
import { MOCK_LEADS } from '../constants';
import { Lead, LeadStatus } from '../types';
import { scoreLead } from '../services/geminiService';
import { Mail, Phone, ArrowRight, Star, Loader2, CheckCircle2 } from 'lucide-react';

const CRMModule: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [scoringId, setScoringId] = useState<string | null>(null);

  const handleScoreLead = async (lead: Lead) => {
    setScoringId(lead.id);
    const result = await scoreLead(JSON.stringify(lead));
    
    setLeads(prev => prev.map(l => 
        l.id === lead.id ? { ...l, aiScore: result.score } : l
    ));
    setScoringId(null);
  };

  const statusColors = {
    [LeadStatus.NEW]: 'bg-blue-100 text-blue-700 border-blue-200',
    [LeadStatus.CONTACTED]: 'bg-amber-100 text-amber-700 border-amber-200',
    [LeadStatus.QUALIFIED]: 'bg-purple-100 text-purple-700 border-purple-200',
    [LeadStatus.PROPOSAL]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [LeadStatus.WON]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [LeadStatus.LOST]: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Pipeline Management</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
            + New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColors[lead.status]}`}>
                            {lead.status}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 mt-2">{lead.name}</h3>
                        <p className="text-sm text-slate-500">{lead.company}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-slate-700">${lead.value.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Est. Value</p>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {lead.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        Last Contact: {lead.lastContact}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {scoringId === lead.id ? (
                            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-1" title="AI Conversion Probability">
                                <Star className={`w-5 h-5 ${lead.aiScore && lead.aiScore > 70 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                <span className="font-bold text-slate-700">{lead.aiScore || '-'}%</span>
                            </div>
                        )}
                        <span className="text-xs text-slate-400 font-medium">AI Score</span>
                    </div>
                    
                    <button 
                        onClick={() => handleScoreLead(lead)}
                        disabled={scoringId === lead.id}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                    >
                        Analyze <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-transparent -mr-8 -mt-8 rounded-full pointer-events-none"></div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CRMModule;