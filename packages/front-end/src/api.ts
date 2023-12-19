import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CryptoDataItem } from './Components/SpecificCryptoInfos/Chart';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getCryptoExternal: builder.query<CryptoDataItem[], { symbol: string; interval: string; limit: number }>({
      query: ({ symbol, interval, limit }) => ({
        url: `/crypto/external`,
        method: 'GET',
        params: { symbol, interval, limit },
      }),
      keepUnusedDataFor: 900,
    }),
  }),
});

export const { useGetCryptoExternalQuery, useLazyGetCryptoExternalQuery } = api;