import { useField } from 'formik';
import Select from 'react-select';

export default function CitySelect(props: any) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (option: any) => {
    setValue(option);
  };

  return (
    <Select
      className='z-50'
      {...props}
      value={state?.value}
      isMulti={false}
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
