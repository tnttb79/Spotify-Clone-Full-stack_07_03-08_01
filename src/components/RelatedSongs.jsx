import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({ relatedSongs, songid }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>{songid ? "Related Songs:" : "Top Songs:"}</h1>
      <div className='mt-6 w-full flex flex-col'>
        {relatedSongs && relatedSongs.length > 0 ? (
          relatedSongs.map((relatedSong, i) => (
            <SongBar
              key={relatedSong.key}
              track={relatedSong}
              i={i}
              songid={songid}
              data={relatedSongs}
            />
          ))
        ) : (
          <p className='text-gray-400 text-base my-1'>No related songs found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedSongs;
