import { DateTime } from 'ts-luxon';
import { EventType, EventsByDate, SavedEventType, calculateEndTypesParams } from './types';

export const calculateStartAndEndTimes = ({
  startDate,
  startTime,
  // endDate,
  // endTime,
}: calculateEndTypesParams) => {
  const startTimeAsDate = new Date(startDate!);
  const [startHours, startMinutes] = startTime.split(':');
  startTimeAsDate.setHours(Number(startHours));
  startTimeAsDate.setMinutes(Number(startMinutes));
  const start = startTimeAsDate.toISOString();
  let endTimeAsDate;
  let end = null;
  // if (endDate && endTime) {
  //   endTimeAsDate = new Date(endDate);
  //   const [endHours, endMinutes] = endTime.split(':');
  //   endTimeAsDate.setHours(Number(endHours));
  //   endTimeAsDate.setMinutes(Number(endMinutes));
  //   end = endTimeAsDate.toISOString();
  // }
  return { start, end };
};

// group events by start date
export const groupByDay = (myArray: EventType[]): EventType[][] => {
  const groups: EventType[][] = [];
  let currentGroup: EventType[] = [];

  // Sort the array by start_time ascending
  const sortedArray = [...myArray].sort((a, b) =>
    (a.start_date as string).localeCompare(b.start_date as string)
  );

  if (sortedArray.length < 1) {
    return [];
  } else {
    for (let i = 0; i < sortedArray.length; i++) {
      const obj = sortedArray[i];

      // Parse the start_time string into a Luxon DateTime object
      const start = DateTime.fromISO(obj.start_date as string);

      // If this object starts on the same day as the previous object, add it to the current group
      const startAsLuxonDateTime = DateTime.fromISO(
        sortedArray[i - 1]?.start_date as string
      );
      if (i > 0 && start.hasSame(startAsLuxonDateTime, 'day')) {
        currentGroup.push(obj);
      }
      // Otherwise, start a new group with this object
      else {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [obj];
      }
    }

    // Add the last group to the array if it's not empty
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }
};

// group saved events by start date
export const groupSavedEventByDay = (myArray: SavedEventType[]): EventType[][] => {
  const groups: EventType[][] = [];
  let currentGroup: EventType[] = [];

  // Sort the array by start_time ascending
  const sortedArray = [...myArray].sort((a, b) =>
    (a.event.start_date as string).localeCompare(b.event.start_date as string)
  );

  if (sortedArray.length < 1) {
    return [];
  } else {
    for (let i = 0; i < sortedArray.length; i++) {
      const obj = sortedArray[i];

      // Parse the start_time string into a Luxon DateTime object
      const start = DateTime.fromISO(obj.event.start_date as string);

      // If this object starts on the same day as the previous object, add it to the current group
      const startAsLuxonDateTime = DateTime.fromISO(
        sortedArray[i - 1]?.event.start_date as string
      );
      if (i > 0 && start.hasSame(startAsLuxonDateTime, 'day')) {
        currentGroup.push(obj.event);
      }
      // Otherwise, start a new group with this object
      else {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [obj.event];
      }
    }

    // Add the last group to the array if it's not empty
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }
};
