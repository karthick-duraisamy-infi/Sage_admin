import { LocalService } from "../service";

const menuService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getMenuData: build.query<any, void>({
      query: () => "staticData/menu/menu.json",
    }),
    getLandingRoute: build.query<any, void>({
      query: () => "staticData/menu/landing_routes.json",
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetMenuDataQuery, useLazyGetLandingRouteQuery } =
  menuService;
