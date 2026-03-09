# Al Shatibi TV - React App Conversion Plan

Converting your existing Al Shatibi TV landing page (HTML + CSS + fonts) into a working React Vite app, keeping everything **exactly** as-is — same structure, same classes, same content, same styles.

## Step 1: Set Up Fonts & Global Styles

- Copy the uploaded font files (woff files) to the project
- Import Google Fonts (Nunito, Rubik) and TypeKit fonts
- Replace the current `index.css` with your full `styles.css` (12,970 lines of compiled Tailwind + custom CSS)
- Extend `tailwind.config.ts` with all custom values used in your site (custom colors like `red-accent`, `grey-brand`, custom font `font-heading`, custom breakpoints like `xxl`, `xs`, etc.)

## Step 2: Build the Header Component

- Fixed navigation bar with your SVG logo (the Al Shatibi TV logo)
- Navigation links: Explore, Library dropdown, Pricing
- Gift icon, Search icon
- "Sign In to Al Shatibi TV" and "Start Learning" buttons
- Exact same classes and structure from your HTML

## Step 3: Build the Hero Section

- "Quran Studies Made Simple" headline with red accent text
- Description paragraph and "Start Your 7-Day Free Trial" CTA button with play icon
- Background image from `bayyinahtv.com` CDN
- Text overlay gradient on desktop

## Step 4: Build the Reviews/Stats Section

- Stats: 500k Learners, +20y Teaching, 2000h Content
- 5-star rating display
- Review slider with testimonial cards (William Prochazka, Ayesha Salahuddin, etc.)
- Swiper pagination bullets
- Install Swiper library for working slider functionality

## Step 5: Build the Courses Section

- "Courses Designed to Meet You Where You're At" heading
- 3 course cards in a slider: Surah-by-Surah, Subject-by-Subject, Step-by-Step (Arabic)
- Each card with image, icon, title overlay
- Swiper slider for the courses

## Step 6: Build the "Why Al Shatibi TV" Section

- "A Proven Way of Learning" heading with CTA
- 3 feature cards: Clear/Structured/Accessible, Taught by Sheikh Ahmed Seraj, Learn Your Way
- Images from CDN

## Step 7: Build the Series Slider Section (Story Nights / Khutbahs / Ramadan)

- Tab-style navigation: Story Nights, Khutbahs, Ramadan Nights
- Series cards with thumbnails, Premium badges, lesson counts, duration, tags
- Swiper slider with navigation arrows

## Step 8: Build the Pricing Section

- "Pick the Plan That Fits Your Journey" heading
- Monthly/Yearly toggle
- Comparison table: Free vs Premium features
- Checkmark icons, pricing display
- CTA buttons

## Step 9: Build the FAQ Section

- "Frequently Asked Questions" heading
- Accordion items with expand/collapse functionality
- Questions: What is Al Shatibi TV?, How to get started?, etc.

## Step 10: Build the "Join the Global Al Shatibi Family" Section

- Stats and rating display
- App Store / Google Play download buttons (SVG badges)
- Background image

## Step 11: Build the Footer

- Logo, description text
- Link columns: Library (Surah, Subject, Arabic, Story), Company (Contact, Store)
- Mobile app download links
- Social media icons (YouTube, Instagram, Facebook, Twitter/X)
- Bottom bar: Copyright, Terms & Conditions, Privacy Policy

## Step 12: Wire Everything Together

- Assemble all components in the Index page
- Ensure dark mode classes are preserved
- Verify all external image URLs are working
- Test Swiper sliders and FAQ accordion interactions
