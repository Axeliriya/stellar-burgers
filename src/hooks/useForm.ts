import { useState, ChangeEvent } from 'react';

type FormValues = Record<string, string>;

export function useForm<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange,
    setValues
  };
}
