import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import SideMenu from './SideMenu'; // Importamos el SideMenu
import InviteFriendPopup from './InviteFriendPopup'; // Importamos el popup de invitar amigos
import ProfileHeader from './ProfileHeader'; // Importamos ProfileHeader

interface RankingProps {
  onNavigate: (section: string) => void;
}

const Ranking: React.FC<RankingProps> = ({ onNavigate }) => {
  // Simulación de datos de ranking con más jugadores
  const rankingData = [
    { position: 1, name: 'Nicolas Liendro', pg: 20, gp: 36, cg: 1 },
    { position: 2, name: 'Juan Perez', pg: 18, gp: 34, cg: 2 },
    { position: 3, name: 'Carlos Garcia', pg: 17, gp: 32, cg: 3 },
    { position: 4, name: 'Mario Rossi', pg: 16, gp: 30, cg: 4 },
    { position: 5, name: 'Laura Lopez', pg: 15, gp: 28, cg: 5 },
    { position: 6, name: 'Ana Martins', pg: 14, gp: 26, cg: 6 },
    { position: 7, name: 'Pedro Suarez', pg: 13, gp: 24, cg: 7 },
    { position: 8, name: 'Carmen Diaz', pg: 12, gp: 22, cg: 8 },
    { position: 9, name: 'Luis Hernandez', pg: 11, gp: 20, cg: 9 },
    { position: 10, name: 'Sofia Blanco', pg: 10, gp: 18, cg: 10 }
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

  // Función para determinar el color del borde según la posición
  const getBorderColor = (position: number) => {
    if (position === 1) return 'border-yellow-500'; // Dorado para el primer puesto
    if (position === 2) return 'border-gray-400'; // Plateado para el segundo puesto
    if (position === 3) return 'border-orange-600'; // Cobre para el tercer puesto
    return 'border-blue-400'; // Otro color para los demás
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

      {/* Tabla de ranking con scroll */}
      <main className="px-4 py-6 max-h-80 overflow-y-auto">
        <div className="space-y-4">
          {rankingData.map((player, index) => (
            <div
              key={index}
              className={`flex justify-between items-center border rounded-lg p-4 ${getBorderColor(player.position)}`}
            >
              <span className="w-1/5 text-center">{player.position}</span>
              <span className="w-2/5 text-left">{player.name}</span>
              <span className="w-1/5 text-center">{player.pg}</span>
              <span className="w-1/5 text-center">{player.gp}</span>
              <span className="w-1/5 text-center">{player.cg}</span>
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
