export default function ProjectsHero({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode | JSX.Element;
}) {
  return (
    <div
      className="w-full container_px border-2 border-brand-350"
      style={{
        background: '#FFF9ED',
        borderBottomRightRadius: '70px',
        borderBottomLeftRadius: '70px',
      }}
    >
      <div className="w-full grid grid-cols-9 pt-64 pb-28">
        <div className="col-span-5">
          <h1 className="MADEMellow text-8xl text-brand-350">{title}</h1>
          <p className="MADEMellow mt-5 font-light text-5xl  text-brand-300">
            {desc}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}
