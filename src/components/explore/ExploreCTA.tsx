import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

interface ExploreCTAProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const ExploreCTA = ({
  heading,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: ExploreCTAProps) => {
  const isInternal = buttonLink.startsWith("/");

  return (
    <section
      className="bg-[#111] relative bg-cover bg-top bg-no-repeat pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-24 lg:pb-32"
      style={{
        backgroundImage: `url(https://explore.bayyinahtv.com/wp-content/uploads/2025/04/bottom-banner.png)`,
      }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-10 z-20 relative">
        <div className="relative pb-12 md:pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <AnimateOnScroll>
              <h2
                className="font-heading text-[#ffeada] text-3xl md:text-4xl lg:text-5xl xl:text-[3.75rem]"
                style={{ fontWeight: 400 }}
              >
                {heading}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <p className="text-[#ffeada] text-lg xl:text-xl mt-4">
                {description}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="flex flex-wrap mt-4 items-center justify-center gap-x-2">
                {isInternal ? (
                  <Link
                    to={buttonLink}
                    className="primary-btn maroon text-white"
                  >
                    <span>{buttonText}</span>
                  </Link>
                ) : (
                  <a
                    href={buttonLink}
                    className="primary-btn maroon text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{buttonText}</span>
                  </a>
                )}
                {secondaryButtonText && secondaryButtonLink && (
                  <a
                    href={secondaryButtonLink}
                    className="secondary-btn maroon text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{secondaryButtonText}</span>
                  </a>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCTA;
