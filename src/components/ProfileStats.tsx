import React from 'react';

interface ProfileStatsProps {
  pg: number;
  cg: number;
  gp: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ pg, cg, gp }) => {
  return (
    <div className="flex justify-center space-x-8">
      <StatItem label="PG" value={pg} />
      <StatItem label="CG" value={cg} />
      <StatItem label="GP" value={gp} />
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-1">
        <span className="text-xl font-bold">{value}</span>
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default ProfileStats;