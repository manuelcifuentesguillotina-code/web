export interface LocationDestinationResolver {
  resolve(address: string, countryCode: string): string;
}
