// src/components/EliminationStage.tsx
import React, { useState } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import AddMatchPopup, { MatchData } from './AddMatchPopup';

interface EliminationStageProps {
  title: string;
  onBackClick: () => void;
  onChooseNewCup: () => void;
}

const EliminationStage: React.FC<EliminationStageProps> = ({
  title,
  onBackClick,
  onChooseNewCup,
}) => {
  const [currentPhase, setCurrentPhase] = useState('octavos'); // Estado para manejar la fase actual
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el popup de agregar partido
  const [matchResult, setMatchResult] = useState<null | 'win' | 'loss'>(null); // Estado para el resultado del partido
  const [isChampion, setIsChampion] = useState(false); // Estado para mostrar el popup de campeón

  // Datos de las diferentes fases eliminatorias
  const phases = {
    octavos: {
      round: 'Octavos de Final',
      player1: 'Nicolas Liendro',
      player2: 'Uruguay',
    },
    cuartos: {
      round: 'Cuartos de Final',
      player1: 'Nicolas Liendro',
      player2: 'Brasil',
    },
    semifinal: {
      round: 'Semifinal',
      player1: 'Nicolas Liendro',
      player2: 'Argentina',
    },
    final: { round: 'Final', player1: 'Nicolas Liendro', player2: 'Alemania' },
  };

  const handleAddMatch = (matchData: MatchData) => {
    setMatchResult(matchData.result); // Guardamos el resultado del partido

    // Lógica para avanzar entre fases
    if (matchData.result === 'win') {
      if (currentPhase === 'octavos') {
        setCurrentPhase('cuartos');
      } else if (currentPhase === 'cuartos') {
        setCurrentPhase('semifinal');
      } else if (currentPhase === 'semifinal') {
        setCurrentPhase('final');
      } else if (currentPhase === 'final') {
        setIsChampion(true); // Mostrar el popup de campeón si se gana la final
      }
    }

    setShowPopup(false); // Cerramos el popup
  };

  const currentMatch = phases[currentPhase];

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
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">{currentMatch.round}</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-navy-700 p-4 rounded-lg w-40 text-center">
              {currentMatch.player1}
            </div>
            <span className="text-white">VS</span>
            <div className="bg-navy-700 p-4 rounded-lg w-40 text-center">
              {currentMatch.player2}
            </div>
          </div>
        </div>

        {matchResult === 'loss' && (
          <p className="text-center text-red-500 mt-4">
            ¡Has sido eliminado del torneo!
          </p>
        )}
      </main>

      {/* Botón flotante para agregar un nuevo partido */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setShowPopup(true)}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Popup para agregar el resultado del partido */}
      {showPopup && (
        <AddMatchPopup
          onClose={() => setShowPopup(false)}
          onSave={handleAddMatch} // Pasamos la función para guardar el resultado
        />
      )}

      {/* Popup de Campeón del Mundo */}
      {isChampion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-navy-800 rounded-lg p-6 w-11/12 max-w-md text-center relative">
            <button
              onClick={() => setIsChampion(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} className="text-white" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Campeon del Mundo</h2>
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              alt="Perfil de Nicolas Liendro"
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <p className="mb-2 text-lg">Felicidades Nicolas Liendro</p>
            <p className="text-sm">Goles Hechos</p>
            <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-4 mx-auto">
              <span className="text-xl font-bold">20</span>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4">
              Compartir
            </button>
            <button
              className="w-full bg-transparent text-purple-600 py-2 rounded-lg mt-2"
              onClick={onChooseNewCup}
            >
              Elegir otra copa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminationStage;
