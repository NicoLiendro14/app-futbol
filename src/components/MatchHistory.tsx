import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import ProfileStats from './ProfileStats'; // Asegúrate de importar ProfileStats
import SideMenu from './SideMenu'; // Importamos el SideMenu
import InviteFriendPopup from './InviteFriendPopup'; // Importamos el popup de invitar amigos

interface MatchHistoryProps {
  onMenuClick: () => void;
  onInviteFriend: () => void;
  onNavigate: (section: string) => void;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ onNavigate }) => {
  // Simulación de datos de historial de partidos
  const matchHistory = [
    { date: '01/10/2023', result: '2-0', type: 'F5' },
    { date: '15/09/2023', result: '1-1', type: 'F5' },
    { date: '30/08/2023', result: '3-2', type: 'F11' },
    { date: '20/07/2023', result: '0-0', type: 'F5' },
  ];

  // Estado para el menú lateral y el popup de invitar amigos
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

  // Funciones para abrir/cerrar el menú y el popup
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInvite = (email: string) => {
    const validEmails = ['amigo@example.com', 'amiga@example.com'];
    return validEmails.includes(email);
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans">
      {/* Header con iconos */}
      <header className="p-4 flex justify-between items-center">
        {/* Botón de menú hamburguesa */}
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        {/* Icono de agregar amigo */}
        <UserPlus
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsInvitePopupOpen(true)}
        />
      </header>

      {/* Información del perfil */}
      <div className="text-center my-4">
        <p className="text-sm">Perfil de</p>
        <p className="text-sm">Nicolas Liendro</p>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Nicolas Liendro</h1>
        <ProfileStats pg={20} cg={1} gp={36} />{' '}
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
    </div>
  );
};

export default MatchHistory;
