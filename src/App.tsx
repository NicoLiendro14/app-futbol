import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import ProfileStats from './components/ProfileStats';
import TournamentCard from './components/TournamentCard';
import GroupStage from './components/GroupStage';
import SideMenu from './components/SideMenu';
import InviteFriendPopup from './components/InviteFriendPopup';
import MatchHistory from './components/MatchHistory';
import Ranking from './components/Ranking';
import EliminationStage from './components/EliminationStage';

interface TournamentData {
  name: string;
  backgroundImage: string;
  teams: string[];
  styles?: object;
}

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [selectedTournament, setSelectedTournament] = useState<TournamentData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

  // Definimos los datos de cada torneo
  const tournaments: { [key: string]: TournamentData } = {
    'Mundial de Futbol': {
      name: 'Mundial de Futbol',
      backgroundImage: 'https://i.pinimg.com/736x/f5/25/a9/f525a90c9ddcec27d1625dff575d6d39.jpg',
      teams: ['Nicolas Liendro', 'Uruguay', 'Colombia', 'Noruega'],
    },
    'Champions League': {
      name: 'Champions League',
      backgroundImage: 'https://i.pinimg.com/originals/df/a4/22/dfa4223c946f25021f829b8dc1e70ce5.jpg',
      teams: ['Real Madrid', 'Barcelona', 'Bayern Munich', 'Liverpool'],
    },
    'Libertadores': {
      name: 'Libertadores',
      backgroundImage: 'https://i.pinimg.com/originals/1c/53/8f/1c538f2a180f30abf84803a50ed0c39c.jpg',
      teams: ['River Plate', 'Boca Juniors', 'Flamengo', 'Palmeiras'],
    },
  };

  const handleTournamentClick = (title: string) => {
    const tournament = tournaments[title];
    if (tournament) {
      setSelectedTournament(tournament);
      setCurrentView('groupStage');
    } else {
      console.error('Torneo no encontrado:', title);
    }
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openInvitePopup = () => {
    setIsInvitePopupOpen(true);
  };

  const handleInvite = (email: string) => {
    const validEmails = ['amigo@example.com', 'amiga@example.com'];
    return validEmails.includes(email);
  };

  const handleMenuClick = (section: string) => {
    setIsMenuOpen(false);
    setCurrentView(section);
  };

  const handleAdvanceToEliminationStage = () => {
    setCurrentView('eliminationStage');
  };

  const handleChooseNewCup = () => {
    setCurrentView('main');
  };

  if (currentView === 'groupStage' && selectedTournament) {
    return (
      <GroupStage
        tournament={selectedTournament}
        onAdvanceToEliminationStage={handleAdvanceToEliminationStage}
        onNavigate={handleMenuClick}
      />
    );
  }
  if (currentView === 'eliminationStage' && selectedTournament) {
    return (
      <EliminationStage
        tournament={selectedTournament}
        onBackClick={handleBackClick}
        onChooseNewCup={handleChooseNewCup}
        onNavigate={handleMenuClick}
      />
    );
  }

  if (currentView === 'history') {
    return (
      <MatchHistory
        onMenuClick={toggleMenu}
        onInviteFriend={() => setIsInvitePopupOpen(true)}
        onNavigate={handleMenuClick}
      />
    );
  }

  if (currentView === 'ranking') {
    return (
      <Ranking
        onNavigate={handleMenuClick}
      />
    );
  }
  

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans">
      <header className="p-4 flex justify-between items-center">
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        <UserPlus
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsInvitePopupOpen(true)}
        />
      </header>

      <main className="px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
            alt="Perfil de Nicolas Merentiel"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">Nicolas Merentiel</h1>
          <ProfileStats pg={20} cg={1} gp={36} />
        </div>

        <div className="space-y-4">
          <TournamentCard
            title="Mundial de Futbol"
            image="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            onClick={() => handleTournamentClick('Mundial de Futbol')}
          />
          <TournamentCard
            title="Champions League"
            image="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            onClick={() => handleTournamentClick('Champions League')}
          />
          <TournamentCard
            title="Libertadores"
            image="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            onClick={() => handleTournamentClick('Libertadores')}
          />
        </div>

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 font-semibold">
          Fixture
        </button>
      </main>

      {/* Renderizamos el menú lateral */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuClick} // Pasamos la función de navegación
      />

      {/* Renderizamos el popup de invitar amigos */}
      {isInvitePopupOpen && (
        <InviteFriendPopup
          onClose={() => setIsInvitePopupOpen(false)}
          onInvite={handleInvite}
        />
      )}
    </div>
  );
}

export default App;
