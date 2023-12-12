import { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'DEFAULT';

export interface ButtonProps {
  label: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  label,
  variant,
  type = 'button',
  size,
  isDisabled,
  isLoading,
  className,
  onClick,
  ...props
}) => {
  const isButtonDisabled = isDisabled || isLoading;
  const buttonStyles = getButtonStyles({ variant, size, isDisabled, isLoading, className });

  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      type={type}
      disabled={isButtonDisabled}
      {...props}
    >
      <span className={classNames({ 'opacity-0': isLoading })}>{label}</span>
      {isLoading && (
        <div className="absolute">
          <Spinner variant="dot-flashing" />
        </div>
      )}
    </button>
  );
};

const getButtonStyles = ({
  variant = 'primary',
  size = 'DEFAULT',
  isDisabled,
  isLoading,
  className,
}: Omit<ButtonProps, 'label'>) => {
  const baseStyles =
    'relative flex justify-center items-center gap-3 m-0 rounded-lg font-bold cursor-pointer disabled:cursor-not-allowed';

  const buttonVariants: Record<ButtonVariant, string> = {
    primary: classNames(
      'bg-primary text-white',
      {
        'hover:text-white': !isDisabled,
      },
      {
        'disabled:opacity-80 disabled:text-grey': isDisabled || isLoading,
      },
    ),
    secondary: classNames(
      'border border-primary text-primary',
      {
        'disabled:bg-[#7e7e7e] disabled:bg-opacity-25 disabled:text-grey disabled:border-none':
          isDisabled || isLoading,
      },
      {
        'hover:bg-indigo-100 hover:text-primary': !isDisabled,
      },
    ),
  };

  const buttonSizes: Record<ButtonSize, string> = {
    sm: 'py-1 px-3 text-sm',
    DEFAULT: 'py-3 px-6 text-base',
  };

  return classNames(baseStyles, buttonVariants[variant], buttonSizes[size], className);
};
