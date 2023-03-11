import { EventType } from './types';
import { v4 as uuid } from 'uuid';
import { Icon } from 'leaflet';

export const user = {
  id: 'some-id',
};

export const TEST_EVENTS: EventType[] = [
  {
    id: uuid(),
    host_id: uuid(),
    name: "Deon's House Party",
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_date: new Date(),
    end_date: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: 'Food Fair @ Market',
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_date: new Date(),
    end_date: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: "Bello's Wine Tasting",
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_date: new Date(),
    end_date: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: 'Cambodia Country Club Golf Day',
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_date: new Date(),
    end_date: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
];

export const categoryOptions = [
  { label: 'ART', value: 'ART' },
  { label: 'MUSIC', value: 'MUSIC' },
  { label: 'DANCE', value: 'DANCE' },
];

export const locationIcon = new Icon({
  iconUrl: 'https://www.svgrepo.com/show/449139/location-pin-filled.svg',
  iconSize: [32, 32],
});
