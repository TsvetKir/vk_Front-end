import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  GET_FACT: 'getFact',
  GET_AGE: 'getAge',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.GET_FACT, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.GET_AGE, `/${DEFAULT_VIEW_PANELS.GET_AGE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
