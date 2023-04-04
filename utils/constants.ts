import { EventType } from './types';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'ts-luxon';


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

export enum EventCategoryOptions {
  ART = 'ART',
  MUSIC = 'MUSIC',
  DANCE = 'DANCE',
  QUIZ = 'QUIZ',
  PARTY = 'PARTY',
  FOOD = 'FOOD',
  DRINK = 'DRINK',
  EDUCATION = 'EDUCATION',
  SPORTS = 'SPORTS',
  CONCERT = 'CONCERT',
  FESTIVAL = 'FESTIVAL',
  EXPO = 'CONFERENCE',
  NETWORKING = 'NETWORKING',
  CULTURAL = 'CULTURAL',
  WORKSHOP = 'WORKSHOP',
  TRADE_SHOW = 'TRADE_SHOW',
}

export const categoryOptions = [
  { label: 'ART', value: 'ART' },
  { label: 'MUSIC', value: 'MUSIC' },
  { label: 'DANCE', value: 'DANCE' },
  { label: 'QUIZ', value: 'QUIZ' },
  { label: 'PARTY', value: 'PARTY' },
  { label: 'FOOD', value: 'FOOD' },
  { label: 'DRINK', value: 'DRINK' },
  { label: 'SPORTS', value: 'SPORTS' },
  { label: 'CONCERT', value: 'CONCERT' },
  { label: 'FESTIVAL', value: 'FESTIVAL' },
  { label: 'CONFERENCE', value: 'CONFERENCE' },
  { label: 'NETWORKING', value: 'NETWORKING' },
  { label: 'CULTURAL', value: 'CULTURAL' },
  { label: 'WORKSHOP', value: 'WORKSHOP' },
  { label: 'EDUCATION', value: 'EDUCATION' },
];

export const INPUT_STYLES =
  'p-1 rounded-md border border-gray-400 text-lg outline-purple';
export const LABEL_STYLES = 'text-lg font-semibold text-gray-200 py-0 mt-1';
export const ERROR_STYLES = 'text-red-500';

export const DEFAULT_CURRENT_EVENT_STATE = {
  id: '',
  host_id: '',
  name: '',
  description: '',
  start_date: DateTime.local().toISODate()!,
  end_date: DateTime.local().toISODate()!,
  location: { lat: 11.554032, lng: 104.924882 },
  image: { url: '', path: '' },
  category: [],
};
