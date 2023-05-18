import JournalSubscribeCard from '@/components/journals/subscribeCard';

export default function SubscribeToJournalSection() {
  return (
    <div className="w-full container_px relative mb-40">
      <div className="absolute w-full h-1/2 bg-brand-100 top-0 left-0 -z-20"></div>

      <JournalSubscribeCard />
    </div>
  );
}
