import React, { ChangeEvent } from "react";
interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?:boolean
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  required = false,
  disabled = false
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange}
    className="w-full p-2 mb-4 border border-gray-300 rounded"
    required={required}
    disabled={disabled}
  />
);

export default InputField;
