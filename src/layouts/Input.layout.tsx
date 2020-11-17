import React from "react";

interface InputProps {
  id: string;
  name: string;
  onBlur: (event: any) => any;
  onChange: (event: any) => any;
  value: string | number;
}
export const Input: React.FC<InputProps> = ({
  id,
  name,
  onBlur,
  onChange,
  value,
}) => {
  return (
    <input
      className="form__input"
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
};
