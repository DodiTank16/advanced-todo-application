import React from "react";

interface props {
  type: string;
  className: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  ref: React.RefObject<HTMLInputElement>;
}

const InputField: React.FC<props> = ({
  type,
  name,
  id,
  className,
  placeholder,
  value,
  onChange,
  ref,
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        ref={ref}
        {...props}
      />
    </>
  );
};

export default InputField;
