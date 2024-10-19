// src/components/InviteFriendPopup.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InviteFriendPopupProps {
  onClose: () => void;
  onInvite: (email: string) => boolean; // Función para manejar la invitación, retorna true o false según el resultado
}

const InviteFriendPopup: React.FC<InviteFriendPopupProps> = ({
  onClose,
  onInvite,
}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    const inviteSuccess = onInvite(email);
    if (inviteSuccess) {
      setSuccessMessage('¡Invitación enviada exitosamente!');
    } else {
      setErrorMessage('No se pudo encontrar al usuario. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-navy-800 rounded-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Invita a tu amigo/a</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy-700 rounded px-3 py-2"
                placeholder="correo electrónico"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Invitar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteFriendPopup;
