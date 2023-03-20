import * as Yup from 'yup';

export const EVENT_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .min(4, 'Must be 4 characters or more')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  description: Yup.string()
    .max(300, 'Must be 300 characters or less')
    .required('Required'),
  startDate: Yup.date().required('Required'),
  startTime: Yup.string(),
  endDate: Yup.date(),
  endTime: Yup.string(),
  categories: Yup.array()
    .max(3, 'Maximum three categories allowed').required('Choose at least one category'),
});
