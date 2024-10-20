import React, { useState } from 'react';
import { Menu, Plus, X, UserPlus } from 'lucide-react';
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
      stats1: { goals: 10, wins: 3 }, // Example stats
      stats2: { goals: 8, wins: 2 },  // Example stats
    },
    cuartos: {
      round: 'Cuartos de Final',
      player1: 'Nicolas Liendro',
      player2: 'Brasil',
      stats1: { goals: 12, wins: 4 },
      stats2: { goals: 15, wins: 3 },
    },
    semifinal: {
      round: 'Semifinal',
      player1: 'Nicolas Liendro',
      player2: 'Argentina',
      stats1: { goals: 16, wins: 5 },
      stats2: { goals: 18, wins: 4 },
    },
    final: {
      round: 'Final',
      player1: 'Nicolas Liendro',
      player2: 'Alemania',
      stats1: { goals: 20, wins: 6 },
      stats2: { goals: 22, wins: 5 },
    },
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
    <div className="min-h-screen flex flex-col justify-start items-center bg-cover bg-center bg-fixed text-white font-sans"
      style={{ backgroundImage: "url('/path-to-your-background-image.png')" }}>

      {/* Header section with Hamburger Menu and Add Friend Button */}
      <div className="flex justify-between w-full p-4 absolute top-0">
        <Menu className="w-6 h-6 cursor-pointer" />
        <UserPlus className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Profile Info inside bordered box */}
      <header className="flex flex-col items-center mt-20">
        <div className="flex items-center border border-cyan-400 px-6 py-4 rounded-lg bg-transparent">
          <img
            src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
            alt="Perfil"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-bold">Mundial de Futbol</h1>
            <span className="text-sm text-gray-300">Nicolas Liendro</span>
          </div>
        </div>
      </header>

      {/* Elimination Phase Title */}
      <div className="mt-8 mb-10">
        <h2 className="text-xl font-bold px-6 py-2 border border-cyan-400 rounded-lg bg-transparent text-center">
          {currentMatch.round}
        </h2>
      </div>

      {/* Matchup: Nicolas Liendro vs Opponent with Player Stats */}
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        <div className="flex flex-col items-center space-y-6"> {/* Increased space between elements */}
          {/* Player 1 */}
          <div className="bg-navy-700 p-6 rounded-lg w-52 text-center font-semibold text-lg"> {/* Increased size */}
            {currentMatch.player1}
            <div className="text-sm mt-2">
            </div>
          </div>

          <span className="text-white text-2xl font-bold">VS</span> {/* Made larger */}

          {/* Player 2 */}
          <div className="bg-navy-700 p-6 rounded-lg w-52 text-center font-semibold text-lg"> {/* Increased size */}
            {currentMatch.player2}
            <div className="text-sm mt-2">
            </div>
          </div>
        </div>

        {matchResult === 'loss' && (
          <p className="text-center text-red-500 mt-6">
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
              src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
              alt="Perfil de Nicolas Liendro"
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <p className="mb-2 text-lg">Felicidades Nicolas Liendro</p>
            <p className="text-sm my-4">Goles Hechos</p>
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
