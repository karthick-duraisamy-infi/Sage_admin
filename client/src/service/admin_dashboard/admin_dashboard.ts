
import { LocalService } from "@/service/service";

const adminDashboardService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getAdminDashboardData: build.query<any, void>({
      query: () => "staticData/admin_dashboard/admin_dashboard.json",
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAdminDashboardDataQuery, useGetAdminDashboardDataQuery } =
  adminDashboardService;
