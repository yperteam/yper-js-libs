export interface Address {
  id?: string;
  city: string;
  formattedAddress?: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  street: string;
  streetNumber: string;
  zip: string;
  additional?: string;
  additionalNumber?: string;
  country: string;
  floor?: string;
  apartment?: string;
}
