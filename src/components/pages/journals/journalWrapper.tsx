'use client';
import TipTapEditor from '@/components/dashboard/journals/tiptapEditor';
import { months } from '@/components/journals/card';
import { JournalT } from '@/lib/supabase/types/index.types';
import Footer from '../footer';

export default function JournalWrapper({ journal }: { journal: JournalT }) {
  const publishedDate = new Date(journal.created_at);

  console.log(journal.content);
  return (
    <div className="w-full">
      <div
        className="w-full"
        style={{
          background:
            'linear-gradient(321.69deg, #F6E7CC -4.32%, #D6CAB6 26.77%, #D6CAB6 60.69%, #F5E6CB 97.07%), #D4D290',
        }}
      >
        <div className="w-full pt-64 pb-28 grid grid-cols-9 container_px">
          <div className="col-span-6">
            <h1 className="MADEMellow font-light text-8xl text-brand-350">
              {journal.title}
            </h1>
            <h2 className="MADEMellow font-light text-4xl text-brand-350">
              {publishedDate.getDay()} {months[publishedDate.getMonth()]}{' '}
              {publishedDate.getFullYear()}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full container_px pt-9 mb-32">
        <TipTapEditor
          isEditable={false}
          //@ts-ignore
          content={journal.content}
        />
      </div>

      <Footer />
    </div>
  );
}
