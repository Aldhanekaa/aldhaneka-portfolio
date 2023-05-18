import A_Personal_Logo from '@/components/aldhaneka_personal_logo_bg';
import SidebarLink from '@/components/dashboard/sidebarlink';
import React from 'react';
import LogoutBtn from '@/components/logoutBtn';

type SidebarT = {
  name: string;
  path: string;
};

type Sidebars = SidebarT[];

const sidebars: Sidebars = [
  {
    name: 'Home',
    path: '/admin/',
  },
  {
    name: 'Journals',
    path: '/admin/journals',
  },
  {
    name: 'Projects',
    path: '/admin/projects',
  },
  {
    name: 'Certificates',
    path: '/admin/certificates',
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-full pr-12 pl-12 py-14 gap-5">
      <div className="grid grid-cols-9">
        <nav className=" col-span-9 grid grid-cols-9 gap-5">
          <div className="col-span-1 border-b-2 pb-4">
            <A_Personal_Logo />
          </div>
          <div className="col-span-7"></div>
          <LogoutBtn />
        </nav>
      </div>

      <div className="grid grid-cols-9 grid-rows-4">
        <nav className="col-span-1 row-span-4 mt-5">
          <div>
            {sidebars.map((sidebar, i) => (
              <SidebarLink key={`${sidebar.name}_${i}`} i={i} {...sidebar} />
            ))}
          </div>
        </nav>
        <div className="col-span-8 row-span-4 mt-5">{children}</div>
      </div>
    </section>
  );
}
