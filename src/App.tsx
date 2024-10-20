import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import ProfileStats from './components/ProfileStats';
import TournamentCard from './components/TournamentCard';
import GroupStage from './components/GroupStage';
import SideMenu from './components/SideMenu';
import InviteFriendPopup from './components/InviteFriendPopup';
import MatchHistory from './components/MatchHistory';
import Ranking from './components/Ranking';
import EliminationStage from './components/EliminationStage'; // Importamos la nueva pantalla

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú lateral
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false); // Estado para el popup de invitar amigos

  const handleTournamentClick = (title: string) => {
    setSelectedTournament(title);
    setCurrentView('groupStage');
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  const toggleMenu = () => {
    console.log("Toggle menu clicked"); // Para depuración
    setIsMenuOpen(!isMenuOpen);
  };
  // Función para abrir el popup de invitar amigos
  const openInvitePopup = () => {
    console.log("Invite friend clicked"); // Para depuración
    setIsInvitePopupOpen(true);
  };

  const handleInvite = (email: string) => {
    // Lógica para simular la búsqueda del amigo por email
    const validEmails = ['amigo@example.com', 'amiga@example.com']; // Lista de correos válidos
    return validEmails.includes(email); // Si el email está en la lista, retorna true
  };

  // Función para manejar la navegación desde el menú lateral
  const handleMenuClick = (section: string) => {
    console.log(`Navigating to section: ${section}`); // Para depuración
    setIsMenuOpen(false); // Cerrar el menú
    setCurrentView(section); // Cambiar la vista a la sección seleccionada
  };


  const handleAdvanceToEliminationStage = () => {
    setCurrentView('eliminationStage'); // Cambiar a la fase eliminatoria
  };
  const handleChooseNewCup = () => {
    setCurrentView('main'); // Volver a la vista principal para elegir otra copa
  };

  let content;


  if (currentView === 'groupStage') {
    return (
      <GroupStage
        title={selectedTournament}
        onBackClick={handleBackClick}
        onAdvanceToEliminationStage={handleAdvanceToEliminationStage}
        onNavigate={handleMenuClick} // Pasamos la función de navegación
      />
    );
  }

  if (currentView === 'eliminationStage') {
    return (
      <EliminationStage
        title={selectedTournament}
        onBackClick={handleBackClick}
        onChooseNewCup={handleChooseNewCup}
        onNavigate={handleMenuClick} // Pasamos la función de navegación
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
    return <Ranking onBackClick={handleBackClick} />;
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
