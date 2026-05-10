"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { ShieldAlert, ShieldCheck, Activity, Globe, Server } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/logs');
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        }
      } catch (error) { console.error("Fetch error:", error); }
      finally { setLoading(false); }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- DATA TRANSFORMATION FOR CHARTS ---
  const pieData = useMemo(() => {
    const malicious = logs.filter(l => l.prediction === 'malicious').length;
    const safe = logs.length - malicious;
    return [
      { name: 'Safe', value: safe, color: '#10b981' },
      { name: 'Malicious', value: malicious, color: '#f43f5e' }
    ];
  }, [logs]);

  const barData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(log => {
      if (log.prediction === 'malicious' && log.explanation) {
        const reasons = log.explanation.split(' | ');
        reasons.forEach((r: string) => {
          counts[r] = (counts[r] || 0) + 1;
        });
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count })).slice(0, 5);
  }, [logs]);

  const maliciousCount = logs.filter(l => l.prediction === 'malicious').length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 bg-[#020617] min-h-screen text-slate-100 font-sans">
      
      {/* 1. TOP STATS BAR */}
      <header className="flex flex-wrap items-center justify-between bg-[#0f172a]/50 p-4 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-2 rounded-lg"><Activity className="text-blue-400" size={24}/></div>
            <div>
                <h1 className="text-lg font-black tracking-tight leading-none uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AEGIS // DNS AI</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">AI-Powered Command Center</p>
            </div>
        </div>
        <div className="flex gap-8 px-6 border-x border-slate-800">
            <headerItem label="Total Queries" value={logs.length} />
            <headerItem label="Threat Rate" value={`${((maliciousCount / (logs.length || 1)) * 100).toFixed(1)}%`} color="text-rose-500" />
            <headerItem label="Safe Rate" value={`${(((logs.length - maliciousCount) / (logs.length || 1)) * 100).toFixed(1)}%`} color="text-emerald-500" />
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Active
        </div>
      </header>

      {/* 2. ANALYTICS GRID (PIE & BAR CHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Traffic Health */}
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6 shadow-2xl h-[350px]">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Traffic Health Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Top Threat Vectors */}
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-6 shadow-2xl h-[350px]">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Top AI Threat Triggers</h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold tracking-widest italic">No Threats Logged</div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM SECTION: WALL OF LOGS */}
      <div className="bg-[#0f172a]/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0f172a]/50 flex justify-between items-center">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Wall of Logs // Live Feed</h2>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Updating via Real-time Sync</span>
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-950/80 sticky top-0 z-10 text-slate-500 border-b border-slate-800 font-black uppercase">
              <tr>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Verdict</th>
                <th className="px-6 py-4">Conf. Score</th>
                <th className="px-6 py-4">Reasoning</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20 transition-all group">
                  <td className="px-6 py-3 font-bold text-slate-300 group-hover:text-blue-400">{log.domain}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-[4px] font-black tracking-tighter ${log.prediction === 'malicious' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}>
                      {log.prediction === 'malicious' ? 'MALICIOUS' : 'SAFE'}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-mono text-slate-500">{(log.score / 100).toFixed(2)}</td>
                  <td className="px-6 py-3 text-slate-400 max-w-xs truncate">{log.explanation}</td>
                  <td className="px-6 py-3 text-slate-600 font-mono">{new Date(log.created_at).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function headerItem({ label, value, color = "text-slate-200" }: any) {
  return (
    <div className="text-center">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
        <p className={`text-sm font-black ${color}`}>{value}</p>
    </div>
  );
}