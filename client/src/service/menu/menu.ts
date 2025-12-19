import { LocalService } from "../service";

const menuService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getMenuData: build.query<any, string | void>({
      queryFn: async (userId) => {
        try {
          const response = await fetch('/staticData/config.json');
          if (!response.ok) {
            console.error('Failed to fetch config.json:', response.status);
            return { error: { status: response.status, data: 'Failed to fetch configuration' } };
          }
          
          const config = await response.json();
          
          // Get user ID from parameter or localStorage
          const userIdToUse = userId || localStorage.getItem('userId');
          
          if (!userIdToUse) {
            console.error('No user ID provided');
            return { error: { status: 401, data: 'User ID not found' } };
          }
          
          if (!config.credentials || !config.credentials[userIdToUse]) {
            console.error('User configuration not found for ID:', userIdToUse);
            return { error: { status: 404, data: 'User configuration not found' } };
          }
          
          const userConfig = config.credentials[userIdToUse];
          
          if (!userConfig.menu || !userConfig.route) {
            console.error('Invalid user configuration structure');
            return { error: { status: 500, data: 'Invalid configuration structure' } };
          }
          
          return { 
            data: {
              menu: userConfig.menu,
              route: userConfig.route
            }
          };
        } catch (error) {
          console.error('Error loading menu configuration:', error);
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
