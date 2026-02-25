// components/StatCard.tsx
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number; // ex: +12 ou -5
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-surface dark:bg-dark-surface rounded-2xl border border-border-custom dark:border-dark-border p-5 shadow-sm flex items-start justify-between">
      {/* Left */}
      <div>
        <p className="text-xs font-medium text-text-muted dark:text-dark-text-muted mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-text dark:text-dark-text-primary">
          {value}
        </p>

        {/* Trend optionnel */}
        {trend !== undefined && (
          <p
            className={`text-xs font-medium mt-1 ${
              trend >= 0
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last month
          </p>
        )}
      </div>

      {/* Icon optionnel */}
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-primary-soft dark:bg-dark-primary-soft flex items-center justify-center text-primary dark:text-dark-primary flex-shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
}
