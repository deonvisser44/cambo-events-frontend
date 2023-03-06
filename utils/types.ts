export {}

export interface ImageDataType {
  url: string;
  path: string;
}

export interface LocationType {
  lat: string;
  lng: string;
}

export interface EventType {
  id: string;
  host_id: string;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  location: LocationType;
  image: ImageDataType;
  category: string[];
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  profile_image: ImageDataType;
  primary_location: LocationType;
}
