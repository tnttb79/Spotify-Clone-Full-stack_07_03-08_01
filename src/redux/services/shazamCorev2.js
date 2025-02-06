import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreAPIv2 = createApi({
  reducerPath: "shazamCoreAPIv2",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "e6729a1494msh206a919df0199a9p1eabefjsnf2734ba243c9"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongByGenre: builder.query({
      query: ({ genre }) =>
        `charts/get-top-songs-in_country_by_genre?country_code=GB&genre=${genre}&limit=20`,
    }),
    getSongBySearch: builder.query({
        query: ({ searchTerm }) =>
          `search?term=${searchTerm}&limit=10`,
      }),
  }),
});
export const { useGetSongByGenreQuery, useGetSongBySearchQuery } = shazamCoreAPIv2;
