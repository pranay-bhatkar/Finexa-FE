import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-300">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </div>
  );
};

export default StatsCard;
