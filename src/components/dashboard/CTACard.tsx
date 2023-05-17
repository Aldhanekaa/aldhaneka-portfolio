export type CTACardT = {
  title: string;
  btnName: string;
};

export default function CTACard({
  title,
  btnName,
  onClick,
}: CTACardT & { onClick: () => void }) {
  return (
    <div
      className="col-span-3 py-8 px-10 rounded-xl"
      style={{
        background:
          'linear-gradient(321.69deg, #F6E7CC -4.32%, #D6CAB6 26.77%, #D6CAB6 60.69%, #F5E6CB 97.07%)',
      }}
    >
      <span className="text-5xl MADEMellow text-brand-350 font-light block">
        {title}
      </span>
      <button
        onClick={onClick}
        className="block mt-5 bg-brand-100 px-3 py-1 rounded-lg"
      >
        {btnName}
      </button>
    </div>
  );
}
