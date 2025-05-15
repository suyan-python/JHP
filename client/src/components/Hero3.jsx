export function ExperienceVideo() {
  return (
    <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 my-36 rounded-[40px] sm:rounded-[50px] lg:rounded-[70px]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="header text-5xl sm:text-4xl font-bold mb-6">
          From Farm to Cup
        </h2>
        <p className="mb-10 text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Watch how our beans are carefully cultivated, harvested, and roasted
          with passion in the hills of Illam.
        </p>
        <div className="rounded-2xl overflow-hidden border-4 border-white max-w-4xl mx-auto aspect-video shadow-xl">
          <video
            src="/videos/farm-to-cup.mp4" // Replace with your actual video path
            controls
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
