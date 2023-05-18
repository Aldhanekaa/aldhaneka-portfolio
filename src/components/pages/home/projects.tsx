'use client';
import GoogleUICircleWithIcon from '@/components/googleUICircleWithIcon';
import Pill from '@/components/pills';
import Link from 'next/link';
import { useState } from 'react';

let firstTheme = {
  default: {
    card: 'discover_project_card_main_default',
    title: 'text-brand-50',
  },
  clicked: {
    card: 'discover_project_card_main_clicked',
    title: '',
  },
};

let secondTheme = {
  default: {
    card: 'discover_project_card_main_clicked',
    title: 'text-brand-350',
  },
  clicked: {
    card: 'discover_project_card_main_default',
    title: '',
  },
};

let themes = {
  first: firstTheme,
  second: secondTheme,
};

function P() {
  return (
    <div>
      <p>HIGH SCHOOL KIR</p>
      <div className="text-xl inline-block bg-brand-500 text-brand-400 font-light py-2 px-3 rounded-e-xl rounded-ss-xl">
        It's Coming!
      </div>
    </div>
  );
}

function ProjectCard({
  className,
  children,
  Title,
  theme,
  content,
  paddingOnChildren,
}: {
  className: string;
  children?: React.ReactNode;
  Title: (() => JSX.Element) | string;
  content?: string;
  href?: string;
  theme: 'first' | 'second';
  paddingOnChildren?: boolean;
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={`${className} relative grid grid-cols-9 pt-20 rounded-3xl ${
        themes[theme].default.card
      } ${content == undefined ? 'pb-20' : 'pb-10'}`}
    >
      <div
        className={`${themes[theme].default.title} col-span-9 text-5xl px-20 font-normal MADEMellow `}
      >
        {typeof Title == 'string' ? Title : <Title />}
      </div>
      <div className={`col-span-9 ${paddingOnChildren && 'px-20'}`}>
        {children}
      </div>
      {content && <div className="col-span-9 px-20 mt-10"></div>}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="w-full container_px">
      <h4 className="text-6xl MADEMellow font-light text-brand-300">
        My Works & Works
      </h4>
      <p className="text-2xl text-brand-350 mt-4">
        Discover my projects and works!
      </p>
      <div className="grid grid-cols-9 pt-10 py-20 gap-10">
        <ProjectCard
          className="col-span-9 lg:col-span-6"
          Title="Middle School Projects"
          theme="first"
          paddingOnChildren
        >
          <div className="flex gap-12 mt-10">
            <Link href="/projects/8th Grade">
              <div className="text-3xl hover:underline text-brand-150">
                8th Grade
              </div>
            </Link>
            <Link href="/projects/9th Grade">
              <div className="text-3xl hover:underline text-brand-150">
                9th Grade
              </div>
            </Link>
          </div>
        </ProjectCard>
        <ProjectCard
          className="col-span-9 lg:col-span-3"
          Title={P}
          theme="second"
          paddingOnChildren
        ></ProjectCard>
        <ProjectCard
          className="col-span-9 lg:col-span-4"
          Title={() => <div className="text-5xl">Art & Design</div>}
          theme="second"
          paddingOnChildren
        >
          <p className="text-xl text-brand-350">
            {' '}
            Explore my Arts & Design Projects.
          </p>{' '}
          <Link href="/projects/coding">
            <div className="hover:underline">
              See{' '}
              <span className="material-symbols-outlined">arrow_outward</span>
            </div>
          </Link>
        </ProjectCard>
        <ProjectCard
          className="col-span-9 lg:col-span-5"
          Title={() => (
            <Link href="/projects/coding">
              <div className="text-5xl hover:underline">
                Coding{' '}
                <span className="material-symbols-outlined">arrow_outward</span>
              </div>
            </Link>
          )}
          theme="first"
        >
          <div className="w-full relative overflow-x-hidden">
            <div className="   mt-10 gap-3">
              <div className="flex flex-nowrap -translate-x-4">
                <Pill className="mr-3 mb-2 text-xl">Javascript</Pill>
                <Pill className="mr-3 mb-2 text-xl">NodeJS</Pill>
                <Pill className="mr-3 mb-2 text-xl">Reactjs</Pill>
                <Pill className="mr-3 mb-2 text-xl">NextJS</Pill>
                <Pill className="mr-3 mb-2 text-xl">Vuejs</Pill>
                <Pill className="mr-3 mb-2 text-xl">Nuxtjs</Pill>
                <Pill className="mr-3 mb-2 text-xl">JQuery</Pill>
                <Pill className="mr-3 mb-2 text-xl">Webpack</Pill>
              </div>
              <div className="flex flex-nowrap -translate-x-4">
                <Pill className="mr-3 mb-2 text-xl">Arduino</Pill>
                <Pill className="mr-3 mb-2 text-xl">Python</Pill>
                <Pill className="mr-3 mb-2 text-xl">Golang</Pill>
                <Pill className="mr-3 mb-2 text-xl">Gin</Pill>
                <Pill className="mr-3 mb-2 text-xl">WebSocket</Pill>
                <Pill className="mr-3 mb-2 text-xl">Pandas</Pill>
                <Pill className="mr-3 mb-2 text-xl">MobileApp</Pill>
              </div>
            </div>
          </div>
        </ProjectCard>
        <Link href="/projects" className="col-span-9 ">
          <div className=" text-brand-350 mt-10 hover:underline text-center MADEMellow font-light text-3xl">
            Explore More
          </div>
        </Link>
      </div>
    </div>
  );
}
