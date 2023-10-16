import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery, useGetArtistListReccomendationQuery } from '../redux/services/shazamCore';


const ArtistDetails = () => {
  const { artistid } = useParams();
  const {
    data: artistData,
    error: artistError,
    isFetching: artistIsFetching,
  } = useGetArtistDetailsQuery({ artistid });

   // Get related song data w Redux hook
   const {
    data: relatedArtistSongData,
    error: relatedArtistSongError,
    isFetching: relatedArtistSongIsFetching,
  } = useGetArtistListReccomendationQuery({ artistid });

  if (artistIsFetching || relatedArtistSongIsFetching) return <Loader title="Loading artist details..." />;
  
  if (artistError || relatedArtistSongError) return <Error />;
  
  return (
    <div className='flex flex-col'>
      <DetailsHeader artistData={artistData?.data?.[0]} />
      <RelatedSongs 
      relatedSongs={relatedArtistSongData?.data}
      />
    </div>
  );
};

export default ArtistDetails;
