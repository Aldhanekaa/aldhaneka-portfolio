import GoogleUICircle from './googleUICircle';

export default function GoogleUICircleWithIcon({
  icon,
  iconClassName,
  uiClassName,
}: {
  icon: string;
  iconClassName: string;
  uiClassName: string;
}) {
  return (
    <div className="relative flex justify-center h-full items-center">
      <GoogleUICircle className={`  ${uiClassName}`} />
      <div
        className={`${iconClassName} absolute w-full h-full flex justify-center items-center font-bold`}
      >
        <span className={`material-symbols-outlined`}>{icon}</span>
      </div>
    </div>
  );
}
