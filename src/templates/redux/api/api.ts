import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utilities/baseQuery.js';
import { RootState } from '../store.js';
import { TagTypes } from '../utilities/tags.js';
import { errorStatus } from '../utilities/response.js';
import { clearAuth } from '../slice/authSlice.js';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
	fetchBaseQuery({
		baseUrl,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState;
			const token = state.auth.token;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	});

export const api = createApi({
	reducerPath: 'root',
	baseQuery: async (args, api, extraOptions) => {
		const response = await baseQuery(args, api, extraOptions);
		if (response.error && errorStatus.includes(response.error.status)) {
			api.dispatch(clearAuth());
			localStorage.clear();
		}
		return response;
	},

	keepUnusedDataFor: 60,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: false,
	refetchOnReconnect: true,
	tagTypes: Object.values(TagTypes),
	endpoints: () => ({}),
});

export type ApiEndpoint = typeof api.endpoints;
export default api;
