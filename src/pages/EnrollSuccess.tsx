import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";
import { CheckCircle2 } from "lucide-react";

const EnrollSuccess = () => (
  <>
    <Seo title="Application Received | Al Shatibi Academy" description="Thanks for applying" path="/enroll/success" />
    <div className="min-h-screen bg-accent-maroon-dark flex items-center justify-center px-6 pt-20">
      <div className="max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-red-accent/15 border border-red-accent/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-red-accent" />
        </div>
        <h1 className="font-heading font-light text-grey-brand text-4xl md:text-5xl !leading-tight mb-5">
          Jazak Allahu <span className="text-red-accent">Khairan</span>
        </h1>
        <p className="text-grey-brand/75 font-sans text-base md:text-lg mb-3">
          We've received your application. Our team will reach out to you within 24 hours via email or WhatsApp.
        </p>
        <p className="text-grey-brand/55 font-sans text-sm mb-10">
          ندعو الله أن يبارك في وقتك ويفتح عليك أبواب القرآن.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-lg primary-btn maroon !border-0 font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </>
);

export default EnrollSuccess;
