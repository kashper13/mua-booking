import { lazy, Suspense } from "react";

import { HomeSections } from "../components/public/home-sections";
import { StickyBookingBar } from "../components/public/sticky-booking-bar";

const DevTestimonialSection = import.meta.env.DEV
  ? lazy(async () => {
      const module = await import("../components/public/testimonial-placeholder");
      return { default: module.TestimonialPlaceholder };
    })
  : null;

export function HomePage() {
  return (
    <main>
      <div className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col gap-8 px-gutter-text py-6 md:gap-12 md:px-8 md:py-12 lg:gap-16 lg:px-10 lg:py-16">
        <HomeSections />
        {DevTestimonialSection ? (
          <Suspense fallback={null}>
            <DevTestimonialSection />
          </Suspense>
        ) : null}
      </div>
      <StickyBookingBar />
    </main>
  );
}
