import camboEventsApi from '@/services/axios-config';
import { categoryOptions } from '@/utils/constants';
import { EventType } from '@/utils/types';
import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

interface Props {
  setHasSearchedForEvents: (value: boolean) => void;
  setSearchResults: (value: EventType[]) => void;
}

const SELECT_OPTIONS = [{ value: 'ALL', label: 'ALL' }, ...categoryOptions];

export default function CategorySearch({
  setHasSearchedForEvents,
  setSearchResults,
}: Props) {
  const [searchedCategory, setSearchedCategory] = useState<
    SingleValue<{
      label: string;
      value: string;
    }>
  >(SELECT_OPTIONS[0]);

  const handleCategoryChange = async (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setSearchedCategory(newValue);
    if (newValue?.value === 'ALL') {
      setHasSearchedForEvents(false);
      return;
    }
    const response = await camboEventsApi.get('/event', {
      params: { category: newValue?.value },
    });
    setSearchResults(response.data);
    setHasSearchedForEvents(true);
  };

  return (
    <div>
      <Select
        className='z-0 border-2 w-[90%] md:w-1/5 mx-auto mt-6 rounded-md border-purple'
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
        options={SELECT_OPTIONS}
        value={searchedCategory}
        onChange={handleCategoryChange}
      />
    </div>
  );
}
