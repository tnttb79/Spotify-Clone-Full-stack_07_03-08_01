import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAroundYouQuery } from "../redux/services/shazamCore";
import { SongCard } from "../components";
import { Loader, Error } from "../components";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetching current country w Axios
  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_l4GuCylHhaKADh4lhQqnxe0z1M5qY&ipAddress=8.8.8.8"
      )
      .then(function (response) {
        setCountry(response?.data.location?.country);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  //Fetching songs data of a specific country w RTK Query
  const {
    data: dataCountry,
    error: errorCountry,
    isFetching: isFetchingCountry,
  } = useGetAroundYouQuery(country);

  //Getting player state
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetchingCountry) return <Loader title="Loading songs..." />;
  if (errorCountry) return <Error />;

  return (
    <div>
      <h2 className="font-bold text-3xl text-white text-left">{`Popular songs in ${country}`}</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {dataCountry?.tracks?.map((track, i) => (
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
            data={dataCountry?.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
