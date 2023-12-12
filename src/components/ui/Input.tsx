import classNames from 'classnames';
import { FunctionComponent } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const Input: FunctionComponent<InputProps> = ({
  id,
  label,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  placeholder,
  disabled,
  className,
}) => {
  return (
    <div className="w-full relative">
      <label className="`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={classNames(
          'w-full p-4 text-black bg-white  border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed',
          className,
        )}
      />
    </div>
  );
};
