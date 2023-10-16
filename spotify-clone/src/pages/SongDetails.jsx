import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import {
  useGetSongDetailsQuery,
  useGetSongListReccomendationQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  // Get main song data w Redux hook
  const {
    data: songData,
    error: songError,
    isFetching: songIsFetching,
  } = useGetSongDetailsQuery({ songid });

  // Get related song data w Redux hook
  const {
    data: relatedSongData,
    error: relatedSongError,
    isFetching: relatedSongIsFetching,
  } = useGetSongListReccomendationQuery({ songid });

  if (songIsFetching || relatedSongIsFetching) return <Loader title="Searching song details" />;

  if (songError || relatedSongError) return <Error />;
  
  return (
    <div className='flex flex-col'>
      <DetailsHeader songData={songData} />
      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
        <div className='mt-5'>
          {songData?.sections?.[1] ? (
            songData.sections[1].text.map((line, i) => (
              <p key={i} className='text-gray-400 text-base my-1'>
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>
              Sorry, No lyrics available!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs 
      relatedSongs={relatedSongData?.tracks}
      songid={songid}
      />
    </div>
  );
};

export default SongDetails;
