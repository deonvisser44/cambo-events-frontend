import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { DateTime } from 'ts-luxon';
import PostEventMap from '@/components/events/post-event-map';
import CategorySelect from '@/components/events/category-select';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user';
import { categoryOptions } from '@/utils/constants';
import { calculateStartAndEndTimes } from '@/utils/helpers';
import { submitEventType } from '@/utils/types';
import camboEventsApi from '@/services/axios-config';

const initialFormValues = {
  name: '',
  description: '',
  startDate: DateTime.local().toISODate(),
  startTime: '12:00',
  endDate: DateTime.local().toISODate(),
  endTime: '00:00',
  categories: [],
  coords: { lat: 11.554032, lng: 104.924882 },
};

const inputStyles =
  'p-1 rounded-md border border-gray-400 text-lg outline-purple-600';
const labelStyles = 'text-lg font-semibold text-gray-200 py-0 mt-1';
const errorStyles = 'text-red-500';

const validationSchema = Yup.object({
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
    .min(1, 'Choose at least one category')
    .max(3, 'Maximum three categories allowed'),
});

export default function PostEvent() {
  const userState = useSelector(selectUserState);
  const { authToken, isUserAuthenticated } = userState;

  const handleSubmitEvent = async (eventArgs: submitEventType) => {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      name,
      description,
      categories,
      coords,
    } = eventArgs;
    const categoriesToUse = categories?.map((categoryObj) => categoryObj.value);
    const { start, end } = calculateStartAndEndTimes({
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    });
    const postEventBody = {
      name,
      description,
      category: categoriesToUse,
      location: { lat: coords.lat.toString(), lng: coords.lng.toString() },
      start_date: start,
      end_date: end,
    };
    const res = await camboEventsApi.post('/event', postEventBody, {
      headers: { authorization: `Bearer ${authToken}` },
    });
  };

  return (
    <div className='min-h-screen py-3'>
      <h3 className='text-3xl font-semibold text-center text-purple-500'>
        Post Event
      </h3>
      <div>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmitEvent(values);
          }}
        >
          {(formik) => (
            <form
              className='w-5/6 mx-auto flex flex-col gap-2'
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor='name' className={labelStyles}>
                Name
              </label>
              <ErrorMessage name='name' component='p' className={errorStyles} />
              <Field
                name='name'
                type='text'
                className={inputStyles}
                placeholder='Event name'
              />

              <label htmlFor='description' className={labelStyles}>
                Description
              </label>
              <ErrorMessage
                name='description'
                component='p'
                className={errorStyles}
              />
              <Field
                name='description'
                as='textarea'
                className={inputStyles + ' min-h-[150px]'}
                placeholder='Give details about the event and optionally paste a link to the Google Maps location'
              />

              <label htmlFor='startDate' className={labelStyles}>
                Start Date
              </label>
              <ErrorMessage
                name='startDate'
                component='p'
                className={errorStyles}
              />
              <Field name='startDate' type='date' className={inputStyles} />

              <label htmlFor='startTime' className={labelStyles}>
                Start Time
              </label>
              <ErrorMessage
                name='startTime'
                component='p'
                className={errorStyles}
              />
              <Field name='startTime' type='time' className={inputStyles} />

              <label htmlFor='endDate' className={labelStyles}>
                End Date
              </label>
              <ErrorMessage
                name='endDate'
                component='p'
                className={errorStyles}
              />
              <Field name='endDate' type='date' className={inputStyles} />

              <label htmlFor='endTime' className={labelStyles}>
                End Time
              </label>
              <ErrorMessage
                name='endTime'
                component='p'
                className={errorStyles}
              />
              <Field name='endTime' type='time' className={inputStyles} />

              <label htmlFor='categories' className={labelStyles}>
                Categories
              </label>
              <ErrorMessage
                name='categories'
                component='p'
                className={errorStyles}
              />
              <Field
                component={CategorySelect}
                name='categories'
                options={categoryOptions}
              />

              <label htmlFor='coords' className={labelStyles}>
                Location
              </label>
              <Field component={PostEventMap} name='coords' />

              <button
                type='submit'
                disabled={!formik.isValid}
                className='p-2 bg-purple-500 disabled:bg-purple-300 rounded-md text-xl text-white mt-2'
              >
                Post Event
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
