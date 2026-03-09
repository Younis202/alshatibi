import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

interface ExploreHeroProps {
  backgroundImage: string;
  heading: string;
  headingClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  description: string;
  teacherImage?: string;
  teacherName?: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  heroImage?: string;
  label?: string;
  backgroundStyle?: string;
}

const ExploreHero = ({
  backgroundImage,
  heading,
  subtitle,
  description,
  teacherImage,
  teacherName,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  heroImage,
  label,
  backgroundStyle,
}: ExploreHeroProps) => {
  return (
    <section
      className={`pt-16 sm:pt-20 explore bg-[rgb(30_21_25/var(--tw-bg-opacity,1))] relative bg-top bg-no-repeat bg-[length:250%] md:bg-[length:200%] lg:bg-cover lg:bg-[length:100%] ${
        backgroundStyle || ""
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-10 z-20 relative">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div
              className={`w-full ${
                heroImage ? "lg:w-1/2" : ""
              } py-16 md:py-20 lg:py-20`}
            >
              <AnimateOnScroll delay={0.1}>
                <h2
                  className="text-[#ffeada] font-light leading-[1.1]"
                  dangerouslySetInnerHTML={{ __html: heading }}
                  style={{ fontSize: "clamp(2.65rem, 6.5vw, 6rem)" }}
                />
              </AnimateOnScroll>
              {subtitle && (
                <AnimateOnScroll delay={0.15}>
                  <p
                    className="text-[#ffeada] text-2xl md:text-3xl lg:text-[2.65rem] mt-2"
                    style={{ lineHeight: 1.15 }}
                  >
                    {subtitle}
                  </p>
                </AnimateOnScroll>
              )}
              <AnimateOnScroll delay={0.2}>
                <p
                  className="text-white text-base lg:text-lg mt-4 font-sans"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </AnimateOnScroll>
              {teacherImage && teacherName && (
                <AnimateOnScroll delay={0.25}>
                  <div className="flex items-center gap-3 mt-6 md:gap-4 xl:gap-5">
                    <img
                      decoding="async"
                      src={teacherImage}
                      className="flex-shrink-0 object-cover w-12 h-12 rounded-full lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                      alt=""
                    />
                    <p className="mt-0 text-left text-white">
                      Taught by: {teacherName}
                    </p>
                  </div>
                </AnimateOnScroll>
              )}
              <AnimateOnScroll delay={0.3}>
                <div className="flex flex-wrap mt-4 items-center gap-x-2">
                  <a
                    href={buttonLink}
                    className="primary-btn maroon text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{buttonText}</span>
                  </a>
                  {secondaryButtonText && secondaryButtonLink && (
                    <a
                      href={secondaryButtonLink}
                      className="secondary-btn maroon text-white link-color"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{secondaryButtonText}</span>
                    </a>
                  )}
                </div>
              </AnimateOnScroll>
            </div>
            {heroImage && (
              <AnimateOnScroll delay={0.2} className="w-full lg:w-1/2">
                <img src={heroImage} alt="" className="w-full rounded-2xl" />
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </div>
      {heroImage && (
        <div
          className="absolute max-w-[100%] md:max-w-[80%] lg:max-w-[70%] 2xl:max-w-[975px] w-full h-full left-0 top-0 z-10 opacity-50"
          style={{
            background: "linear-gradient(90deg, #260500 0%, transparent 100%)",
          }}
        ></div>
      )}
    </section>
  );
};

export default ExploreHero;
