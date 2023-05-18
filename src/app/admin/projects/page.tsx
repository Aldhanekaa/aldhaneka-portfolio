import ProjectsDashboard from '@/components/dashboard/projects';
import ProjectCTAs from '@/components/dashboard/projects/CTAs';
import GoogleUICircle from '@/components/googleUICircle';
import ProjectCard from '@/components/projects/card';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default async function ProjectsPage() {
  let { data: projects, error } = await supabase.from('projects').select('*');

  return (
    <div className="h-screen relative">
      <h2 className="text-4xl MADEMellow font-light text-brand-350">
        Projects
        <Link href="/admin/projects/new">
          <div className="text-xl underline">Submit Project</div>
        </Link>
      </h2>
      <ProjectCTAs />
      <ProjectsDashboard projectsProps={projects} />
    </div>
  );
}
export const revalidate = 10; // revalidate this segment every 60 seconds
