import { NavLink } from "react-router-dom";
import { data } from "../assets/data";
import { useEffect, useRef } from "react";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { FreeMode } from "swiper";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useGetTopSongQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

const TopSongCard = ({
  track,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => (
  <div
    className={`w-full flex items-center hover:bg-[#4c426e] ${
      activeSong?.title === track?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
    <div className="flex-1 flex justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={
          track?.images?.background ||
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.G0V_9qWp5vw22dxNqpNL7wHaHa%26pid%3DApi&f=1&ipt=748f3579ddf1724d1e87bcd12d33acfe465b24cdb51b81b66de9a3536ddbac94&ipo=images"
        }
      />
      <div className="flex-1 flex flex-col mx-3">
        <NavLink to={`/songs/${track.key}`}>
          <h3 className="text-lg font-bold text-white">
            {track?.title || "Unknown"}
          </h3>
        </NavLink>
        <NavLink to={`/artists/${track?.artists[0].adamid}`}>
          <h3 className="text-base text-gray-300 mt-1">
            {track?.subtitle || "Unknown"}
          </h3>
        </NavLink>
      </div>
    </div>

    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      track={track}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
);

const TopPlay = () => {
  // Not using the API right now. Use hard coded array instead
  // const { data } = useGetTopSongQuery();
  const slicedData = data?.slice(0, 5);

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handlePlayClick = (track, i) => {
    dispatch(setActiveSong({ track, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* Top Songs */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-white font-bold text-2xl">Top Songs</h3>
          <NavLink
            to="/top-charts"
            className="text-gray-300 text-base cursor-pointer"
          >
            See more
          </NavLink>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {slicedData?.map((track, i) => (
            <TopSongCard
              key={track.key}
              track={track}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(track, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists with Swiper */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <NavLink to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </NavLink>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {slicedData?.map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: "20%", height: "20%" }}
              className="animate-slideright"
            >
              <NavLink to={`/artists/${artist?.artists[0].adamid}`}>
                <img
                  src={artist?.images?.background}
                  alt="Name"
                  className="rounded-full w-9/12 object-cover"
                />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
