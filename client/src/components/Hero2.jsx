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
    <section className="bg-gray-100 py-20 my-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Why JHP Coffee?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-bluee">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
