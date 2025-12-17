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

const rolesService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getRolesList: build.query<
      MailApiResponse<User[]>,
      any              
    >({
      query: (param) => ({
        url: "api/management/roles/",
        method: "GET",
        params: param,
      }),
      providesTags: ["roles"],
    }),

    getRolesInfo: build.query<
      MailApiResponse<User>,     
      { project: string; id: number }
    >({
      query: ({ project, id }) => ({
        url: `api/management/roles/`,
        method: "POST",
        params: { project },
      }),
      providesTags: ["roles"],
    }),

    createRoles: build.mutation<
      MailApiResponse<User>,      
      any
    >({
      query: (body) => ({
        url: `api/management/roles/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["roles"],
    }),

    updateRoles: build.mutation<
      MailApiResponse<User>,
      { id: number } & Partial<any>
    >({
      query: ({ id, ...body }) => ({
        url: `api/management/roles/${id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["roles"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetRolesListQuery,
  useLazyGetRolesInfoQuery,
  useCreateRolesMutation,
  useUpdateRolesMutation,
} = rolesService;
