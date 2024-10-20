// ProfileHeader.tsx
import React from 'react';
import ProfileStats from './ProfileStats'; // Asegúrate de que esté bien la ruta del componente ProfileStats

interface ProfileHeaderProps {
  name: string;
  imageUrl: string;
  pg: number;
  cg: number;
  gp: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, imageUrl, pg, cg, gp }) => {
    return (
      <div className="flex flex-col items-center mt-5 mb-8"> {/* Aquí está el margen inferior */}
        <img
          src={imageUrl}
          alt={`Perfil de ${name}`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">{name}</h1>
        <ProfileStats pg={pg} cg={cg} gp={gp} />
      </div>
    );
  };
  

export default ProfileHeader;
