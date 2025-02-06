import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useSelector } from "react-redux";
import { useGetSongByGenreQuery } from "../redux/services/shazamCorev2";
import { useState } from "react";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [genre, setGenre] = useState("POP");
  const { data, error, isLoading } = useGetSongByGenreQuery({ genre });

  if (isLoading) return <Loader title="Loading songs..." />;
  if (error) return <Error />;
  function handleGenre(e) {
    setGenre(e.target.value);
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10   ">
        <h2 className="font-bold text-3xl text-white text-left">{genres.find((g) => g.value === genre).title}</h2>
        <select
          onChange={handleGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap m:justify-start justify-center gap-8">
        {data?.tracks.map((track, i) => (
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

export default Discover;
