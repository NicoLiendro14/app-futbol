// src/components/GroupStage.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import AddMatchPopup, { MatchData } from './AddMatchPopup';

interface GroupStageProps {
  title: string;
  onBackClick: () => void;
  onAdvanceToEliminationStage: () => void; // Nueva función para avanzar a eliminación
}

interface TeamData {
  name: string;
  results: ('win' | 'draw' | 'loss' | null)[];
}

const GroupStage: React.FC<GroupStageProps> = ({
  title,
  onBackClick,
  onAdvanceToEliminationStage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [teams, setTeams] = useState<TeamData[]>([
    { name: 'Nicolas Liendro', results: [null, null, null, null] }, // Los resultados iniciales son null
    { name: 'Uruguay', results: [null, null, null, null] },
    { name: 'Colombia', results: [null, null, null, null] },
    { name: 'Noruega', results: [null, null, null, null] },
  ]);

  useEffect(() => {
    // Verificar si el equipo de Nicolas Liendro ha ganado todos los partidos
    const userTeam = teams[0]; // Asumiendo que el primer equipo es Nicolas Liendro
    const allWins = userTeam.results.every((result) => result === 'win');

    // Si el equipo ha ganado todos los partidos, avanzamos a la fase eliminatoria
    if (allWins && userTeam.results.every((result) => result !== null)) {
      onAdvanceToEliminationStage();
    }
  }, [teams, onAdvanceToEliminationStage]); // El efecto se ejecuta cada vez que se actualiza `teams`

  const handleAddMatch = (matchData: MatchData) => {
    setTeams((prevTeams) => {
      const newTeams = [...prevTeams];
      const userTeam = newTeams[0];
      const firstNullIndex = userTeam.results.indexOf(null);
      if (firstNullIndex !== -1) {
        userTeam.results[firstNullIndex] = matchData.result;
      }

      // Actualizamos los resultados de los otros equipos de forma aleatoria
      for (let i = 1; i < newTeams.length; i++) {
        const team = newTeams[i];
        const randomIndex = team.results.indexOf(null);
        if (randomIndex !== -1) {
          const randomResult = Math.random();
          if (randomResult < 0.33) {
            team.results[randomIndex] = 'win';
          } else if (randomResult < 0.66) {
            team.results[randomIndex] = 'draw';
          } else {
            team.results[randomIndex] = 'loss';
          }
        }
      }

      return newTeams;
    });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans">
      <header className="p-4 flex items-center">
        <ChevronLeft
          className="w-6 h-6 mr-2 cursor-pointer"
          onClick={onBackClick}
        />
        <h1 className="text-xl font-bold">{title}</h1>
      </header>

      <main className="px-4 py-6">
        <div className="bg-navy-800 rounded-lg p-4 mb-6">
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
            alt="Perfil de Nicolas Liendro"
            className="w-16 h-16 rounded-full mb-2 mx-auto"
          />
          <h2 className="text-center text-lg font-semibold mb-2">
            Nicolas Liendro
          </h2>
        </div>

        <div className="bg-navy-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Fase de Grupos</h2>
          <div className="space-y-4">
            <div className="bg-navy-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Grupo A</h3>
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{team.name}</span>
                  <div className="flex space-x-2">
                    {team.results.map((result, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 ${
                          result === 'win'
                            ? 'bg-green-500 border-green-500'
                            : result === 'draw'
                            ? 'bg-yellow-500 border-yellow-500'
                            : result === 'loss'
                            ? 'bg-red-500 border-red-500'
                            : 'border-cyan-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setShowPopup(true)}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {showPopup && (
        <AddMatchPopup
          onClose={() => setShowPopup(false)}
          onSave={handleAddMatch}
        />
      )}
    </div>
  );
};

export default GroupStage;
