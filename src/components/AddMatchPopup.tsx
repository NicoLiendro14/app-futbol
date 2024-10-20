import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddMatchPopupProps {
  onClose: () => void;
  onSave: (matchData: MatchData) => void;
}

export interface MatchData {
  date: string;
  homeGoals: number;
  awayGoals: number;
  goalsScored: number;
  matchType: string;
  performance: string;
}

const AddMatchPopup: React.FC<AddMatchPopupProps> = ({ onClose, onSave }) => {
  const [matchData, setMatchData] = useState<MatchData>({
    date: '',
    homeGoals: 0,
    awayGoals: 0,
    goalsScored: 0,
    matchType: 'F5',  // Preseleccionamos F5 como el tipo por defecto
    performance: 'regular',  // Preseleccionamos rendimiento como "regular"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMatchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(matchData);
    onClose();
  };

  // Función para agregar el color al rendimiento
  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'pésimo':
        return 'bg-red-500';
      case 'malo':
        return 'bg-orange-500';
      case 'regular':
        return 'bg-yellow-500';
      case 'bueno':
        return 'bg-green-500';
      case 'sobresaliente':
        return 'bg-blue-500';
      default:
        return '';
    }
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
            {/* Fecha */}
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

            {/* Resultado */}
            <div>
              <label className="block mb-1">Resultado</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="homeGoals"
                  value={matchData.homeGoals}
                  onChange={handleChange}
                  className="w-1/3 bg-navy-700 rounded px-3 py-2"
                  required
                  min="0"
                />
                <span className="text-white">a</span>
                <input
                  type="number"
                  name="awayGoals"
                  value={matchData.awayGoals}
                  onChange={handleChange}
                  className="w-1/3 bg-navy-700 rounded px-3 py-2"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Goles propios */}
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

            {/* Tipo de partido (F5, F7, etc) */}
            <div>
              <label className="block mb-1">Tipo</label>
              <select
                name="matchType"
                value={matchData.matchType}
                onChange={handleChange}
                className="w-full bg-navy-700 rounded px-3 py-2"
              >
                <option value="F5">F5</option>
                <option value="F7">F7</option>
                <option value="F8">F8</option>
                <option value="F11">F11</option>
              </select>
            </div>

            {/* Rendimiento */}
            <div>
              <label className="block mb-1">Rendimiento</label>
              <select
                name="performance"
                value={matchData.performance}
                onChange={handleChange}
                className={`w-full bg-navy-700 rounded px-3 py-2 ${getPerformanceColor(matchData.performance)}`}
              >
                <option value="pésimo">Pésimo</option>
                <option value="malo">Malo</option>
                <option value="regular">Regular</option>
                <option value="bueno">Bueno</option>
                <option value="sobresaliente">Sobresaliente</option>
              </select>
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
