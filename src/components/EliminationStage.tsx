import React, { useState } from 'react';
import { Menu, Plus, X, UserPlus } from 'lucide-react';
import AddMatchPopup, { MatchData } from './AddMatchPopup';
import SideMenu from './SideMenu'; // Importamos SideMenu si no está ya importado

interface TournamentData {
  name: string;
  backgroundImage: string;
  teams: string[];
  styles?: object;
}

// Definimos las props que espera recibir este componente
interface EliminationStageProps {
  tournament: TournamentData;
  onBackClick: () => void;
  onChooseNewCup: () => void;
  onNavigate: (section: string) => void;
}

const EliminationStage: React.FC<EliminationStageProps> = ({
  tournament,
  onChooseNewCup,
  onNavigate, // Desestructuramos la función de navegación
}) => {
  const [currentPhase, setCurrentPhase] = useState('octavos');
  const [showPopup, setShowPopup] = useState(false);
  const [matchResult, setMatchResult] = useState<null | 'win' | 'loss'>(null);
  const [isChampion, setIsChampion] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);


  const tournamentPhases = ['octavos', 'cuartos', 'semifinal', 'final'];
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  const generatePhases = () => {
    const phasesObj: any = {};
    let remainingTeams = [...tournament.teams];
    // Eliminamos al usuario del array de equipos
    const userTeam = 'Nicolas Liendro';
    remainingTeams = remainingTeams.filter((team) => team !== userTeam);

    for (let i = 0; i < tournamentPhases.length; i++) {
      const phaseName = tournamentPhases[i];
      const opponentIndex = Math.floor(Math.random() * remainingTeams.length);
      const opponent = remainingTeams.splice(opponentIndex, 1)[0];

      phasesObj[phaseName] = {
        round: phaseName.charAt(0).toUpperCase() + phaseName.slice(1),
        player1: userTeam,
        player2: opponent || 'Desconocido',
      };
    }
    return phasesObj;
  };

  const [dynamicPhases] = useState(generatePhases());
  const currentPhaseName = tournamentPhases[currentPhaseIndex];
  const currentMatch = dynamicPhases[currentPhaseName];
  const [goalsScored, setGoalsScored] = useState(0); // Para manejar los goles hechos
  const [gamesWon, setGamesWon] = useState(0); // Para manejar los partidos ganados

  const handleInvite = (email: string) => {
    const validEmails = ['amigo@example.com', 'amiga@example.com'];
    return validEmails.includes(email);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleAddMatch = (matchData: MatchData) => {    
    //setMatchResult((matchData.result));
    // Determinamos el resultado del equipo local (usuario) basado en los goles
    let result: 'win' | 'draw' | 'loss' | null = null;
    if (matchData.homeGoals > matchData.awayGoals) {
      result = 'win';
    } else if (matchData.homeGoals < matchData.awayGoals) {
      result = 'loss';
    } else {
      result = 'draw';
    }

    if (result === 'win') {
      if (currentPhaseIndex < tournamentPhases.length - 1) {
        setCurrentPhaseIndex(currentPhaseIndex + 1);
        setMatchResult(null); // Reset the match result for the next phase
      } else {
        setIsChampion(true);
      }
    } else {
      setShowPopup(false);
      setMatchResult('loss'); // Cambiamos el estado para indicar que se ha perdido
      setIsEliminated(true); // Activamos el popup de eliminación
    
      // Suponiendo que quieres mantener los goles hechos y partidos ganados
      // Aquí puedes ajustar la lógica para aumentar según el resultado del partido
    }
    

    setShowPopup(false);
  };
  

  // Handle sharing via WhatsApp
  const handleShare = () => {
    const profileUrl = `https://myapp.com/profile/nicolas-liendro`; // Example profile URL
    const message = `Hola! Mira mi perfil en la app. Envíame una solicitud de amistad para verlo: ${profileUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-cover bg-center bg-fixed text-white font-sans"
      style={{ backgroundImage: `url(${tournament.backgroundImage})` }}
    >
      {/* Header section with Hamburger Menu and Add Friend Button */}
      <div className="flex justify-between w-full p-4 absolute top-0">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        <UserPlus
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsInvitePopupOpen(true)}
        />
      </div>
      {/* Side menu */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
      />
      {/* Invite Friend Popup */}
      {isInvitePopupOpen && (
        <InviteFriendPopup
          onClose={() => setIsInvitePopupOpen(false)}
          onInvite={handleInvite}
        />
      )}
      {/* Profile Info inside bordered box */}
      <header className="flex flex-col items-center mt-20">
        <div className="flex items-center border border-cyan-400 px-6 py-4 rounded-lg bg-transparent">
          <img
            src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
            alt="Perfil"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-bold">{tournament.name}</h1>
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

      {/* Matchup: Nicolas Liendro vs Opponent */}
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        <div className="flex flex-col items-center space-y-6">
          {/* Player 1 */}
          <div className="bg-navy-700 p-6 rounded-lg w-52 text-center font-semibold text-lg">
            {currentMatch.player1}
          </div>

          <span className="text-white text-2xl font-bold">VS</span>

          {/* Player 2 */}
          <div className="bg-navy-700 p-6 rounded-lg w-52 text-center font-semibold text-lg">
            {currentMatch.player2}
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
          onSave={handleAddMatch}
        />
      )}
{isEliminated && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-navy-800 rounded-lg p-6 w-11/12 max-w-md text-center relative">
      <button
        onClick={() => setIsEliminated(false)}
        className="absolute top-4 right-4"
      >
        <X size={24} className="text-white" />
      </button>
      <h2 className="text-2xl font-bold mb-4">¡Has perdido!</h2>

      <div className="flex justify-around my-6">
        <div>
          <p className="text-sm mb-2">Goles Hechos</p>
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-4 mx-auto">
            <span className="text-xl font-bold">{goalsScored}</span>
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">Partidos Ganados</p>
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-4 mx-auto">
            <span className="text-xl font-bold">{gamesWon}</span>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4"
        onClick={() => window.location.reload()} // Reinicia el torneo o lo que consideres "reiniciar"
      >
        Reiniciar
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
            <h2 className="text-2xl font-bold mb-4">¡Campeón!</h2>
            <img
              src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
              alt="Perfil de Nicolas Liendro"
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <p className="mb-2 text-lg">Felicidades {currentMatch.player1}</p>
            <p className="text-sm my-4">Goles Hechos</p>
            <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center mb-4 mx-auto">
              <span className="text-xl font-bold">20</span>
            </div>
            <button
              className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4"
              onClick={handleShare}
            >
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
