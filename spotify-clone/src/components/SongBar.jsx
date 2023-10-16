import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useSelector, useDispatch } from 'react-redux';

const SongBar = ({
  track,
  data,
  i,
  songid,
}) => {
  // PlayPause functionality
  const dispatch = useDispatch();
  const {isPlaying, activeSong} = useSelector(state => state.player);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (track, i) => {
    dispatch(setActiveSong({ track, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === track?.title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
      <div className='flex-1 flex flex-row justify-between items-center'>
        <img
          className='w-20 h-20 rounded-lg'
          src={
            songid
              ? track?.images?.coverart
              : track?.attributes?.artwork?.url
                  .replace('{w}', '125')
                  .replace('{h}', '125')
          }
          alt={songid && track?.title}
        />
        <div className='flex-1 flex flex-col justify-center mx-3'>
          {songid ? (
            <Link to={`/songs/${track.key}`}>
              <p className='text-xl font-bold text-white'>
                {track?.title}
              </p>
            </Link>
          ) : (
            <p className='text-xl font-bold text-white'>
              {track?.attributes?.name}
            </p>
          )}
          <p className='text-base text-gray-300 mt-1'>
            {songid
              ? track?.subtitle
              : track?.attributes?.albumName}
          </p>
        </div>
      </div>
      {songid ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          track={track}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(track, i)}
        />
      ) : null}
    </div>
  );
};

export default SongBar;
