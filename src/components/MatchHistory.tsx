// src/components/MatchHistory.tsx
import React from 'react';
import { ChevronLeft, Menu, User } from 'lucide-react';
import ProfileStats from './ProfileStats'; // Asegúrate de importar ProfileStats

interface MatchHistoryProps {
  onBackClick: () => void;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ onBackClick }) => {
  // Simulación de datos de historial de partidos
  const matchHistory = [
    { date: '01/10/2023', result: '2-0', type: 'F5' },
    { date: '15/09/2023', result: '1-1', type: 'F5' },
    { date: '30/08/2023', result: '3-2', type: 'F11' },
    { date: '20/07/2023', result: '0-0', type: 'F5' },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans">
      {/* Header con iconos */}
      <header className="p-4 flex justify-between items-center">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBackClick} />
        <Menu className="w-6 h-6 cursor-pointer" />
        <User className="w-6 h-6 cursor-pointer" />
      </header>

      {/* Información del perfil */}
      <div className="text-center my-4">
        <p className="text-sm">Perfil de</p>
        <p className="text-sm">Nicolas Liendro</p>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Nicolas Liendro</h1>
        <ProfileStats pg={20} cg={1} gp={36} />{' '}
        {/* Usa el componente de estadísticas del perfil */}
      </div>

      {/* Título de la pantalla */}
      <h2 className="text-center text-xl font-bold mb-4">
        Historial de Partidos
      </h2>

      <main className="px-4 py-6">
        {matchHistory.length === 0 ? (
          <p className="text-center">No tienes partidos registrados.</p>
        ) : (
          <div className="space-y-4">
            {matchHistory.map((match, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-cyan-400 rounded-lg p-4"
              >
                <span>{match.date}</span>
                <span>{match.result}</span>
                <span>{match.type}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchHistory;
