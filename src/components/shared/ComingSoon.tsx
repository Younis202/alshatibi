import { Link } from "react-router-dom";

const ComingSoon = ({ title = "Coming Soon" }: { title?: string }) => (
  <div className="min-h-screen bg-accent-maroon-dark flex items-center justify-center px-6">
    <div className="text-center max-w-md">
      <h1 className="text-grey-brand font-heading font-light text-4xl md:text-5xl mb-4">
        {title}
      </h1>
      <p className="text-grey-brand/65 font-sans mb-8">
        We're focused on connecting students with our scholars personally. Submit an
        application and our team will reach out to you directly.
      </p>
      <Link to="/enroll" className="primary-btn maroon no-margin text-grey-brand inline-flex">
        <span>Apply to Join</span>
      </Link>
    </div>
  </div>
);

export default ComingSoon;
