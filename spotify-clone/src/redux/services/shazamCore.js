import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const shazamCoreAPI = createApi({
  reducerPath: "shazamCoreAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "e6729a1494msh206a919df0199a9p1eabefjsnf2734ba243c9"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopSong: builder.query({
      query: () => "charts/track?locale=en-US&pageSize=20&startFrom=0",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `songs/get-details?key=${songid}&locale=en-US`,
    }),
    getArtistDetails: builder.query({
      query: ({ artistid }) => `artists/get-details?id=${artistid}&l=en-US`,
    }),
    getSongListReccomendation: builder.query({
      query: ({ songid }) =>
        `songs/list-recommendations?key=${songid}&locale=en-US`,
    }),
    getArtistListReccomendation: builder.query({
      query: ({ artistid }) => `artists/get-top-songs?id=${artistid}&l=en-US`,
    }),
    getAroundYou: builder.query({
      query: ({
        country,
      }) => `charts/track?locale=${country}&pageSize=20&startFrom=0
      `,
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTopSongQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongListReccomendationQuery,
  useGetArtistListReccomendationQuery,
  useGetAroundYouQuery,
} = shazamCoreAPI;
