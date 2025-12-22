import { CommonService } from "../service";
import { MailApiResponse } from "../service.d";

const settingsService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getSettingsInfo: build.query<MailApiResponse<any>, any>({
      query: (param) => ({
        url: "api/management/global-config/",
        method: "GET",
        params: param,
      }),
      providesTags: ["settings"],
    }),

    updateSettings: build.mutation<MailApiResponse<any>, any>({
      query: (body) => ({
        url: `api/management/global-config/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetSettingsInfoQuery, useUpdateSettingsMutation } =
  settingsService;
