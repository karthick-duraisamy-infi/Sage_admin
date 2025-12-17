import { CommonService } from "../service";

const analyticsService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getCommonAnalyticsData: build.query<any, void>({
      query: () => "metricsData//systemOverview",
    }),
    getMenuApiAnalyticsData: build.query<any, {endPointName?: any; range?: any}>({
      query: ({endPointName,range }) =>
        // `metricsData/endpoint=${endPointName}&range=${range}`,
        `metricsData/endpointHealth`,
    }),
    getMenuPerformanceAnalyticsData: build.query<any, {range?: any}>({
      query: ({range}) =>
        // `metricsData/systemPerformance&range=${range}`,
      `metricsData/systemPerformance`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetCommonAnalyticsDataQuery,
  useLazyGetMenuApiAnalyticsDataQuery,
  useLazyGetMenuPerformanceAnalyticsDataQuery,
} = analyticsService;
