import GoogleUICircle from '@/components/googleUICircle';
import GoogleUICircleWithIcon from '@/components/googleUICircleWithIcon';
import Image from 'next/image';

let shortInfoh3Class = 'text-4xl xl:text-7xl';

function ShortInforHeading({ children }: { children: string | string[] }) {
  return (
    <h3 className="MADEMellow text-4xl xl:text-7xl text-brand-350 font-light">
      {children}
    </h3>
  );
}

export default function HeroSectionHome() {
  return (
    <>
      <div className="absolute top-0 left-0 -z-10 h-full w-full ">
        <div
          className="bg-no-repeat bg-center bg-cover w-full h-full "
          style={{
            background: 'url(/cool_pattern.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
        {/* <img src="/cool_pattern.png" className="h-full"></img> */}
      </div>
      <div className=" relative w-full py-24 md:py-60">
        <div
          className="absolute right-0 left-0 -z-20 w-full h-full"
          style={{
            bottom: '90%',
          }}
        >
          <div
            style={{
              width: '2225px',
              height: '2225px',
              background:
                'radial-gradient(50% 50% at 50% 50%, #A8987B 0%, #F5E6CB 54.53%, #FFF9ED 79.88%, #FFFDF9 97.92%)',
            }}
          ></div>
        </div>
        <div className="w-full container_px h-full text-start xl:text-center">
          <div className="relative mb-10 block md:hidden">
            <GoogleUICircle className=" w-32 h-32 fill-brand-150" />
            <div className="absolute top-0 w-32 h-32 flex justify-center items-center">
              <img
                src="/profile_photo.png"
                className=" w-28 h-28"
                alt="e"
              ></img>
            </div>
          </div>
          <h2 className=" mb-8 md:mb-16 text-brand-300 text-3xl">
            Hello there 👋, my name is
          </h2>
          <div className="relative flex justify-start flex-col items-start xl:items-center">
            {/* Aldhaneka title */}
            <div className="relative">
              <div className="hidden md:block absolute xl:-left-52 -right-52 -bottom-4 xl:bottom-6 -rotate-6">
                <div className="relative">
                  <GoogleUICircle className=" w-44 h-44 fill-brand-150" />
                  <div className="absolute top-0 w-44 h-44 flex justify-center items-center">
                    <img
                      src="/profile_photo.png"
                      className=" w-40 h-40"
                      alt="e"
                    ></img>
                  </div>
                </div>
              </div>

              <h1 className="MADEMellow text-7xl md:text-8xl xl:text-9xl font-semibold text-brand-350">
                Aldhaneka.
              </h1>
            </div>

            <div className="relative mt-16 xl:mt-28 ">
              <div className="flex flex-wrap gap-2 items-center justify-start xl:justify-center">
                <ShortInforHeading>I'm a student </ShortInforHeading>{' '}
                <GoogleUICircleWithIcon
                  icon="school"
                  iconClassName="text-brand-400 text-2xl md:text-5xl "
                  uiClassName="fill-brand-500 w-12 md:w-20"
                />
                <ShortInforHeading>and</ShortInforHeading>
                <ShortInforHeading>Fullstack Developer</ShortInforHeading>
              </div>
              <div
                className={`flex flex-wrap gap-5 items-center justify-start xl:justify-center mt-10`}
              >
                <ShortInforHeading>I </ShortInforHeading>{' '}
                <GoogleUICircleWithIcon
                  icon="favorite"
                  iconClassName="text-brand-600  text-2xl md:text-5xl  "
                  uiClassName="fill-brand-650 w-12 md:w-20"
                />
                <ShortInforHeading>
                  exploring new things because it
                </ShortInforHeading>
                <GoogleUICircleWithIcon
                  icon="psychiatry"
                  iconClassName="text-brand-700 text-2xl md:text-5xl "
                  uiClassName="fill-brand-750 w-12 md:w-20"
                />
                <ShortInforHeading>me.</ShortInforHeading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
