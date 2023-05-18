import { MinimalJournalT } from '@/lib/supabase/types/index.types';
import JournalHomeCard from '../journals/homeCard';
import Link from 'next/link';

export default function HomeJournalsSection({
  pinned,
  recents,
}: {
  pinned: MinimalJournalT | null;
  recents: MinimalJournalT[] | null;
}) {
  return (
    <div className="w-full bg-brand-100 container_px py-28 mt-32">
      <div className="w-full grid grid-cols-9">
        <div className="col-span-9">
          <div className="grid grid-cols-9 gap-10 justify-center content-center">
            <h4 className=" col-span-2 text-5xl MADEMellow font-light">
              Latest Journal
            </h4>
            <div className="col-span-7 flex items-center justify-center">
              <hr className=" border-brand-300 border-1 w-full" />
            </div>

            {pinned && (
              <JournalHomeCard
                className="col-span-9 lg:col-span-5"
                journal={pinned}
              />
            )}
            <div className="col-span-9 lg:col-span-4 flex flex-col gap-10">
              {recents &&
                recents.map((recent) => (
                  <JournalHomeCard
                    className="col-span-4 row-span-1 h-auto mb-16"
                    titleClassName="text-5xl"
                    journal={recent}
                  />
                ))}
            </div>
            <Link href="/journals" className="col-span-9 ">
              <div className="mt-9 hover:underline text-center MADEMellow text-4xl text-brand-200">
                Explore More
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
