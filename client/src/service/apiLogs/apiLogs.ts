
import { LocalService } from "@/service/service";

const apiLogsService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getApiLogsData: build.query<any, void>({
      query: () => "staticData/apiLogs/apiLogs.json",
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetApiLogsDataQuery, useGetApiLogsDataQuery } =
  apiLogsService;
