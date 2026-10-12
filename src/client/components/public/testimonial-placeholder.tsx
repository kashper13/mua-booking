export function TestimonialPlaceholder() {
  return (
    <section
      aria-labelledby="testimonial-placeholder-title"
      className="overflow-hidden rounded-lg bg-rosewood px-5 py-6 text-white md:px-8 md:py-8"
    >
      <div aria-hidden="true" className="mb-5 h-16 w-24 rounded-arch bg-white/15" />
      <p className="type-eyebrow text-white">Design placeholder</p>
      <h2 id="testimonial-placeholder-title" className="type-h2 mt-2 text-white">
        Testimonials
      </h2>
      <p className="mt-3 max-w-2xl type-body-lg text-white">
        No approved customer reviews yet. This sample layout is shown in development only.
      </p>
    </section>
  );
}
