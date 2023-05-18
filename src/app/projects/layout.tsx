import { useFormik } from 'formik';
import ProjectNavbar from '@/components/pages/projects/projectNavbar';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProjectNavbar />
      {children}
    </>
  );
}
