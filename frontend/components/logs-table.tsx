interface LogEntry {
  id: number;
  domain: string;
  prediction: 'Safe' | 'Malicious';
  score: number;
  created_at: string;
  tld: string;
  explanation: string;
}

interface LogsTableProps {
  logs: LogEntry[];
}

export default function LogsTable({ logs }: LogsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glow">
      <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-300">
        <thead className="border-b border-white/10 bg-slate-950/60 text-xs uppercase tracking-[0.3em] text-slate-500">
          <tr>
            <th className="px-4 py-3">Domain</th>
            <th className="px-4 py-3">TLD</th>
            <th className="px-4 py-3">Verdict</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-white/5">
              <td className="px-4 py-4 font-medium text-white">{log.domain}</td>
              <td className="px-4 py-4">{log.tld}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                    log.prediction === 'Safe' ? 'badge-safe' : 'badge-blocked'
                  }`}
                >
                  {log.prediction}
                </span>
              </td>
              <td className="px-4 py-4">{log.score}</td>
              <td className="px-4 py-4 max-w-[280px] truncate text-slate-400">{log.explanation}</td>
              <td className="px-4 py-4">{new Date(log.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
