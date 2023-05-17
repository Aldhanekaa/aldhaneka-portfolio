import ProjectCTAs from '@/components/dashboard/projects/CTAs';
import Link from 'next/link';

export default function ProjectsDashboard() {
  return (
    <div className="h-screen relative">
      <h2 className="text-4xl MADEMellow font-light text-brand-350">
        Projects
        <Link href="/admin/certificates/new">
          <div className="text-xl underline">Submit Project</div>
        </Link>
      </h2>
      <ProjectCTAs />
    </div>
  );
}
