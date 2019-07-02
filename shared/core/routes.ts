export interface Route {
  path: string;
  method?: string;
  component: RouteComponent;
}

export interface RouteComponent {
  process(req, res, next?): any;
}

export function appUseRoutes(app, routes: Route[]) {
  for (let route of routes) {
    let method = route.method || "get";
    app[method](route.path, route.component.process);
  }
}