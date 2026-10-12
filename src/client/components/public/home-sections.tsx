import type { ReactNode } from "react";

import { Card } from "../ui/card";
import { ArchPlaceholder, type ArchTone } from "./arch-placeholder";
import { ComingSoonButton, MessengerUnavailable } from "./unavailable-controls";
import {
  aboutBiography,
  artistNamePlaceholder,
  bookingComingSoonLabel,
  bookingUnavailableDetail,
  categories,
  durationPlaceholder,
  heroHeading,
  heroSupporting,
  locationLabel,
  messengerUnavailableLabel,
  portfolioPlaceholders,
  pricePlaceholder,
  quotePriceCopy,
  servicePreviews,
} from "../../content/public-site";

function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4">
        <h2 id={id} className="type-h2 text-plum-ink">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px w-10 bg-sage" />
      </div>
      {children ? <p className="mt-3 type-body-lg text-mauve">{children}</p> : null}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      aria-labelledby="home-heading"
      className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_92px] items-start gap-x-3 gap-y-4 min-[390px]:grid-cols-[minmax(0,1fr)_120px] md:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] md:items-center md:gap-x-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,340px)] lg:gap-x-16"
    >
      <div className="contents md:flex md:min-w-0 md:flex-col md:justify-center md:gap-6">
        <div className="min-w-0">
          <p className="type-eyebrow text-sage-text">{locationLabel}</p>
          <h1
            id="home-heading"
            className="mt-2 font-display text-[1.65rem] leading-[1.12] break-words text-plum-ink min-[390px]:text-[1.75rem] md:mt-3 md:text-[3rem] lg:text-[4rem]"
          >
            {heroHeading}
          </h1>
        </div>
        <p className="col-span-2 min-w-0 max-w-[34rem] type-body text-mauve md:col-span-1 md:type-body-lg">
          {heroSupporting}
        </p>
        <div
          id="hero-booking-action"
          className="col-span-2 flex min-w-0 max-w-md flex-col gap-3 md:col-span-1"
        >
          <div className="flex items-center gap-3">
            <ComingSoonButton className="min-w-0 flex-1 leading-tight md:flex-none md:px-6">
              {bookingComingSoonLabel}
            </ComingSoonButton>
            <MessengerUnavailable />
          </div>
          <p className="type-small text-mauve">
            {messengerUnavailableLabel}. {bookingUnavailableDetail}
          </p>
        </div>
      </div>
      <ArchPlaceholder
        label="Hero photo placeholder"
        className="col-start-2 row-start-1 h-[140px] w-full min-w-0 min-[390px]:h-[176px] md:col-start-auto md:row-start-auto md:h-[380px] lg:h-[440px]"
      />
    </section>
  );
}

function CategorySection() {
  return (
    <section aria-labelledby="categories-title">
      <SectionHeading id="categories-title" title="Occasions">
        Bridal, debut, graduation, and events. These previews are not open for booking.
      </SectionHeading>
      <ul className="mt-5 grid min-w-0 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((category) => (
          <li key={category.title} className="min-w-0">
            <button
              type="button"
              aria-disabled="true"
              className="flex h-full w-full flex-col rounded-lg border border-border bg-surface p-3 text-left"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <ArchPlaceholder
                decorative
                label=""
                tone={category.tone}
                className="h-28 w-full md:h-36"
              />
              <span className="mt-3 type-card-title text-plum-ink">{category.title}</span>
              <span className="sr-only">, coming soon</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AboutSection() {
  return (
    <section aria-labelledby="about-title">
      <SectionHeading id="about-title" title="About the artist" />
      <Card className="mt-5 flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8 md:p-6">
        <ArchPlaceholder label="Profile photo placeholder" className="h-40 w-28 shrink-0" />
        <div className="min-w-0">
          <h3 className="type-h2 text-plum-ink">{artistNamePlaceholder}</h3>
          <p className="mt-3 max-w-xl type-body-lg text-mauve">{aboutBiography}</p>
        </div>
      </Card>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section aria-labelledby="portfolio-title">
      <SectionHeading id="portfolio-title" title="Recent work">
        Photo placeholders only. No client names.
      </SectionHeading>
      <ul className="mt-5 grid min-w-0 grid-cols-3 gap-2 md:gap-4">
        {portfolioPlaceholders.map((photo) => (
          <li key={photo.label} className="min-w-0">
            <ArchPlaceholder
              label={photo.label}
              tone={photo.tone as ArchTone}
              className="aspect-[3/4] w-full"
            />
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <ComingSoonButton size="compact">Portfolio page coming soon</ComingSoonButton>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section aria-labelledby="services-title">
      <SectionHeading id="services-title" title="Services">
        These previews are not published, and online booking is not open. Prices and durations below
        are placeholders.
      </SectionHeading>
      <ul className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicePreviews.map((service) => (
          <li key={service.title} className="min-w-0">
            <Card className="flex h-full flex-col md:p-5">
              <h3 className="type-card-title text-plum-ink">{service.title}</h3>
              <p className="mt-3 type-body text-mauve">Description placeholder.</p>
              {service.pricing === "quote" ? (
                <p className="mt-4 type-body text-plum-ink">{quotePriceCopy}</p>
              ) : (
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-blush-tint px-3 py-2">
                    <dt className="type-micro text-mauve">Price placeholder</dt>
                    <dd className="mt-1 type-body font-semibold text-plum-ink">
                      {pricePlaceholder}
                    </dd>
                  </div>
                  <div className="rounded-md bg-blush-tint px-3 py-2">
                    <dt className="type-micro text-mauve">Duration placeholder</dt>
                    <dd className="mt-1 type-body font-semibold text-plum-ink">
                      {durationPlaceholder}
                    </dd>
                  </div>
                </dl>
              )}
              {service.pricing === "quote" ? (
                <p className="mt-3 type-small text-mauve">
                  Duration placeholder: {durationPlaceholder}
                </p>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
      <ComingSoonButton className="mt-5">{bookingComingSoonLabel}</ComingSoonButton>
    </section>
  );
}

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
    </>
  );
}
