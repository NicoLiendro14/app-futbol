import React, { useState, useEffect } from 'react';
import {Plus, Menu, UserPlus } from 'lucide-react';
import AddMatchPopup, { MatchData } from './AddMatchPopup';
import SideMenu from './SideMenu'; // Importing SideMenu
import InviteFriendPopup from './InviteFriendPopup'; // Importing InviteFriendPopup

interface GroupStageProps {
  title: string;
  onBackClick: () => void;
  onAdvanceToEliminationStage: () => void;
}

interface TeamData {
  name: string;
  results: ('win' | 'draw' | 'loss' | null)[]; // Results are now limited to 3 entries
}

const GroupStage: React.FC<GroupStageProps> = ({
  title,
  onBackClick,
  onAdvanceToEliminationStage,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [teams, setTeams] = useState<TeamData[]>([
    { name: 'Nicolas Liendro', results: [null, null, null] }, // 3 matches
    { name: 'Uruguay', results: [null, null, null] }, // 3 matches
    { name: 'Colombia', results: [null, null, null] }, // 3 matches
    { name: 'Noruega', results: [null, null, null] }, // 3 matches
  ]);

  // State for the side menu and friend invitation
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

  useEffect(() => {
    const userTeam = teams[0];
    const allWins = userTeam.results.every((result) => result === 'win');

    if (allWins && userTeam.results.every((result) => result !== null)) {
      onAdvanceToEliminationStage();
    }
  }, [teams, onAdvanceToEliminationStage]);

  const handleAddMatch = (matchData: MatchData) => {
    setTeams((prevTeams) => {
      const newTeams = [...prevTeams];
      const userTeam = newTeams[0];
      const firstNullIndex = userTeam.results.indexOf(null);
      if (firstNullIndex !== -1) {
        userTeam.results[firstNullIndex] = matchData.result;
      }

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
    setIsMenuOpen(!isMenuOpen); // Toggle side menu
  };

  const handleInvite = (email: string) => {
    const validEmails = ['amigo@example.com', 'amiga@example.com'];
    return validEmails.includes(email);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-cover bg-center bg-fixed text-white font-sans"
      style={{ backgroundImage: "url('/path-to-your-background-image.png')" }}>

      {/* Header section with Hamburger Menu and Add Friend Button */}
      <div className="flex justify-between w-full p-4 absolute top-0">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        <UserPlus className="w-6 h-6 cursor-pointer" onClick={() => setIsInvitePopupOpen(true)} />
      </div>

      {/* Profile Info inside bordered box */}
      <header className="flex flex-col items-center mt-20"> {/* Adjusted margin to increase spacing */}
        <div className="flex items-center border border-cyan-400 px-6 py-4 rounded-lg bg-transparent"> {/* Adjusted padding */}
          <img
            src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
            alt="Perfil"
            className="w-14 h-14 rounded-full mr-4" // Slightly bigger image
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-bold">Mundial de Futbol</h1>
            <span className="text-sm text-gray-300">Nicolas Liendro</span>
          </div>
        </div>
      </header>

      {/* Fase de Grupos Button */}
      <div className="mt-8 mb-10"> {/* Increased margin to make more space */}
        <h2 className="text-xl font-bold px-6 py-2 border border-cyan-400 rounded-lg bg-transparent text-center">
          Fase de Grupos
        </h2>
      </div>

      {/* Main content - Group A with adjusted spacing and only 3 circles */}
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        <div className="bg-navy-900 rounded-lg p-8 opacity-90 w-full max-w-md"> {/* Adjusted padding */}
          <div className="space-y-8"> {/* Increased space between rows */}
            <div className="bg-navy-800 rounded-lg p-6 opacity-90 space-y-6"> {/* Adjusted padding and spacing */}
              <h3 className="text-lg font-semibold mb-4 text-center">Grupo A</h3>
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 text-sm" /* Increased padding between rows */
                >
                  <span className="font-semibold">{team.name}</span>
                  <div className="flex space-x-4"> {/* Increased space between circles */}
                    {team.results.map((result, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 ${
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
        onNavigate={(section: string) => console.log(section)} // Replace with actual navigation logic
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
    </div>
  );
};

export default GroupStage;
