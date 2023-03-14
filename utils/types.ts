export {}

export interface ImageDataType {
  url: string;
  path: string;
}

export interface LocationType {
  lat: string | number;
  lng: string | number;
}

export interface MapClickEvent {
  latlng: LocationType;
}

export interface EventType {
  id: string;
  host_id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: LocationType;
  image: ImageDataType;
  category: string[];
}

export interface SavedEventType {
  event: EventType;
  id: string;
  user_id: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  profile_image: ImageDataType;
  primary_location: LocationType;
}

export interface calculateEndTypesParams {
  startDate: Date | null | string;
  startTime: string;
  endDate?: Date | null | string;
  endTime?: string | null;
}

export interface submitEventType {
  name: string;
  description: string;
  startDate: Date | null | string;
  startTime: string;
  endDate?: Date | null | string;
  endTime?: string | null;
  categories?: { label:string, value: string }[];
  coords: LocationType;
}

export interface UserAuthResponseUserDataType {
    id: string;
    token: string;
}

export interface UserStateType {
  user_id: string,
  isUserAuthenticated: boolean,
  authToken: string,
  savedEvents: SavedEventType[],
  savedEventIds: string[],
  hasAccessTokenBeenAddedToInterceptor: boolean,
}
