import { categoryOptions } from '@/utils/constants';
import React from 'react';
import Select, { SingleValue } from 'react-select';

interface Props {
  searchedCategory: SingleValue<{ label: string; value: string }>;
  setSearchedCategory: (
    newValue: SingleValue<{ label: string; value: string }>
  ) => void;
}

const SELECT_OPTIONS = [{ value: 'ALL', label: 'ALL' }, ...categoryOptions];

export default function CategorySearch({
  setSearchedCategory,
  searchedCategory,
}: Props) {
  const handleCategoryChange = async (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setSearchedCategory(newValue);
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
