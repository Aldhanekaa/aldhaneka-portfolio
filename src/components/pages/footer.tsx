import Link from 'next/link';

function FooterHeading({ children }: { children: string }) {
  return (
    <h5 className="text-5xl MADEMellow font-normal text-brand-300">
      {children}
    </h5>
  );
}

function FooterLink({ children, href }: { children: string; href: string }) {
  return (
    <Link href={href} className="hover:underline">
      <p className="text-3xl MADEMellow font-light text-brand-350">
        {children}
      </p>
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="w-full container_px ">
      <div
        className="pt-16 pb-20 grid grid-cols-9 gap-10 border-2 border-brand-300"
        style={{
          borderTopLeftRadius: '100px',
          borderTopRightRadius: '100px',
        }}
      >
        <div className="col-span-1 row-span-2"></div>
        <div className="col-span-7 row-span-1">
          <div className="flex justify-between">
            <img src="/aldhaneka_personal_logo.svg" className="h-12"></img>
          </div>
        </div>
        <div className="col-span-7 row-span-1 grid grid-cols-7 mt-5">
          <div className="col-span-7 lg:col-span-2 break-words">
            <FooterHeading>About</FooterHeading>
            <ul className="mt-8">
              <FooterLink href="/#about">Aldhaneka</FooterLink>
              <FooterLink href="/projects">Project & Works</FooterLink>
            </ul>
          </div>
          <div className="col-span-7 lg:col-span-2 break-words">
            <FooterHeading>Persona</FooterHeading>
            <ul className="mt-8">
              <FooterLink href="/journals">Journals</FooterLink>
            </ul>
          </div>{' '}
          <div className="col-span-7 lg:col-span-2 break-words">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-8">
              <FooterLink href="#">aldhaneka[at]gmail.com</FooterLink>
            </ul>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}
