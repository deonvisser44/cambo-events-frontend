import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { DateTime } from 'ts-luxon';
import CategorySelect from '@/components/events/category-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, setCurrentEvent } from '@/store/user';
import {
  categoryOptions,
  DEFAULT_CURRENT_EVENT_STATE,
} from '@/utils/constants';
import { calculateStartAndEndTimes } from '@/utils/helpers';
import { submitEventType, UserStateType } from '@/utils/types';
import camboEventsApi from '@/services/axios-config';
import { EVENT_VALIDATION_SCHEMA } from '@/utils/yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

const PostEventMap = dynamic(() => import('../../components/events/post-event-map'), {
  ssr: false,
});

const INPUT_STYLES =
  'p-1 rounded-md border border-gray-400 text-lg outline-purple';
const LABEL_STYLES = 'text-lg font-semibold text-gray-200 py-0 mt-1';
const ERROR_STYLES = 'text-red-500';

export default function EditEventPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState: UserStateType = useSelector(selectUserState);
  const { currentEvent } = userState;
  const start = DateTime.fromJSDate(
    new Date(currentEvent.start_date)
  ).toISODate();
  const end = DateTime.fromJSDate(new Date(currentEvent.end_date)).toISODate();
  const selectedCategories = currentEvent.category.map((category) => {
    return { label: category.toUpperCase(), value: category };
  });
  const startMilitaryTime = DateTime.fromJSDate(
    new Date(currentEvent.start_date)
  ).toFormat('hh:mm');
  const endMilitaryTime = DateTime.fromJSDate(
    new Date(currentEvent.end_date)
  ).toFormat('hh:mm');

  useEffect(() => {
    return () => {
      setCurrentEvent(DEFAULT_CURRENT_EVENT_STATE);
    };
  }, []);

  const initialFormValues = {
    name: currentEvent?.name,
    description: currentEvent?.description,
    startDate: start,
    startTime: startMilitaryTime,
    endDate: end,
    endTime: endMilitaryTime,
    categories: selectedCategories,
    coords: currentEvent?.location,
  };

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
      id: currentEvent.id,
      name,
      description,
      category: categoriesToUse,
      location: { lat: coords.lat.toString(), lng: coords.lng.toString() },
      start_date: start,
      end_date: end,
    };
    const { status } = await camboEventsApi.put('/event', postEventBody);
    if (status === 200) {
      toast.success('Event updated');
    } else {
      toast.warn('Failed to update event');
    }
    dispatch(setCurrentEvent(DEFAULT_CURRENT_EVENT_STATE));
    router.replace('/my-events');
  };

  if (!currentEvent) {
    return (
      <div className='min-h-screen mx-auto my-auto'>Something went wrong!</div>
    );
  } else {
    return (
      <div className='min-h-screen py-3 md:w-2/5 mx-auto my-auto'>
        <h3 className='text-3xl font-semibold text-center text-purple'>
          Edit Event
        </h3>
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
                  Start Date
                </label>
                <ErrorMessage
                  name='startDate'
                  component='p'
                  className={ERROR_STYLES}
                />
                <Field name='startDate' type='date' className={INPUT_STYLES} />

                <label htmlFor='startTime' className={LABEL_STYLES}>
                  Start Time
                </label>
                <ErrorMessage
                  name='startTime'
                  component='p'
                  className={ERROR_STYLES}
                />
                <Field name='startTime' type='time' className={INPUT_STYLES} />

                <label htmlFor='endDate' className={LABEL_STYLES}>
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
                <Field name='endTime' type='time' className={INPUT_STYLES} />

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
    );
  }
}
