import { LocalService } from "../service";

const menuService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getMenuData: build.query<any, string | void>({
      queryFn: async (userId) => {
        try {
          const response = await fetch('/src/config/config.json');
          const config = await response.json();
          
          // Get user ID from parameter or localStorage
          const userIdToUse = userId || localStorage.getItem('userId');
          
          if (!userIdToUse || !config.credentials[userIdToUse]) {
            return { error: { status: 404, data: 'User configuration not found' } };
          }
          
          const userConfig = config.credentials[userIdToUse];
          return { 
            data: {
              menu: userConfig.menu,
              route: userConfig.route
            }
          };
        } catch (error) {
          return { error: { status: 500, data: 'Failed to load configuration' } };
        }
      },
    }),
    getLandingRoute: build.query<any, void>({
      query: () => "staticData/menu/landing_routes.json",
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetMenuDataQuery, useLazyGetLandingRouteQuery } =
  menuService;
