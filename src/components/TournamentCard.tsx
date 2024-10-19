import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TournamentCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ title, image, onClick }) => {
  return (
    <div className="relative overflow-hidden rounded-lg h-24 cursor-pointer" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  );
};

export default TournamentCard;