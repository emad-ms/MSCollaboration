import * as React from "react";

export default function UserStatusInput({ value, onChange }) {
  const [_value, setValue] = React.useState(value ?? "");

  React.useEffect(() => {
    setValue(value ?? "");
  }, [value]);

  const handleChange = (e) => {
    const value = e.currentTarget.value as string;
    setValue(value);
    onChange?.(value);
  };

  return (
    <React.Fragment>
      <label htmlFor="status">
        Status <small>(collaborative)</small>:
      </label>
      <select id="status" name="status" value={_value} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
    </React.Fragment>
  );
}
