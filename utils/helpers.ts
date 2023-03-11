import { calculateEndTypesParams } from "./types";


export const calculateStartAndEndTimes = ({
  startDate,
  startTime,
  endDate,
  endTime,
}: calculateEndTypesParams) => {
  const startTimeAsDate = new Date(startDate!);
  const [startHours, startMinutes] = startTime.split(':');
  startTimeAsDate.setHours(Number(startHours));
  startTimeAsDate.setMinutes(Number(startMinutes));
  const start = startTimeAsDate.toISOString();
  let endTimeAsDate;
  let end = null;
  if (endDate && endTime) {
    endTimeAsDate = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    endTimeAsDate.setHours(Number(endHours));
    endTimeAsDate.setMinutes(Number(endMinutes));
    end = endTimeAsDate.toISOString();
  }
  return { start, end };
};
