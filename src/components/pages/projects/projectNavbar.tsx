import LayoutSearch from '@/app/projects/layoutSearch';

export default function ProjectNavbar() {
  return (
    <div className="fixed top-20 w-full">
      <div className="relative w-full container_px grid grid-cols-9 gap-10">
        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <img src="/aldhaneka_personal_logo.svg" className="w-full"></img>
        </div>
        <div className="col-span-1 md:col-span-4 xl:col-span-6"></div>
        <LayoutSearch />
      </div>
    </div>
  );
}
