"use client";

import React, { useEffect } from "react";

//called in the footer component

const CookiesPolicyModal = ({ isModalOpen, setIsModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("consent");
    if (!consent) {
      setIsModalOpen(true);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem("consent", true);
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="cookiesPolicyModal">
      <div>
        <h2 className="text-center font-bold mb-1 sm:text-lg">
          Cookies Policy
        </h2>
        <p className="text-sm sm:text-base">
          This website uses cookies to enhance your experience and provide
          essential functionality. By using our site, you agree to our use of
          cookies.
        </p>
      </div>
      <div>
        <h2 className="text-center font-bold mb-1 sm:text-lg">
          What are cookies?
        </h2>
        <p className="text-sm sm:text-base">
          Cookies are small text files stored on your device that help improve
          website functionality and personalize your experience.
        </p>
      </div>
      <div>
        <h2 className="text-center font-bold mb-1 sm:text-lg">
          How do we use cookies?
        </h2>
        <p className="text-sm sm:text-base">We use cookies to:</p>
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Keep you logged in.</li>
          <li>Remember your preferences.</li>
        </ul>
      </div>
      <div className="mx-auto">
        <button
          onClick={handleConsent}
          className="cursor-pointer sm:text-lg btn bg-indigo-400"
        >
          Agree
        </button>
      </div>
    </div>
  );
};

export default CookiesPolicyModal;
