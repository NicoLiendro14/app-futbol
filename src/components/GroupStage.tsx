import React, { useState, useEffect } from 'react';
import {Plus, Menu, UserPlus } from 'lucide-react';
import AddMatchPopup, { MatchData } from './AddMatchPopup';
import SideMenu from './SideMenu';
import InviteFriendPopup from './InviteFriendPopup';

interface TournamentData {
  name: string;
  backgroundImage: string;
  teams: string[];
  styles?: object;
}

interface GroupStageProps {
  tournament: TournamentData;
  onAdvanceToEliminationStage: () => void;
  onNavigate: (section: string) => void; // Añadimos la función de navegación
}

interface TeamData {
  name: string;
  results: ('win' | 'draw' | 'loss' | null)[];
}

const GroupStage: React.FC<GroupStageProps> = ({
  tournament,
  onAdvanceToEliminationStage,
  onNavigate,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAdvancePopup, setShowAdvancePopup] = useState(false); // Popup for advancing to next phase
  const [teams, setTeams] = useState<TeamData[]>(
    tournament.teams.map((teamName) => ({
      name: teamName,
      results: [null, null, null],
    }))
  );
  const [hasAdvanced, setHasAdvanced] = useState<boolean | null>(null); // Track if user has advanced

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

  useEffect(() => {
    const userTeam = teams[0];
    const allMatchesPlayed = userTeam.results.every((result) => result !== null);
    const allWins = userTeam.results.every((result) => result === 'win');

    // Check if all matches are played
    if (allMatchesPlayed) {
      // If user won all matches, set advancement status
      if (allWins) {
        setHasAdvanced(true); // Indicate that the user has advanced
      } else {
        setHasAdvanced(false); // Indicate that the user has NOT advanced
      }
      setShowAdvancePopup(true); // Show popup
    }
  }, [teams]);

const handleAddMatch = (matchData: MatchData) => {
  setTeams((prevTeams) => {
    const newTeams = [...prevTeams];
    const userTeam = newTeams[0];

    // Determinamos el resultado del equipo local (usuario) basado en los goles
    let result: 'win' | 'draw' | 'loss' | null = null;
    if (matchData.homeGoals > matchData.awayGoals) {
      result = 'win';
    } else if (matchData.homeGoals < matchData.awayGoals) {
      result = 'loss';
    } else {
      result = 'draw';
    }

    // Encontramos el primer espacio disponible para el resultado en los partidos
    const firstNullIndex = userTeam.results.indexOf(null);
    if (firstNullIndex !== -1) {
      userTeam.results[firstNullIndex] = result; // Asignamos el resultado calculado
    }

    // Ahora actualizamos los resultados para los otros equipos de manera aleatoria
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInvite = (email: string) => {
    const validEmails = ['amigo@example.com', 'amiga@example.com'];
    return validEmails.includes(email);
  };

  const closeAdvancePopup = () => {
    setShowAdvancePopup(false);
    if (hasAdvanced) {
      onAdvanceToEliminationStage(); // Now navigate to the elimination stage after closing the popup
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-cover bg-center bg-fixed text-white font-sans"
      style={{ backgroundImage: `url(${tournament.backgroundImage})` }}
    >
      {/* Header section */}
      <div className="flex justify-between w-full p-4 absolute top-0">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        <UserPlus className="w-6 h-6 cursor-pointer" onClick={() => setIsInvitePopupOpen(true)} />
      </div>

      {/* Profile Info */}
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

      {/* Fase de Grupos Button */}
      <div className="mt-8 mb-10">
        <h2 className="text-xl font-bold px-6 py-2 border border-cyan-400 rounded-lg bg-transparent text-center">
          Fase de Grupos
        </h2>
      </div>

      {/* Main content - Group A with adjusted spacing and only 3 circles */}
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        <div className="bg-navy-900 rounded-lg p-8 opacity-90 w-full max-w-md">
          <div className="space-y-8">
            <div className="bg-navy-800 rounded-lg p-6 opacity-90 space-y-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Grupo A</h3>
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 text-sm"
                >
                  <span className="font-semibold">{team.name}</span>
                  <div className="flex space-x-4">
                    {team.results.map((result, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 ${result === 'win'
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

      {/* Floating button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setShowPopup(true)}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Side menu */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate} // Utilizamos la función de navegación pasada desde App.tsx
      />

      {/* Invite Friend Popup */}
      {isInvitePopupOpen && (
        <InviteFriendPopup
          onClose={() => setIsInvitePopupOpen(false)}
          onInvite={handleInvite}
        />
      )}

      {/* Add match popup */}
      {showPopup && (
        <AddMatchPopup
          onClose={() => setShowPopup(false)}
          onSave={handleAddMatch}
        />
      )}

      {/* Advance to Elimination Stage Popup */}
      {/* Advance to Elimination Stage Popup */}
      {showAdvancePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-navy-800 rounded-lg p-6 text-center text-white max-w-md w-full mx-4"> {/* Added padding, color, and layout */}
            {hasAdvanced ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">¡Felicitaciones!</h2>
                <p>Has avanzado a la fase eliminatoria.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">¡Lo sentimos!</h2>
                <p>No has avanzado a la siguiente fase.</p>
              </div>
            )}
            <button
              className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg"
              onClick={closeAdvancePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GroupStage;
