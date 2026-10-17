import type { LocationDestinationResolver } from "../../application/ports/location-destination";

export function createGoogleMapsDestination(): LocationDestinationResolver {
  return {
    resolve(address, countryCode) {
      const query = new URLSearchParams({
        api: "1",
        destination: address + ", " + countryCode,
      });
      return "https://www.google.com/maps/dir/?" + query.toString();
    },
  };
}
