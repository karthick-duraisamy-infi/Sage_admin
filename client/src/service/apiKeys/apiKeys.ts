import { CommonService } from "../service";
import { MailApiResponse } from "../service.d";


export interface User {
  email_id: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_active: boolean;
  organization_id: number | null;
  role_id: number | null;
  address: string;
  enforce_rate_limits: boolean;
  allow_emails: boolean;
  allow_api_access: boolean;
  r_user_type: number | null;
  r_status: number | null;
}

const apiKeysService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getApiKeysList: build.query<
      MailApiResponse<User[]>,
      any              
    >({
      query: (param) => ({
        url: "api/management/api-keys/",
        method: "GET",
        params: param,
      }),
      providesTags: ["api-keys"],
    }),

    getApiKeysInfo: build.query<
      MailApiResponse<User>,
      { project: string; id: number }
    >({
      query: ({ project, id }) => ({
        url: `api/management/api-keys/`,
        method: "POST",
        params: { project },
      }),
      providesTags: ["api-keys"],
    }),

    createApiKeys: build.mutation<
      MailApiResponse<User>,      
      any
    >({
      query: (body) => ({
        url: `api/management/api-keys/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["api-keys"],
    }),

    updateApiKeys: build.mutation<
      MailApiResponse<User>,
      { id: number } & Partial<any>
    >({
      query: ({ id, ...body }) => ({
        url: `api/management/api-keys/${id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["api-keys"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetApiKeysListQuery,
  useLazyGetApiKeysInfoQuery,
  useCreateApiKeysMutation,
  useUpdateApiKeysMutation,
} = apiKeysService;
