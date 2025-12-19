import { CommonService } from "../service";

const organisationService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getOrganisationData: build.query<any, any>({
      query: (params) => {
        const { page = 1, page_size = 6 } = params || {};
        return {
          url: `api/management/organizations/?`,
          method: "GET",
          params: params,
        };
        //  `api/management/organizations/?page=${page}&page_size=${page_size}`;
      },
      providesTags: ["organizations"],
    }),
    createOrganizations: build.mutation<any, any>({
      query: (body) => ({
        url: `api/management/organizations/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["organizations"],
    }),
    updateOrganizations: build.mutation<any, any>({
      query: (body) => ({
        url: `api/management/organizations/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["organizations"],
    }),
    getOrganizationStats: build.query<any,any>({
          query: () => ({
            url: `/api/management/organizations/stats/`,
            method: "GET",
          }),
          providesTags: ["organizations"],
        }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetOrganisationDataQuery,
  useCreateOrganizationsMutation,
  useUpdateOrganizationsMutation,
  useLazyGetOrganizationStatsQuery,
} = organisationService;
