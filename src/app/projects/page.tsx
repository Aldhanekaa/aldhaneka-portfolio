import Footer from '@/components/pages/footer';
import ProjectsHero from '@/components/pages/projects/hero';
import Pill from '@/components/pills';
import ProjectCard from '@/components/projects/card';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default async function ProjectsPage() {
  let { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .range(0, 6);

  return (
    <div className="w-full">
      <ProjectsHero
        title="Works & Projects"
        desc="Welcome to my creation! The Finite of Creativity!"
      >
        <div className="flex w-full flex-row mt-20">
          <p className="text-2xl text-brand-300">Hot From The Oven 🔥 </p>
          <div className="ml-5">
            <Link href="/projects/9th Grade">
              {' '}
              <p className="text-2xl text-brand-350 hover:text-brand-300">
                9th Grade Projects
              </p>
            </Link>
            <p>Click to view my 9th grade projects!</p>
          </div>
        </div>
      </ProjectsHero>

      <div className="mt-32 w-full container_px">
        <div className="w-full grid grid-cols-9">
          <div className="row-span-1 col-span-9 text-brand-350">
            <h5 className="text-4xl ">Picked Projects</h5>
            <p className="mt-5">No Data Projects Set To Be Picked.</p>
          </div>
        </div>
      </div>

      <div
        className="mt-32 w-full container_px py-24"
        style={{
          background:
            'linear-gradient(282.24deg, #D6CAB6 -17.87%, #A8987B 15.26%, #A8987B 74%, #D6CAB6 101.5%)',
        }}
      >
        <div className="w-full grid grid-cols-9">
          <div className="col-span-9 lg:col-span-4 text-7xl MADEMellow text-brand-50">
            Explore Different Project Fields
          </div>
          <div className="col-span-9 lg:col-span-5 overflow-hidden">
            <div className="flex flex-nowrap">
              <Pill className="mr-3 mb-2 text-2xl px-7" href="/projects/Coding">
                Coding
              </Pill>
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/search?tags=8th Grade"
              >
                8th Grade
              </Pill>
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/Middle School"
              >
                Middle School
              </Pill>
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/search?tags=Science"
              >
                Science
              </Pill>
            </div>
            <div className="flex flex-nowrap pl-16 mt-4">
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/9th Grade"
              >
                9th Grade
              </Pill>
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/search?tags=Art & Design"
              >
                Art & Design
              </Pill>
              <Pill
                className="mr-3 mb-2 text-2xl px-7"
                href="/projects/search?tags=Writing"
              >
                Writing
              </Pill>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 w-full container_px mb-32">
        <div className="w-full grid grid-cols-9 gap-10">
          <div className="row-span-1 col-span-9 text-brand-350">
            <h5 className="text-4xl ">Picked Projects</h5>
          </div>
          {projects &&
            projects.map((project) => <ProjectCard project={project} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}
