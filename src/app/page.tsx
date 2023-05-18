import JournalsPage from '@/components/dashboard/journals';
import Footer from '@/components/pages/footer';
import AboutSection from '@/components/pages/home/about';
import HeroSectionHome from '@/components/pages/home/hero';
import HomeJournalsSection from '@/components/pages/home/journals';
import ProjectsSection from '@/components/pages/home/projects';
import SubscribeToJournalSection from '@/components/pages/home/subscribeToJournal';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';

export default async function Home() {
  let { data: journal_home_pin, error: journal_home_pinErrors } = await supabase
    .from('journal_posts')
    .select('id,title,desc,created_at')
    .eq('home_pin', true);
  let { data: journals_recent, error: journals_recentError } = await supabase
    .from('journal_posts')
    .select('id,title,desc,created_at')
    .eq('home_pin', false)
    .range(0, 3);

  return (
    <main className="">
      <HeroSectionHome />
      <AboutSection />
      <ProjectsSection />
      <HomeJournalsSection
        pinned={journal_home_pin && journal_home_pin[0]}
        recents={journals_recent && journals_recent}
      />
      <SubscribeToJournalSection />
      <Footer />
    </main>
  );
}
export const revalidate = 1; // revalidate this segment every 60 seconds
