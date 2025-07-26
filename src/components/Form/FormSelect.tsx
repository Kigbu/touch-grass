import React from 'react';
import { Controller } from 'react-hook-form';
// import useAuth from '@/core/hooks/useAuth';
// import { L } from '@/core/utils/helper';
import useWindowSize from '@/core/hooks/useWindowSize';

interface FormSelectProps {
  name: string;
  control: any;
  options: any;
  rules?: any;
  defaultValue?: any;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  setValue?: any;
  loading?: boolean;
  filter?: boolean;
  editable?: boolean;
  optionLabel?: string;
  optionTemplate?: any;
  required?: boolean;
  showclear?: boolean;
}

export default function FormSelect({
  name,
  control,
  rules,
  defaultValue,
  options,
  placeholder,
  label,
  disabled,
  setValue,
  loading,
  filter,
  editable,
  optionLabel = 'name',
  optionTemplate,
  required = false,
  showclear, // not to be used with setvalue, if filter is being used
}: FormSelectProps) {
  const { isMobile }: { isMobile: boolean } = useWindowSize();
  // const { accessToken } = useAuth();

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange }, fieldState: { error } }: any) => (
          <div className={`${value && value?.length > 0 && error && error?.message ? 'has-error' : value && value.length > 0 && !error?.message ? 'has-success' : ''}`}>
            {/* {label && (
              <label htmlFor={name}>
                <span>{label}</span>
                {required && <span className="text-[#F24841] ms-1">*</span>}
              </label>
            )} */}

            <select
              id="gridState"
              value={value}
              disabled={disabled}
              // @ts-ignore
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // L('e e e', e);
                onChange(e.target.value);
              }}
              // className="form-select text-white-dark"
              style={{
                border: "1px solid #FFF",
                borderRadius: 10,
                padding: '19px 17px',
                color: '#FFF',
                backgroundColor: 'transparent',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '24px',
                // fontFamily: 'Inter',
                // fontStyle: 'normal',
              }}
            >
              <option value={''}>{placeholder}</option>
              {options.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error?.message && <small className="text-danger mt-1">{error?.message}</small>}
          </div>
        )}
      />
    </div>
  );
}
