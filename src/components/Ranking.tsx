import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import SideMenu from './SideMenu'; // Importamos el SideMenu
import InviteFriendPopup from './InviteFriendPopup'; // Importamos el popup de invitar amigos
import ProfileHeader from './ProfileHeader'; // Importamos ProfileHeader

interface RankingProps {
  onNavigate: (section: string) => void;
}

const Ranking: React.FC<RankingProps> = ({ onNavigate }) => {
  // Simulación de datos de ranking
  const rankingData = [
    { position: 1, name: 'Nicolas Liendro', pg: 20, gp: 36, cg: 1 },
    { position: 2, name: 'Juan Perez', pg: 18, gp: 34, cg: 2 },
    { position: 3, name: 'Carlos Garcia', pg: 17, gp: 32, cg: 3 },
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

      {/* Profile Header con estadísticas */}
      <ProfileHeader 
        name="Nicolas Liendro"
        imageUrl="https://www.corrienteshoy.com/galeria/fotos/2023/11/10/o_cc92f570a6e2c1a0600717e07a1e36f4.jpg"
        pg={20}
        cg={1}
        gp={36}
      />

      {/* Título de la pantalla */}
      <h2 className="text-center text-xl font-bold mb-4">Ranking</h2>

      {/* Tabla de ranking */}
      <main className="px-4 py-6">
        <div className="space-y-4">
          {rankingData.map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-cyan-400 rounded-lg p-4"
            >
              <span>{player.position}</span>
              <span>{player.name}</span>
              <span>{player.pg}</span>
              <span>{player.gp}</span>
              <span>{player.cg}</span>
            </div>
          ))}
        </div>
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

export default Ranking;
