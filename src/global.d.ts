import "leaflet";

declare module "leaflet" {
  namespace Routing {
    interface RoutingControlOptions {
      waypoints?: L.LatLngExpression[];
      routeWhileDragging?: boolean;
      show?: boolean;
      lineOptions?: any;
    }

    function control(options: RoutingControlOptions): L.Control;
  }
}
