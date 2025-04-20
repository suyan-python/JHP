export function BrewGuide() {
  const methods = [
    {
      method: "Pour Over",
      tip: "Perfect for highlighting the subtle notes in our Arabica beans.",
      icon: "🫗",
    },
    {
      method: "French Press",
      tip: "Rich and bold—brings out the full body of the coffee.",
      icon: "🪑",
    },
    {
      method: "Espresso",
      tip: "For a punchy start to your day. Works great with JHP dark roast.",
      icon: "☕",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Brew Your Way</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {methods.map((m, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl shadow hover:shadow-md"
            >
              <div className="text-4xl mb-4">{m.icon}</div>
              <h3 className="text-xl font-semibold text-bluee">{m.method}</h3>
              <p className="text-sm text-gray-600 mt-2">{m.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
