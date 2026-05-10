interface StatusBadgeProps {
  label: string;
  type: 'safe' | 'danger';
}

export default function StatusBadge({ label, type }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        type === 'safe' ? 'badge-safe' : 'badge-blocked'
      }`}
    >
      {label}
    </span>
  );
}
