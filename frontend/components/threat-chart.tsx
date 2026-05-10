import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ThreatChartProps {
  data: Array<{ name: string; total: number; blocked: number }>;
}

export default function ThreatChart({ data }: ThreatChartProps) {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3d6d" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#ff3d6d" stopOpacity={0.12} />
            </linearGradient>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff8c" stopOpacity={0.75} />
              <stop offset="100%" stopColor="#00ff8c" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1f2937" vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              color: '#e2e8f0',
            }}
          />
          <Area type="monotone" dataKey="total" stroke="#00ff8c" fill="url(#totalGradient)" fillOpacity={1} />
          <Area type="monotone" dataKey="blocked" stroke="#ff3d6d" fill="url(#blockedGradient)" fillOpacity={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
