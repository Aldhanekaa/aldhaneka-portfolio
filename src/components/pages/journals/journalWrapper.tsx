import { JournalT } from '@/lib/supabase/types/index.types';

export default function JournalWrapper({ journal }: { journal: JournalT }) {
  return (
    <div className="w-full">
      <div
        className="w-full"
        style={{
          background:
            'linear-gradient(321.69deg, #F6E7CC -4.32%, #D6CAB6 26.77%, #D6CAB6 60.69%, #F5E6CB 97.07%), #D4D290',
        }}
      >
        <div className="w-full py-32 grid grid-cols-9 container_px">
          <h1>Title</h1>
        </div>
      </div>
    </div>
  );
}
