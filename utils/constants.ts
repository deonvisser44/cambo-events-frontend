import { EventType } from './types';
import { v4 as uuid } from 'uuid';

export const user = {
  id: 'some-id',
};

export const TEST_EVENTS: EventType[] = [
  {
    id: uuid(),
    host_id: uuid(),
    name: "Deon's House Party",
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_time: new Date(),
    end_time: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: 'Food Fair @ Market',
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_time: new Date(),
    end_time: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: "Bello's Wine Tasting",
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_time: new Date(),
    end_time: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
  {
    id: uuid(),
    host_id: uuid(),
    name: 'Cambodia Country Club Golf Day',
    description: 'Going to be a great party, invite yur friends and BYOB!',
    start_time: new Date(),
    end_time: new Date(),
    location: { lat: '11.562108', lng: '104.888535' },
    image: { path: '', url: '' },
    category: ['art', 'music', 'dance'],
  },
];
