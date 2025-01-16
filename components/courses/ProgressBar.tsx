type ProgressBarProps = {
  progressValue: number; // Precomputed progress value
};

export default function ProgressBar({ progressValue }: ProgressBarProps) {
  return (
    <div
      className="radial-progress absolute font-bold text-[12px] text-slate-200  sm:text-[12px] bg-blue-900 top-2 right-2"
      style={
        {
          "--value": progressValue,
          "--size": "2.2rem",
          "--thickness": "3px",
        } as React.CSSProperties
      }
      role="progressbar"
    >
      {Math.round(progressValue)}%
    </div>
  );
}
