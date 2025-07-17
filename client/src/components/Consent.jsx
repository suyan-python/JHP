import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent = ({ cartItems = [], user = null }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const consent = Cookies.get("userConsent");

    if (!consent) {
      setShowBanner(true);
    } else if (consent === "true") {
      const visitCount = Cookies.get("visitCount");
      const userName = Cookies.get("userName");

      const welcomeMsg = userName
        ? `Welcome back, ${userName}!`
        : `Welcome back!`;

      setGreeting(welcomeMsg);
      setShowGreeting(true);

      // Hide greeting after 3 seconds
      const timer = setTimeout(() => setShowGreeting(false), 3000);
      return () => clearTimeout(timer); // Clean up
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("userConsent", "true", { expires: 365 });

    const currentVisit = Cookies.get("visitCount");
    const newVisit = currentVisit ? parseInt(currentVisit) + 1 : 1;
    Cookies.set("visitCount", newVisit, { expires: 365 });

    if (user?.name) {
      Cookies.set("userName", user.name, { expires: 30 });
    }

    if (cartItems.length > 0) {
      Cookies.set("savedCart", JSON.stringify(cartItems), { expires: 7 });
    }

    const welcomeMsg = user?.name ? `Welcome back, ${user.name}!` : `Welcome!`;

    setGreeting(welcomeMsg);
    setShowGreeting(true);
    setShowBanner(false);

    // Hide greeting after 3 seconds
    const timer = setTimeout(() => setShowGreeting(false), 3000);
    return () => clearTimeout(timer);
  };

  const declineCookies = () => {
    Cookies.set("userConsent", "false", { expires: 365 });
    setShowBanner(false);
  };

  return (
    <>
      {/* Greeting Toast */}
      {showGreeting && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 text-sm sm:text-base animate-fade-in">
          {greeting}
        </div>
      )}

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-8 bg-gray-800 text-white p-4 sm:p-5 rounded-xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 z-50 animate-fade-in">
          <div className="text-sm sm:text-base max-w-xl leading-relaxed">
            We use cookies to enhance your experience. By accepting, we’ll
            remember your preferences, cart items, and visits. Read our{" "}
            <a
              href="/privacy-policy"
              className="underline text-green-400 hover:text-green-300"
            >
              Privacy Policy
            </a>
            .
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 rounded-md text-sm sm:text-base font-medium bg-gray-600 hover:bg-gray-700 transition"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 rounded-md text-sm sm:text-base font-semibold bg-green-500 hover:bg-green-600 transition"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
