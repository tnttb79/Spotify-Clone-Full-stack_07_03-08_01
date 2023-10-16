import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongBySearchQuery } from "../redux/services/shazamCorev2";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSongBySearchQuery(searchTerm);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

    if (isFetching) return <Loader/>;

    if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        {`Result for ${searchTerm}`}
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.hits?.map((track, i) => (
          <SongCard
            img={
              track.images?.default ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.G0V_9qWp5vw22dxNqpNL7wHaHa%26pid%3DApi&f=1&ipt=748f3579ddf1724d1e87bcd12d33acfe465b24cdb51b81b66de9a3536ddbac94&ipo=images"
            }
            title={track?.heading?.title}
            artist={track?.heading?.subtitle !== "Undefined" ? track.heading.subtitle : "Unknown"}
            key={track.key}
            track={track}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.track}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
