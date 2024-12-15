type ProgressBarProps = {
  amountOfLessons: number;
};

export default function ProgressBar({ amountOfLessons }: ProgressBarProps) {
  const progressValue = 40; // Current progress value out of 100

  return (
    <div className="flex justify-center py-6">
      <progress className="progress w-56" value="10" max="100"></progress>
    </div>
  );
}
