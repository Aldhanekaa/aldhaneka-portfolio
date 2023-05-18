import { JournalT } from '@/lib/supabase/types/index.types';
import Link from 'next/link';

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Des',
];
export default function JournalCard({ journal }: { journal: JournalT }) {
  const date = new Date(journal.created_at);

  return (
    <div className=" col-span-3">
      <div className="w-full grid grid-cols-5">
        <div className="col-span-1 break-words text-2xl text-brand-350">
          {date.getDay()} {months[date.getMonth()]} {date.getFullYear()}{' '}
        </div>
        <div className="col-span-4">
          <Link href={`/journal/${journal.id}`}>
            <h4 className="MADEMellow text-5xl text-brand-300">
              {journal.title}
            </h4>
          </Link>
          <p className="mt-4  text-brand-200">{journal.desc}</p>
        </div>
        <hr className="col-span-5 mt-20 border-2 border-brand-300" />
      </div>
    </div>
  );
}
