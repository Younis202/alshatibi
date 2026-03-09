import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const WhyBayyinahCards = () => {
  const cards = [
    {
      image:
        "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/le-image1.1GFQfRsw.png",
      title: "Clear. Structured. Accessible.",
      description:
        "No more guesswork. Follow a step-by- step path with smart filters to guide your Quran journey at your own pace.",
    },
    {
      image: "https://ik.imagekit.io/ihhlj9kpd/unna%D8%B3%D8%B3med%20copy.png",
      title: "Taught by Sheikh Ahmed Seraj",
      description:
        "Learn from a trusted teacher whose lessons are backed by a global research team that consults scholars across languages and traditions.",
    },
    {
      image: "https://www.bayyinahtv.com/_nuxt/le-image2.BbcuLHw6.png",
      title: "Learn Your Way",
      description:
        "Watch or listen, track your progress and pick up right where you left off - anytime, on any device.",
    },
  ];

  return (
    <>
      <section className="pt-12 md:pt-16 lg:pt-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-10 z-20 relative">
          <div className="text-center">
            <AnimateOnScroll>
              <div className="tag-large maroon">Why Al Shatibi TV</div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2
                className="font-heading text-[#fff7f0] text-3xl md:text-4xl lg:text-5xl xl:text-[3.75rem] mt-6"
                style={{ fontWeight: 400 }}
              >
                A Proven Way of Learning
              </h2>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {cards.map((card, index) => (
              <AnimateOnScroll key={index} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-full">
                    <img
                      decoding="async"
                      src={card.image}
                      alt={card.title}
                      className="mx-auto rounded-xl md:rounded-2xl xl:rounded-3xl"
                      style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
                    />
                  </div>
                  <h3 className="text-[#fff7f0] text-xl md:text-2xl lg:text-[1.875rem] font-semibold mt-6">
                    {card.title}
                  </h3>
                  <p className="text-base lg:text-lg text-white mt-2 font-sans mt-5">
                    {card.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyBayyinahCards;
