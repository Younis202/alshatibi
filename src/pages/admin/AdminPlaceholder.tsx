import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Construction } from "lucide-react";

interface Props {
  title: string;
  description: string;
  phase: string;
  path: string;
}

const AdminPlaceholder = ({ title, description, phase, path }: Props) => (
  <>
    <Seo title={`${title} | Admin`} description={description} path={path} />
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading font-light text-grey-brand text-3xl sm:text-4xl !leading-tight mb-2">
          {title}
        </h1>
        <p className="text-grey-brand/60 font-sans">{description}</p>
      </div>

      <div className="bg-[#4D0B00] rounded-2xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-300/15 border border-amber-300/30 flex items-center justify-center">
          <Construction className="w-7 h-7 text-amber-300" />
        </div>
        <h2 className="font-heading font-light text-grey-brand text-2xl mb-2">Coming in {phase}</h2>
        <p className="text-grey-brand/60 font-sans max-w-md mx-auto">
          This section will be built out next as the platform grows.
        </p>
      </div>
    </AdminLayout>
  </>
);

export default AdminPlaceholder;
