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

const userService = CommonService.injectEndpoints({
    endpoints: (build) => ({
        getUsersList: build.query<
            MailApiResponse<User[]>,
            any
        >({
            query: (param) => ({
                url: "api/management/users/",
                method: "GET",
                params: param,
            }),
            providesTags: ["users"],
        }),

        getUserInfo: build.query<
            MailApiResponse<User>,
            { project: string; id: number }
        >({
            query: ({ project, id }) => ({
                url: `api/management/users/${id}/`,
                method: "GET",
                params: { project },
            }),
            providesTags: ["users"],
        }),

        createUser: build.mutation<
            MailApiResponse<User>,
            any
        >({
            query: (body) => ({
                url: `api/management/users/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["users"],
        }),

        updateUser: build.mutation<
            MailApiResponse<User>,
            any
        >({
            query: (body) => ({
                url: `api/management/users/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["users"],
        }),
        getUsersStats: build.query<
            MailApiResponse<any>,
            any
        >({
            query: () => ({
                url: `api/management/users/stats/`,
                method: "GET",
            }),
            providesTags: ["users"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useLazyGetUsersListQuery,
    useLazyGetUserInfoQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useLazyGetUsersStatsQuery
} = userService;
