'use client';
import Link from 'next/link';

export default function SidebarLink({
  name,
  path,
  i,
}: {
  name: string;
  path: string;
  i: number;
}) {
  return (
    <div>
      <div key={i} className="mb-3 text-brand-350 cursor-pointer">
        <Link href={path}>{name}</Link>
      </div>
    </div>
  );
}
