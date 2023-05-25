import { cityOptions } from '@/utils/constants';
import React from 'react';
import Select, { SingleValue } from 'react-select';

interface Props {
  searchedArea: SingleValue<{ label: string; value: string }>;
  setSearchedArea: (
    newValue: SingleValue<{ label: string; value: string }>
  ) => void;
}

const SELECT_OPTIONS = [{ value: 'ALL', label: 'ALL' }, ...cityOptions];

export default function AreaSearch({
  setSearchedArea,
  searchedArea,
}: Props) {
  const handleAreaChange = async (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setSearchedArea(newValue);
  };

  return (
    <div className='w-[90%] md:w-1/5 mx-auto mt-2'>
      <h3 className='text-white text-center'>Area</h3>
      <Select
        className='z-0 border-2 mx-auto rounded-md border-purple'
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
        options={SELECT_OPTIONS}
        value={searchedArea}
        onChange={handleAreaChange}
      />
    </div>
  );
}
