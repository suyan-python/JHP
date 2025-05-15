import { FaLeaf, FaHandsHelping, FaMountain, FaRecycle } from "react-icons/fa";

export function WhyJHP() {
  const features = [
    {
      title: "100% Organic Arabica",
      desc: "Grown without chemicals, delivering rich flavor and aroma in every cup.",
      icon: <FaLeaf className="text-green-600" />,
    },
    {
      title: "Farmers First",
      desc: "Empowering women and small farmers with ethical wages and training.",
      icon: <FaHandsHelping className="text-yellow-700" />,
    },
    {
      title: "From Illam, With Love",
      desc: "Hand-harvested beans from Nepal’s finest coffee-growing region.",
      icon: <FaMountain className="text-brown-600" />,
    },
    {
      title: "Eco-Friendly Packaging",
      desc: "We care about the planet as much as we care about your coffee.",
      icon: <FaRecycle className="text-green-700" />,
    },
  ];

  return (
    <section className="bg-[#f7f3ed] py-16 px-4 sm:px-6 rounded-[40px] sm:rounded-[50px] lg:rounded-[70px] shadow-inner my-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="header text-5xl sm:text-4xl font-bold mb-16 text-[#5B3A29]">
          Why JHP Coffee?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="header text-xl font-bold mb-2 text-[#4B2E20]">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
