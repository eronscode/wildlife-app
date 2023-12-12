import { CSSProperties, FunctionComponent, ReactNode } from 'react';

type SpinnerPosition = 'default' | 'fullscreen';
type SpinnerVariant = 'dot-flashing' | 'dot-spin';

interface SpinnerProps {
  variant?: SpinnerVariant;
  position?: SpinnerPosition;
  colors?: [primary: string, secondary: string];
}

export const Spinner: FunctionComponent<SpinnerProps> = ({
  variant = 'dot-flashing',
  position = 'default',
  colors = ['#f26724', '#ebe6ff'],
}) => {
  const spinnerPosition: Record<
    SpinnerPosition,
    { wrapper: FunctionComponent<{ children: ReactNode }> }
  > = {
    default: {
      wrapper: ({ children }) => <>{children}</>,
    },
    fullscreen: {
      wrapper: ({ children }) => (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      ),
    },
  };

  const spinnerStyle = {
    '--loading-primary-color': colors[0],
    '--loading-secondary-color': colors[1],
  } as CSSProperties;

  const Wrapper = spinnerPosition[position].wrapper;

  return (
    <Wrapper>
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        style={spinnerStyle}
        className={variant}
      />
    </Wrapper>
  );
};
