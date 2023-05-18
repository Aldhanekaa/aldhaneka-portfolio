type PillT = {
  children: string | string[];
  className?: string;
};
export default function Pill({ children, className }: PillT) {
  return (
    <div
      className={`py-3 px-3 rounded-2xl inline-block ${className && className}`}
      style={{
        background:
          'linear-gradient(321.69deg, #F6E7CC -4.32%, #D6CAB6 26.77%, #D6CAB6 60.69%, #F5E6CB 97.07%)',
      }}
    >
      {children}
    </div>
  );
}
