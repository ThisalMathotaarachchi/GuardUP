import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const tooltipStyle = {
  background: 'var(--admin-chart-tooltip-bg)',
  border: '1px solid var(--admin-chart-tooltip-border)',
  borderRadius: 8,
  fontSize: 12,
  color: 'var(--admin-chart-tooltip-text)',
  boxShadow: 'var(--admin-chart-tooltip-shadow)',
};

export const AdminBarChart = ({
  data,
  dataKey = 'count',
  labelKey = 'month',
  emptyLabel,
}) => {
  if (!data?.length) {
    return <p className="admin-chart-empty">{emptyLabel || 'No trend data available yet'}</p>;
  }

  return (
    <div className="admin-chart">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--admin-chart-grid)"
            vertical={false}
          />
          <XAxis
            dataKey={labelKey}
            tick={{ fill: 'var(--admin-chart-axis)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'var(--admin-chart-axis)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: 'var(--admin-chart-tooltip-text)' }}
            itemStyle={{ color: 'var(--admin-chart-accent)' }}
            cursor={{ stroke: 'var(--admin-chart-grid)', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            fill="var(--admin-chart-area)"
            stroke="none"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--admin-chart-accent)"
            strokeWidth={2}
            dot={{ fill: 'var(--admin-chart-accent)', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: 'var(--admin-chart-accent)', strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const formatEventType = (type) =>
  String(type || '')
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const formatDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};
