import { months } from '@/components/journals/card';
import { MinimalJournalT } from '@/lib/supabase/types/index.types';
import Link from 'next/link';

export default function JournalHomeCard({
  className,
  journal,
  titleClassName,
}: {
  className: string;
  titleClassName?: string;
  journal: MinimalJournalT;
}) {
  const date = new Date(journal.created_at);
  return (
    <div className={`${className}`}>
      <p className="text-xl">
        {date.getDay()} {months[date.getMonth()]} {date.getFullYear()}
      </p>
      <Link href={`/journal/${journal.id}`}>
        <h4
          className={`${
            titleClassName ? titleClassName : 'text-7xl '
          } break-words active:bg-brand-50 cursor-pointer hover:underline my-6 leading-relaxed MADEMellow text-brand-350`}
        >
          {journal.title}
        </h4>
      </Link>
      <p className="text-2xl">{journal.desc}</p>
    </div>
  );
}
