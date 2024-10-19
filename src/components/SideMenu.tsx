// src/components/SideMenu.tsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void; // Función para navegar a una sección específica
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-navy-900 w-64`}
    >
      <div className="p-4">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>
      <nav className="p-4 space-y-6">
        <button
          className="block text-white text-lg"
          onClick={() => onNavigate('main')}
        >
          Perfil
        </button>
        <button
          className="block text-white text-lg"
          onClick={() => onNavigate('fixture')}
        >
          Fixture
        </button>
        <button
          className="block text-white text-lg"
          onClick={() => onNavigate('history')}
        >
          Historial
        </button>
        <button
          className="block text-white text-lg"
          onClick={() => onNavigate('ranking')}
        >
          Ranking
        </button>
        <button
          className="block text-white text-lg"
          onClick={() => onNavigate('tyc')}
        >
          TyC
        </button>
      </nav>
    </div>
  );
};

export default SideMenu;
