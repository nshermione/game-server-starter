export interface Route {
  path: string;
  method?: string;
  components: RouteComponent[];
}

export interface RouteMiddleware {
  process(req, res, next?): any;
}

export interface RouteComponent {
  process(req, res, next?): any;
}

export function appUseRoutes(app, routes: Route[]) {
  for (let route of routes) {
    let method = route.method || "get";
    let processes = route.components.map(comp => comp.process);
    app[method](route.path, ...processes);
  }
}