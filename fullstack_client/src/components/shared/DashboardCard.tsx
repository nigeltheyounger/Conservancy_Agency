interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}

const DashboardCard = ({ title, value, icon, trend, className = '' }: DashboardCardProps) => {
  return (
    <div className={`card hover:shadow-lg transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-green-50 rounded-full text-green-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;