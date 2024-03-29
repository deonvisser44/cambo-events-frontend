import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { DateTime } from 'ts-luxon';
import CategorySelect from '@/components/events/category-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryOptions,
  cityOptions,
  DEFAULT_CURRENT_EVENT_STATE,
} from '@/utils/constants';
import { calculateStartAndEndTimes } from '@/utils/helpers';
import { EventsStateType, submitEventType } from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import { EVENT_VALIDATION_SCHEMA } from '@/utils/yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import CitySelect from '@/components/events/city-select';
import { selectEventsState, setCurrentEvent } from '@/store/events';

const PostEventMap = dynamic(
  () => import('../../components/events/post-event-map'),
  {
    ssr: false,
  }
);

const INPUT_STYLES =
  'p-1 rounded-md border border-gray-400 text-lg outline-purple w-full';
const LABEL_STYLES = 'text-lg font-semibold text-gray-200 py-0 mt-1';
const ERROR_STYLES = 'text-red-500';

export default function EditEventPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const eventsState: EventsStateType = useSelector(selectEventsState);
  const { currentEvent } = eventsState;
  const eventCopy = { ...currentEvent };
  const start = DateTime.fromJSDate(
    new Date(currentEvent.start_date)
  ).toISODate();
  // const end = DateTime.fromJSDate(new Date(currentEvent.end_date)).toISODate();
  const selectedCategories = currentEvent.category.map((category) => {
    return { label: category.toUpperCase(), value: category };
  });
  const startMilitaryTime = DateTime.fromJSDate(
    new Date(currentEvent.start_date)
  ).toFormat('hh:mm');
  // const endMilitaryTime = DateTime.fromJSDate(
  //   new Date(currentEvent.end_date)
  // ).toFormat('hh:mm');

  const initialFormValues = {
    name: currentEvent?.name,
    description: currentEvent?.description,
    startDate: start,
    startTime: startMilitaryTime,
    // endDate: end,
    // endTime: endMilitaryTime,
    categories: selectedCategories,
    area: {
      label: currentEvent?.area?.toUpperCase(),
      value: currentEvent?.area?.toUpperCase(),
    },
    coords: currentEvent?.location,
  };

  const handleSubmitEvent = async (eventArgs: submitEventType) => {
    const {
      startDate,
      startTime,
      // endDate,
      // endTime,
      name,
      description,
      categories,
      coords,
      area,
    } = eventArgs;
    const categoriesToUse = categories?.map((categoryObj) => categoryObj.value);
    const { start, end } = calculateStartAndEndTimes({
      startDate: startDate,
      startTime: startTime,
      // endDate: endDate,
      // endTime: endTime,
    });
    const postEventBody = {
      id: eventCopy.id,
      name,
      description,
      category: categoriesToUse,
      location: { lat: coords.lat.toString(), lng: coords.lng.toString() },
      start_date: start,
      end_date: start,
      area: area.value,
    };
    const { status } = await camboEventsApi.put('/event', postEventBody);
    if (status === 200) {
      toast.success('Event updated');
      dispatch(setCurrentEvent(DEFAULT_CURRENT_EVENT_STATE));
    } else {
      toast.warn('Failed to update event');
    }
    router.replace('/my-events');
  };

  if (!currentEvent) {
    return (
      <div className='min-h-screen mx-auto my-auto'>Something went wrong!</div>
    );
  } else {
    return (
      <>
        <Head>
          <title>Edit Event - Cambo Events</title>
          <meta
            name='description'
            content='Find, share and post events happening in Cambodia'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
          <meta property='og:title' content='Edit Event - Cambo Events' />
          <meta
            property='og:description'
            content='Find, share and post events happening in Cambodia'
          />
          <meta property='og:image' content='/favicon.ico' />
        </Head>
        <div className='min-h-screen py-3 md:w-2/5 mx-auto my-auto'>
          <h3 className='text-3xl text-center text-purple'>Edit Event</h3>
          <div>
            <Formik
              initialValues={initialFormValues}
              validationSchema={EVENT_VALIDATION_SCHEMA}
              onSubmit={(values) => {
                handleSubmitEvent(values);
              }}
            >
              {(formik) => (
                <form
                  className='w-5/6 mx-auto flex flex-col gap-2 mb-6 mt-4'
                  onSubmit={formik.handleSubmit}
                >
                  <label htmlFor='name' className={LABEL_STYLES}>
                    Name
                  </label>
                  <ErrorMessage
                    name='name'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    name='name'
                    type='text'
                    className={INPUT_STYLES}
                    placeholder='Event name'
                  />

                  <label htmlFor='description' className={LABEL_STYLES}>
                    Description
                  </label>
                  <ErrorMessage
                    name='description'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    name='description'
                    as='textarea'
                    className={INPUT_STYLES + ' min-h-[150px]'}
                    placeholder='Give details about the event and optionally paste a link to the Google Maps location'
                  />

                  <label htmlFor='startDate' className={LABEL_STYLES}>
                    Date
                  </label>
                  <ErrorMessage
                    name='startDate'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    name='startDate'
                    type='date'
                    className={INPUT_STYLES}
                  />

                  <label htmlFor='startTime' className={LABEL_STYLES}>
                    Time
                  </label>
                  <ErrorMessage
                    name='startTime'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    name='startTime'
                    type='time'
                    className={INPUT_STYLES}
                  />

                  {/* <label htmlFor='endDate' className={LABEL_STYLES}>
                    End Date
                  </label>
                  <ErrorMessage
                    name='endDate'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field name='endDate' type='date' className={INPUT_STYLES} />

                  <label htmlFor='endTime' className={LABEL_STYLES}>
                    End Time
                  </label>
                  <ErrorMessage
                    name='endTime'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field name='endTime' type='time' className={INPUT_STYLES} /> */}

                  <label htmlFor='categories' className={LABEL_STYLES}>
                    Categories
                  </label>
                  <ErrorMessage
                    name='categories'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    component={CategorySelect}
                    name='categories'
                    options={categoryOptions}
                  />

                  <label htmlFor='area' className={LABEL_STYLES}>
                    City
                  </label>
                  <ErrorMessage
                    name='area'
                    component='p'
                    className={ERROR_STYLES}
                  />
                  <Field
                    component={CitySelect}
                    name='area'
                    options={cityOptions}
                  />

                  <label htmlFor='coords' className={LABEL_STYLES}>
                    Location
                  </label>
                  <Field component={PostEventMap} name='coords' />

                  <button
                    type='submit'
                    disabled={!formik.isValid}
                    className='p-2 bg-purple hover:bg-violet-500 disabled:bg-violet-300 rounded-md text-xl text-white mt-2 mb-6'
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}
