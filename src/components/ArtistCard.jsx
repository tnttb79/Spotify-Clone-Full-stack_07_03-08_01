import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      // onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <NavLink to={`/artists/${track?.artists[0]?.adamid}` || "/top-artists"}>
        <img
          alt="song_img"
          src={track?.images?.coverart}
          className="w-full h-56 rounded-lg"
        />
        <p className="mt-4 font-semibold text-lg text-white truncate">
          {track?.subtitle}
        </p>
      </NavLink>
    </div>
  );
};

export default ArtistCard;
