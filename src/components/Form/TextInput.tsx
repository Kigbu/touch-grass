
import useWindowSize from '@/core/hooks/useWindowSize';
import React from 'react';
// import { InputText } from "primereact/inputtext";
import { Controller } from 'react-hook-form';

interface TextInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  rules: any;
  type?: string | 'email' | 'passsword' | 'number' | 'text' | 'search';
  defaultValue?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  required?: boolean;
}

export default function TextInput({ control, label, name, rules, placeholder, type, defaultValue, disabled, icon, required = false }: TextInputProps) {
  const [inputType, setInputType] = React.useState<string>('text');
  const { isMobile }: { isMobile: boolean } = useWindowSize();

  React.useEffect(() => {
    if (type) setInputType(type);
  }, [type]);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent the input value change
    (e.target as HTMLInputElement).blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      (e.target as HTMLInputElement).focus();
    }, 0);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }: any) => {
        // L('value :::', value);
        // L('error :::', error);
        return (
          <div
            className={`w-full ${value && value?.length > 0 && error && error?.message ? 'has-error' : value && value.length > 0 && !error?.message ? 'has-success' : ''}`}
          // className={value.lenght > 0 ? (error?.message ? 'has-error' : 'has-success') : ''}
          >
            {label && (
              <label htmlFor={name}>
                <span>{label}</span>
                {required && <span className="text-[#F24841] ms-1">*</span>}
              </label>
            )}

            <div className="relative text-white-dark">
              <input
                id={name}
                value={value}
                type={inputType}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.value);
                }}
                onWheel={handleWheel}
                className={`form-input placeholder:text-white-dark ${type === 'email' && 'ps-10'} ${error?.message && 'p-invalid'}`}
              />
            </div>

            {error?.message && <small className="text-danger mt-1">{error?.message}</small>}
          </div>
        );
      }}
    />
  );
}
