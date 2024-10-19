import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddMatchPopupProps {
  onClose: () => void;
  onSave: (matchData: MatchData) => void;
}

export interface MatchData {
  date: string;
  result: 'win' | 'draw' | 'loss';
  goalsScored: number;
  matchType: string;
  performance: string;
}

const AddMatchPopup: React.FC<AddMatchPopupProps> = ({ onClose, onSave }) => {
  const [matchData, setMatchData] = useState<MatchData>({
    date: '',
    result: 'win',
    goalsScored: 0,
    matchType: '',
    performance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setMatchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(matchData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-navy-800 rounded-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Agregar Partido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Fecha</label>
              <input
                type="date"
                name="date"
                value={matchData.date}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Resultado</label>
              <select
                name="result"
                value={matchData.result}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
                required
              >
                <option value="win">Ganado</option>
                <option value="draw">Empatado</option>
                <option value="loss">Perdido</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Goles propios</label>
              <input
                type="number"
                name="goalsScored"
                value={matchData.goalsScored}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block mb-1">Tipo</label>
              <input
                type="text"
                name="matchType"
                value={matchData.matchType}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Rendimiento</label>
              <input
                type="text"
                name="performance"
                value={matchData.performance}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
                required
              />
            </div>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchPopup;