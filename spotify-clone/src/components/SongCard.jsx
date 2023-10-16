import React from "react";
import PlayPause from "./PlayPause";
import { useDispatch } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { NavLink } from "react-router-dom";

const SongCard = ({
  img,
  title,
  artist,
  track,
  isPlaying,
  activeSong,
  data,
  i,
}) => {
  const dispatch = useDispatch();
  const handlePlayClick = () => {
    dispatch(setActiveSong({ track, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full h-56 group ">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === track.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            track={track}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={img} className="w-full h-full rounded-lg" />
      </div>
      <div className="mt-4 flex flex-col">
        <strong className="font-semibold text-lg text-white truncate">
          <NavLink to={`/songs/${track.key}`}>{title}</NavLink>
        </strong>

        <p className="text-sm truncate text-gray-300 mt-1">
          <NavLink
            to={
              track.artists
                ? `/artists/${track?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {artist}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
