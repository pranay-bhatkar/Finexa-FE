import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
  data: { month: string; income: number; expense: number; savings: number }[];
}

export const TrendsChart: React.FC<TrendsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <Line type="monotone" dataKey="income" stroke="#0AFDAB" />
        <Line type="monotone" dataKey="expense" stroke="#FF4D4D" />
        <Line type="monotone" dataKey="savings" stroke="#FFD700" />
      </LineChart>
    </ResponsiveContainer>
  );
};
