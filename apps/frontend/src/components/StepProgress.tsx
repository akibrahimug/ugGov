import clsx from 'clsx';

export function StepProgress({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div
      className="uggov-step-progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-valuenow={current + 1}
      aria-valuetext={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}
    >
      {steps.map((title, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'upcoming';
        return (
          <div key={title} className="uggov-step-progress__step">
            <div className={clsx('uggov-step-progress__bar', `uggov-step-progress__bar--${state}`)} />
            <div
              className={clsx(
                'uggov-step-progress__label',
                (state === 'active' || state === 'done') && 'uggov-step-progress__label--on',
              )}
            >
              <span className="uggov-step-progress__num">{i + 1}</span>
              <span className="uggov-step-progress__title">{title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
