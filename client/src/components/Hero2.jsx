export function WhyJHP() {
  const features = [
    {
      title: "100% Organic Arabica",
      desc: "Grown without chemicals, delivering rich flavor and aroma in every cup.",
      icon: "🌱",
    },
    {
      title: "Farmers First",
      desc: "Empowering women and small farmers with ethical wages and training.",
      icon: "👩‍🌾",
    },
    {
      title: "From Illam, With Love",
      desc: "Hand-harvested beans from Nepal’s finest coffee-growing region.",
      icon: "⛰️",
    },
    {
      title: "Eco-Friendly Packaging",
      desc: "We care about the planet as much as we care about your coffee.",
      icon: "♻️",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 sm:py-20 my-36 px-4 sm:px-6 rounded-[40px] sm:rounded-[50px] lg:rounded-[70px]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800">
          Why JHP Coffee?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-bluee">
                {f.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
