export function ExperienceVideo() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">From Farm to Cup</h2>
        <p className="mb-10 text-gray-300">
          Watch how our beans are carefully cultivated, harvested, and roasted
          with passion in the hills of Illam.
        </p>
        <div className="rounded-2xl overflow-hidden border-4 border-white max-w-4xl mx-auto">
          <video
            src="/videos/farm-to-cup.mp4" // Replace with your actual video path
            controls
            autoPlay
            muted
            loop
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
