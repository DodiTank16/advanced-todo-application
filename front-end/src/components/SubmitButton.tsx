import React, { Children } from "react";

interface props {
  className?: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}

const SubmitButton: React.FC<props> = ({
  name,
  placeholder,
  className,
  children,
  ...props
}) => {
  return (
    <>
      <button type="submit" name={name} className={className} {...props}>
        {children}
      </button>
    </>
  );
};

export default SubmitButton;
