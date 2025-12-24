import { LocalService } from "../service";

const menuService = LocalService.injectEndpoints({
  endpoints: (build) => ({
    getMenuData: build.query<any, string | void>({
      queryFn: async (userId) => {
        try {
          const response = await fetch('./staticData/config.json');
          
          if (!response.ok) {
            console.error('Failed to fetch config.json:', response.status, response.statusText);
            return { data: { menu: [], route: [] } };
          }
          
          const config = await response.json();
          console.log('Config loaded:', config);
          
          // Get user ID from parameter or localStorage
          const userIdToUse = userId || localStorage.getItem('userId');
          console.log('User ID to use:', userIdToUse);
          
          if (!userIdToUse) {
            console.error('No user ID provided');
            return { data: { menu: [], route: [] } };
          }
          
          if (!config.credentials || !config.credentials[userIdToUse]) {
            console.error('User configuration not found for ID:', userIdToUse);
            console.log('Available user IDs:', Object.keys(config.credentials || {}));
            return { data: { menu: [], route: [] } };
          }
          
          const userConfig = config.credentials[userIdToUse];
          console.log('User config:', userConfig);
          
          if (!userConfig.menu || !userConfig.route) {
            console.error('Invalid user configuration structure');
            return { data: { menu: [], route: [] } };
          }
          
          console.log('Menu data loaded successfully:', { menu: userConfig.menu, route: userConfig.route });
          
          return { 
            data: {
              menu: userConfig.menu,
              route: userConfig.route
            }
          };
        } catch (error) {
          console.error('Error loading menu configuration:', error);
          return { data: { menu: [], route: [] } };
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
