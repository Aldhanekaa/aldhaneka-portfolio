import Link from 'next/link';

const socialLink = [
  {
    title: 'GitHub',
    src: 'https://github.com/aldhanekaa',
  },
  {
    title: 'Figma',
    src: 'https://github.com/aldhanekaa',
  },
];

function AboutMeDescP({
  children,
  className,
}: {
  children: string | string[];
  className: string;
}) {
  return (
    <div className={`${className} text-2xl text-justify text-brand-350`}>
      <p>{children}</p>
    </div>
  );
}

function LanguageItem({
  lang,
  skill,
  className,
}: {
  lang: string;
  skill: string;
  className: string;
}) {
  return (
    <div className={`${className} break-words`}>
      <p className="text-xl text-brand-200">{lang}</p>
      <p className="text-lg text-brand-200 ">{skill}</p>
    </div>
  );
}

function LinkSocial({
  children,
  href,
  className,
}: {
  children: string | string[];
  href: string;
  className: string;
}) {
  return (
    <Link href={href} className={className} target="_blank">
      <div className={`text-4xl MADEMellow font-light text-brand-200`}>
        {children}
      </div>
    </Link>
  );
}

function QuotesJunk() {
  return <div className="xl:col-span-1"></div>;
}

export default function AboutSection() {
  return (
    <div id="about" className="w-full pt-28 pb-96 mt-96 relative">
      <div className="absolute top-0 left-0 -z-10 h-full w-full ">
        <div
          className="bg-no-repeat bg-center bg-cover w-full h-full "
          style={{
            background: 'url(/About_me_pattern.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
        {/* <img src="/cool_pattern.png" className="h-full"></img> */}
      </div>
      <div className="relative">
        <div className="absolute w-full h-24 bg-brand-50 bottom-0 -z-20"></div>
        <div className="grid grid-cols-9 container_px gap-10">
          <div className="col-span-9  xl:col-span-4">
            <img src="/About_me_profile.png" width={'100%'}></img>
          </div>
          <div className="col-span-9  xl:col-span-5">
            <div className="w-full h-full grid grid-cols-5 content-end gap-10 pb-6">
              <div className="col-span-5 mb-12">
                <hr className="border-2 border-brand-350 w-48 mb-12" />
                <h4 className="text-7xl MADEMellow font-light text-brand-350">
                  About Me
                </h4>
              </div>
              <AboutMeDescP className="col-span-5 xl:col-span-3">
                My full name is Aldhaneka Aufa Izzat. I’m currently 15 and
                middle school student at Madrasah International TechnoNatura
                Indonesia 🇮🇩 I’m a really curious student and hard worker, I
                love exploring new activities! I fill my free time with coding
                or reading books while listening to music 🎶.
              </AboutMeDescP>
              <AboutMeDescP className="col-span-5 xl:col-span-2">
                I started my coding journey at 28 June 2020, and the journey
                will keep going until my last day. Have a goals to study abroad
                at singapore by 2026.
              </AboutMeDescP>
              <LinkSocial
                href="https://github.com/aldhanekaa"
                className="col-span-5 lg:col-span-1"
              >
                GitHub
              </LinkSocial>
              <LinkSocial
                href="https://www.figma.com/@aldhanekadesign"
                className="col-span-5 lg:col-span-1"
              >
                Figma
              </LinkSocial>
              <LinkSocial
                href="https://www.figma.com/@aldhanekadesign"
                className="col-span-5 lg:col-span-1"
              >
                Email
              </LinkSocial>
              <LinkSocial
                href="https://www.figma.com/@aldhanekadesign"
                className="col-span-2"
              >
                Instagram
              </LinkSocial>
              <p className="col-span-5 text-2xl text-brand-200 font-semibold">
                Languages
              </p>
              <LanguageItem
                lang="Bahasa Indonesia"
                skill="Native"
                className="col-span-2 xl:col-span-1"
              />
              <LanguageItem
                lang="English"
                skill="Intermediate"
                className="col-span-2 xl:col-span-1"
              />
              <LanguageItem
                lang="日本語"
                skill="Learning!"
                className="col-span-5 xl:col-span-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative -z-20 bg-brand-50 pt-32 pb-32">
        <div className="grid grid-cols-9 container_px gap-10">
          <div className="col-span-9 text-brand-350 text-xl">
            Favourites Quotes, That Drives Me!
          </div>
          <div className="col-span-9 MADEMellow text-5xl font-normal text-brand-300 relative">
            <div className="absolute top-0 -left-12 text-8xl text-brand-400">
              ”
            </div>
            <div className="absolute -bottom-10 -right-3 text-8xl text-brand-400">
              ”
            </div>
            Keberhasilan bukanlah milik orang yang pintar. Keberhasilan adalah
            kepunyaan mereka yang senantiasa berusaha.
          </div>
          <div className="col-span-6 md:col-span-5  lg:col-span-3 xl:col-span-2 text-3xl MADEMellow font-light text-brand-350 break-words">
            Bachruddin Jusuf Habibie
          </div>
          <div className="col-span-3 md:col-span-2 lg:col-span-1 xl:col-span-1">
            <button className="h-full text-2xl mr-3">
              <span className="material-symbols-outlined rotate-180">
                trending_flat
              </span>
            </button>
            <button className="h-full text-2xl">
              <span className="material-symbols-outlined">trending_flat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
