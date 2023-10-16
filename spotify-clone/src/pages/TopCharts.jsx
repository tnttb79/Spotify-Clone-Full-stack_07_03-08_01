import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopSongQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopSongQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((track, i) => (
          <SongCard
            img={
                track.images?.coverart ||
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.G0V_9qWp5vw22dxNqpNL7wHaHa%26pid%3DApi&f=1&ipt=748f3579ddf1724d1e87bcd12d33acfe465b24cdb51b81b66de9a3536ddbac94&ipo=images"
            }
            title={track.title}
            artist={track.subtitle}
            key={track.key}
            track={track}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;