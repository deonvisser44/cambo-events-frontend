import { useField } from 'formik';
import Select from 'react-select';

export default function CategorySelect(props: any) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (option: any) => {
    setValue(option);
  };

  return (
    <Select
      className='z-50'
      {...props}
      value={state?.value}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
