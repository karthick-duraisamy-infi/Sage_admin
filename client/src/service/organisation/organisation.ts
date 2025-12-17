import { CommonService } from "../service";

const organisationService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getOrganisationData: build.query<any, any>({
      query: (params) => {
        const { page = 1 } = params || {};
        return `api/management/organizations/?page=${page}`;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetOrganisationDataQuery } = organisationService;
