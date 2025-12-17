import { CommonService } from "../service";

const dashboardService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getCommonDashboardData: build.query<any, any>({
      query: () => "metricsData/dashboardData?dateRange=7",
    }),
    getApiCallData: build.query<any, {endpointName: any, range?: string}>({
      query: ({endpointName, range}) => `metricsData/apiCalls?filter_endpoint=${endpointName}&range=${range}`,
    }),
    getResponseTimeData: build.query<any, {endPointApi : any, range?: string}>({
      query: ({endPointApi, range}) => `metricsData/responseTime?filter=${endPointApi}&range=${range}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetApiCallDataQuery,
  useLazyGetCommonDashboardDataQuery,
  useLazyGetResponseTimeDataQuery,
} = dashboardService;
