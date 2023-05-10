import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function UserAboutInput({ value, onChangeEnd, onChange }) {
  const [_value, setValue] = React.useState(value ?? '');

  React.useEffect(() => {
    setValue(value ?? '');
  }, [value]);

  const onChangedWithDebounce = useDebouncedCallback(onChangeEnd, 250);

  const handleChange = (e) => {
    const value = e.currentTarget.value as string;
    setValue(value);
    onChange?.(value);
    onChangedWithDebounce?.(value);
  };

  return (
    <React.Fragment>
      <label htmlFor="about">
        About <small>(instant saving)</small>:
      </label>
      <input
        id="about"
        type="text"
        onChange={handleChange}
        value={_value}
        placeholder="about"
      />
    </React.Fragment>
  );
}
