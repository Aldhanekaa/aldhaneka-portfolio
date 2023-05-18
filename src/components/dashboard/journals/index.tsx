'use client';
import { useSupabase } from '@/app/supabase-provider';
import JournalCard from '@/components/journals/card';
import { JournalT } from '@/lib/supabase/types/index.types';
import Link from 'next/link';
import { useState } from 'react';

export default function JournalsPage({
  journalsProps,
}: {
  journalsProps: JournalT[] | null;
}) {
  const { supabase } = useSupabase();
  const [journals, setJournals] = useState(() => journalsProps);

  const deleteJournal = async (journalParam: JournalT) => {
    let deleteFiles: string[] = [];

    if (journalParam.thumbnail) {
      let thumbnailFileName = journalParam.thumbnail.replace(
        'https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/',
        ''
      );
      console.log(thumbnailFileName);
      deleteFiles.push(thumbnailFileName);
    }

    const { error: deleteFilesError } = await supabase.storage
      .from('journal_posts')
      .remove(deleteFiles);

    const { data, error: deleteRowError } = await supabase
      .from('journal_posts')
      .delete()
      .eq('id', journalParam.id);
    if (deleteRowError) {
      alert('deleteRowError!');
      console.log('deleteRowError ', deleteRowError);
    } else {
      if (journals) {
        alert('Success Deleted Post!');
        setJournals(
          journals?.filter((journal) => journal.id != journalParam.id)
        );
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-9 mt-20">
      {journals &&
        journals.map((journal) => {
          const date = new Date(journal.created_at);
          return (
            <div key={journal.id} className="col-span-3 grid grid-cols-3">
              <div className="col-span-3 w-full mb-12 ">
                <Link href={`/admin/journals/modify/${journal.id}`}>
                  <button className="px-3 py-3 bg-brand-400 text-brand-500">
                    Modify
                  </button>
                </Link>
                <button
                  onClick={() => {
                    deleteJournal(journal);
                  }}
                  className="px-3 py-3 bg-red-400 text-red-50"
                >
                  Delete
                </button>
              </div>
              <JournalCard journal={journal} />
            </div>
          );
        })}

      {journals?.length == 0 && <div>No Data Available</div>}
    </div>
  );
}
export const revalidate = 10; // revalidate this segment every 60 seconds
