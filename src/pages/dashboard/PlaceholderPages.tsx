import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BookOpen, ArrowRight, LucideIcon, Award } from "lucide-react";

interface Props {
  title: string;
  description: string;
  emptyTitle: string;
  emptyText: string;
  icon: LucideIcon;
  path: string;
}

const PlaceholderPage = ({ title, description, emptyTitle, emptyText, icon: Icon, path }: Props) => (
  <>
    <Seo title={`${title} | Al Shatibi Academy`} description={description} path={path} />
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight mb-3">
          {title}
        </h1>
        <p className="text-grey-brand/60 font-sans text-lg">{description}</p>
      </div>

      <div className="bg-[#4D0B00] rounded-2xl p-12 md:p-16 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
          <Icon className="w-7 h-7 text-red-accent" />
        </div>
        <h2 className="font-heading font-light text-2xl md:text-3xl text-grey-brand mb-2">
          {emptyTitle}
        </h2>
        <p className="text-grey-brand/60 font-sans max-w-lg mx-auto mb-7">{emptyText}</p>
        <Link
          to="/courses"
          className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2"
        >
          <span>Browse Courses</span> <ArrowRight className="w-4 h-4 icon" />
        </Link>
      </div>
    </DashboardLayout>
  </>
);

export const MyCourses = () => (
  <PlaceholderPage
    title="My Courses"
    description="All the courses you're currently enrolled in."
    emptyTitle="No courses yet"
    emptyText="Once you enroll in a course, it will appear here. Continue your studies any time."
    icon={BookOpen}
    path="/dashboard/courses"
  />
);

export const Certificates = () => (
  <PlaceholderPage
    title="Certificates"
    description="Your earned certificates of completion."
    emptyTitle="No certificates yet"
    emptyText="Complete courses to earn your certificates of accomplishment, signed by your instructors."
    icon={Award}
    path="/dashboard/certificates"
  />
);
