import { CommonService } from "../service";

const organisationService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getOrganisationData: build.query<any, any>({
      query: (params) => {
        const { page = 1, page_size = 6 } = params || {};
        return `api/management/organizations/?page=${page}&page_size=${page_size}`;
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
    updateOrganizations: build.mutation<any, { id: number } & Partial<any>>({
      query: ({ id, ...body }) => ({
        url: `api/management/organizations/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["organizations"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetOrganisationDataQuery,
  useCreateOrganizationsMutation,
  useUpdateOrganizationsMutation,
} = organisationService;
