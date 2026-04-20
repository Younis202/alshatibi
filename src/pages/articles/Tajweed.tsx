import Seo from "@/components/seo/Seo";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const Tajweed = () => {
  return (
    <>
      <Seo
        title="Tajweed: Complete Guide to Quran Recitation Rules | Al Shatibi Academy"
        description="Learn Tajweed from scratch: articulation points (Makharij), letter characteristics (Sifat), rules of Noon Sakinah, Meem Sakinah, and Madd. A simplified guide for beginners and advanced learners."
        path="/articles/tajweed"
        keywords="Tajweed, Tajweed rules, Quran recitation, Makharij, articulation points, Sifat, letter characteristics, Noon Sakinah, Madd rules, learn Tajweed, تجويد, Quran pronunciation, Islamic education"
        lang="en"
      />
      <ArticleSchema
        title="Tajweed: Complete Guide to Quran Recitation Rules"
        description="Learn Tajweed from scratch: articulation points (Makharij), letter characteristics (Sifat), rules of Noon Sakinah, Meem Sakinah, and Madd."
        url="https://alshatibi.vercel.app/articles/tajweed"
        datePublished="2025-03-09"
        dateModified="2025-03-09"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://alshatibi.vercel.app/" },
          { name: "Explore", url: "https://alshatibi.vercel.app/explore" },
          { name: "Tajweed", url: "https://alshatibi.vercel.app/articles/tajweed" }
        ]}
      />
      
      <article className="bg-accent-maroon-dark min-h-screen pt-24 sm:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-[900px] mx-auto">
            
            {/* Breadcrumb */}
            <AnimateOnScroll>
              <nav className="mb-8 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Tajweed</span>
              </nav>
            </AnimateOnScroll>

            {/* Hero */}
            <AnimateOnScroll>
              <header className="mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs tracking-wider uppercase bg-red-accent/20 text-white border border-red-accent/30 mb-6">
                  The Science of Tajweed
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading text-white mb-6 leading-tight">
                  Tajweed: <span className="text-red-accent">The Art of</span> Beautiful Quran Recitation
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans">
                  Tajweed is the science of giving every letter its due right in terms of articulation points and characteristics. Learning Tajweed is an individual obligation upon every Muslim who recites the Quran, and this guide takes you on a comprehensive journey to master this noble science.
                </p>
              </header>
            </AnimateOnScroll>

            {/* Table of Contents */}
            <AnimateOnScroll delay={0.1}>
              <div className="bg-black/30 rounded-2xl p-6 md:p-8 mb-12 border border-white/10">
                <h2 className="text-xl font-heading text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-white/80 font-sans">
                  <li><a href="#what-is" className="hover:text-red-accent transition-colors">• What is Tajweed?</a></li>
                  <li><a href="#importance" className="hover:text-red-accent transition-colors">• Importance & Ruling of Tajweed</a></li>
                  <li><a href="#makharij" className="hover:text-red-accent transition-colors">• Articulation Points (Makharij)</a></li>
                  <li><a href="#sifat" className="hover:text-red-accent transition-colors">• Letter Characteristics (Sifat)</a></li>
                  <li><a href="#noon-rules" className="hover:text-red-accent transition-colors">• Rules of Noon Sakinah & Tanween</a></li>
                  <li><a href="#meem-rules" className="hover:text-red-accent transition-colors">• Rules of Meem Sakinah</a></li>
                  <li><a href="#mudood" className="hover:text-red-accent transition-colors">• Rules of Madd (Elongation)</a></li>
                  <li><a href="#start-learning" className="hover:text-red-accent transition-colors">• How to Learn Tajweed</a></li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Content Sections */}
            <div className="prose prose-lg prose-invert max-w-none">
              
              <AnimateOnScroll>
                <section id="what-is" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">What is Tajweed?</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Tajweed linguistically:</strong> Means beautification and excellence. <strong>Technically:</strong> It is the science that deals with the correct pronunciation of Arabic letters, giving each letter its due right (Haqq) and due characteristics (Mustahaqq) from articulation points and attributes.
                    </p>
                    <p>
                      <strong>Haqq (Right) of the letter:</strong> Its inherent essential characteristics like Jahr (vocalization), Shiddah (strength), and Isti'la (elevation).
                      <br />
                      <strong>Mustahaqq (Due) of the letter:</strong> Incidental characteristics arising from the essential ones, like Tafkheem (heaviness) and Tarqeeq (lightness).
                    </p>
                    <div className="bg-red-accent/10 border-l-4 border-red-accent p-4 rounded-lg my-6">
                      <p className="text-white font-medium">
                        📖 Imam Ibn Al-Jazari (may Allah have mercy on him) said: "Applying Tajweed is an absolute necessity; whoever doesn't apply Tajweed to the Quran is sinning."
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="importance" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Importance & Ruling of Tajweed</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      Learning Tajweed as a theoretical science is a <strong>communal obligation (Fard Kifayah)</strong>, while applying it when reciting the Quran is an <strong>individual obligation (Fard 'Ayn)</strong>. Allah says: <em>"And recite the Quran with measured recitation (Tarteel)."</em> [Al-Muzzammil: 4]
                    </p>
                    <p>Benefits of learning Tajweed:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Protects the tongue from errors (Lahn) in Allah's Book</li>
                      <li>Beautifies the voice and enhances recitation</li>
                      <li>Better understanding of meanings through proper pronunciation</li>
                      <li>Preserves the Quran as it was revealed to the Prophet ﷺ</li>
                      <li>Earns great reward from Allah</li>
                    </ul>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="makharij" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Articulation Points (Makharij)</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Makhraj:</strong> The place where a letter originates and is distinguished from others. There are five general articulation areas:
                    </p>
                    
                    <div className="grid gap-4 mt-6">
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">1. Al-Jawf (The Empty Space)</h3>
                        <p className="text-sm font-sans">The three Madd letters originate from here: Alif, Waw (with Dammah before), and Ya (with Kasrah before).</p>
                      </div>
                      
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">2. Al-Halq (The Throat) - 3 Points</h3>
                        <p className="text-sm font-sans">
                          • Deepest part: Hamzah (ء) and Ha (هـ)<br />
                          • Middle: 'Ayn (ع) and Ha (ح)<br />
                          • Nearest to mouth: Ghayn (غ) and Kha (خ)
                        </p>
                      </div>
                      
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">3. Al-Lisan (The Tongue) - 10 Points</h3>
                        <p className="text-sm font-sans">18 letters originate from here, including: Qaf, Kaf, Jim, Shin, Dad, Lam, Nun, Ra, Ta, Dal, Ta, Sad, Sin, Zay, Dha, Dhal, Tha.</p>
                      </div>
                      
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">4. Ash-Shafatan (The Lips) - 2 Points</h3>
                        <p className="text-sm font-sans">
                          • Inner lower lip with upper front teeth: Fa (ف)<br />
                          • Both lips together: Ba (ب), Meem (م), Waw (و)
                        </p>
                      </div>
                      
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">5. Al-Khayshoom (The Nasal Passage)</h3>
                        <p className="text-sm font-sans">The Ghunnah (nasalization) accompanying doubled Meem and Noon, assimilated letters, and concealed letters originates here.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="sifat" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Letter Characteristics (Sifat)</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Sifah:</strong> A quality that occurs to a letter when produced at its articulation point. Characteristics are divided into:
                    </p>
                    
                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Characteristics with Opposites:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-black/30">
                            <th className="border border-white/20 p-3 text-left text-white">Characteristic</th>
                            <th className="border border-white/20 p-3 text-left text-white">Its Opposite</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-white/20 p-3">Jahr (Vocalization)</td>
                            <td className="border border-white/20 p-3">Hams (Whispering)</td>
                          </tr>
                          <tr className="bg-black/10">
                            <td className="border border-white/20 p-3">Shiddah (Strength)</td>
                            <td className="border border-white/20 p-3">Rakhawah (Softness) & Tawassut (Medium)</td>
                          </tr>
                          <tr>
                            <td className="border border-white/20 p-3">Isti'la (Elevation)</td>
                            <td className="border border-white/20 p-3">Istifal (Lowering)</td>
                          </tr>
                          <tr className="bg-black/10">
                            <td className="border border-white/20 p-3">Itbaq (Adherence)</td>
                            <td className="border border-white/20 p-3">Infitah (Openness)</td>
                          </tr>
                          <tr>
                            <td className="border border-white/20 p-3">Idhlaq (Fluency)</td>
                            <td className="border border-white/20 p-3">Ismat (Impediment)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Characteristics without Opposites:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li><strong>Safeer (Whistling):</strong> ص، س، ز (Sad, Sin, Zay)</li>
                      <li><strong>Qalqalah (Echoing):</strong> ق، ط، ب، ج، د (Qaf, Ta, Ba, Jim, Dal)</li>
                      <li><strong>Leen (Softness):</strong> Waw and Ya with Sukoon preceded by Fathah</li>
                      <li><strong>Inhiraf (Deviation):</strong> ل، ر (Lam, Ra)</li>
                      <li><strong>Takrir (Repetition):</strong> ر (Ra)</li>
                      <li><strong>Tafashi (Spreading):</strong> ش (Shin)</li>
                      <li><strong>Istitaalah (Elongation):</strong> ض (Dad)</li>
                    </ul>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="noon-rules" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Rules of Noon Sakinah & Tanween</h2>
                  <div className="text-white/80 space-y-6 leading-relaxed font-sans">
                    <p>Noon Sakinah and Tanween have four rules:</p>
                    
                    <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl text-white font-heading mb-3">1. Izhar (Clear Pronunciation)</h3>
                      <p className="font-sans">Pronouncing the Noon Sakinah or Tanween clearly from its articulation point without nasalization.</p>
                      <p className="text-sm mt-2 font-sans"><strong>Letters:</strong> ء، هـ، ع، ح، غ، خ (The throat letters)</p>
                      <p className="text-sm font-sans"><strong>Example:</strong> مِنْ هَادٍ، عَلِيمٌ حَكِيم</p>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl text-white font-heading mb-3">2. Idgham (Merging)</h3>
                      <p className="font-sans">Merging a silent letter into a voweled letter so they become one emphasized letter.</p>
                      <p className="text-sm mt-2 font-sans"><strong>Letters:</strong> ي، ر، م، ل، و، ن (YaRMaLooN)</p>
                      <p className="text-sm font-sans"><strong>Two types:</strong> With Ghunnah (ي، ن، م، و) - Without Ghunnah (ل، ر)</p>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl text-white font-heading mb-3">3. Iqlab (Conversion)</h3>
                      <p className="font-sans">Converting Noon Sakinah or Tanween into a hidden Meem with nasalization when followed by Ba.</p>
                      <p className="text-sm mt-2 font-sans"><strong>Letter:</strong> Ba (ب) only</p>
                      <p className="text-sm font-sans"><strong>Example:</strong> مِنْ بَعْدِ → مِمْبَعْدِ، سَمِيعٌ بَصِير</p>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl text-white font-heading mb-3">4. Ikhfa (Concealment)</h3>
                      <p className="font-sans">Pronouncing Noon Sakinah or Tanween between Izhar and Idgham with nasalization.</p>
                      <p className="text-sm mt-2 font-sans"><strong>Letters:</strong> 15 letters (remaining after Izhar, Idgham, and Iqlab letters)</p>
                      <p className="text-sm font-sans"><strong>Example:</strong> مِنْ قَبْلِ، عَلِيمٌ خَبِير</p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="meem-rules" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Rules of Meem Sakinah</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>Meem Sakinah has three rules:</p>
                    <ul className="list-disc list-inside space-y-3 ml-4">
                      <li>
                        <strong>Ikhfa Shafawi (Labial Concealment):</strong> When followed by Ba. Example: تَرْمِيهِمْ بِحِجَارَة
                      </li>
                      <li>
                        <strong>Idgham Shafawi (Labial Merging):</strong> When followed by Meem. Example: لَهُمْ مَا يَشَاءُون
                      </li>
                      <li>
                        <strong>Izhar Shafawi (Labial Clear Pronunciation):</strong> When followed by any other letter. Example: وَهُمْ فِيهَا
                      </li>
                    </ul>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="mudood" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Rules of Madd (Elongation)</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Madd:</strong> Elongating the sound with one of the Madd letters (ا، و، ي) or the Leen letters.
                    </p>
                    
                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Main Types of Madd:</h3>
                    <div className="grid gap-3">
                      <div className="bg-black/20 p-4 rounded-lg">
                        <strong className="text-white">Natural Madd (Madd Tabee'i):</strong>
                        <span className="text-sm block mt-1 font-sans">Duration: 2 counts. Example: قَالَ، يَقُولُ</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg">
                        <strong className="text-white">Connected Madd (Madd Muttasil):</strong>
                        <span className="text-sm block mt-1 font-sans">Hamzah follows Madd letter in same word. Obligatory 4-5 counts.</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg">
                        <strong className="text-white">Separated Madd (Madd Munfasil):</strong>
                        <span className="text-sm block mt-1 font-sans">Hamzah in following word. Permissible 2-4-5 counts.</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg">
                        <strong className="text-white">Incidental Madd ('Aridh lil-Sukoon):</strong>
                        <span className="text-sm block mt-1 font-sans">Sukoon due to stopping. Permissible 2-4-6 counts.</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg">
                        <strong className="text-white">Necessary Madd (Madd Lazim):</strong>
                        <span className="text-sm block mt-1 font-sans">Original Sukoon that remains in connecting and stopping. Obligatory 6 counts.</span>
                      </div>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="start-learning" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">How to Learn Tajweed</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>Tajweed is learned through oral transmission and practice. Here are practical steps:</p>
                    <ol className="list-decimal list-inside space-y-3 ml-4">
                      <li>
                        <strong>Learn to read first:</strong> If you're a beginner, start with <Link to="/explore/learntoreadquran" className="text-red-accent underline">Learn to Read Quran</Link>.
                      </li>
                      <li>
                        <strong>Learn articulation points:</strong> This is the foundation. Practice pronouncing each letter from its correct point.
                      </li>
                      <li>
                        <strong>Memorize theoretical rules:</strong> Start with Noon Sakinah and Tanween rules.
                      </li>
                      <li>
                        <strong>Practice with a qualified teacher:</strong> Listening and correction are essential.
                      </li>
                      <li>
                        <strong>Recite abundantly:</strong> Practice solidifies the rules.
                      </li>
                    </ol>
                    
                    <div className="bg-red-accent/10 border-l-4 border-red-accent p-4 rounded-lg my-6">
                      <p className="text-white font-medium">
                        🎓 In our <Link to="/explore/quran" className="text-red-accent underline">Quran courses</Link> at Al Shatibi Academy, we offer progressive Tajweed lessons with Sheikh Ahmed Seraj.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

            </div>

            {/* CTA Section */}
            <AnimateOnScroll>
              <div className="mt-16 bg-gradient-to-br from-red-accent/20 to-black/40 rounded-2xl p-8 md:p-12 border border-red-accent/30 text-center">
                <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                  Master Tajweed with Al Shatibi Academy
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto font-sans">
                  Learn Tajweed from scratch with simplified, systematic courses under the guidance of specialized scholars.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/enroll?goal=tajweed"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold text-white rounded-lg primary-btn maroon transition-all"
                  >
                    Apply to Join the Academy
                  </Link>
                  <Link
                    to="/explore/quran"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold text-white rounded-lg border border-white/30 hover:bg-white/10 transition-all"
                  >
                    Quran Courses
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Related Articles */}
            <AnimateOnScroll>
              <div className="mt-16">
                <h3 className="text-xl font-heading text-white mb-6">Related Articles</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/articles/hifz-quran" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Quran Memorization</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Complete guide to memorizing the Quran.</p>
                  </Link>
                  <Link to="/articles/learn-arabic" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Learn Arabic</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Your guide to learning Arabic for Quran understanding.</p>
                  </Link>
                  <Link to="/explore/learntoreadquran" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Learn to Read Quran</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Beginner's course in reading the Quran.</p>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </article>
    </>
  );
};

export default Tajweed;
