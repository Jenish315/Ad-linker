import React, { useState } from "react";


import Header from "../component/Header";
import RegistrationPage from "../component/RegistrationPage";
import ContactPage from "../component/ContactPage";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header 
        onRegister={() => {
          setShowRegister(true);
          setShowContact(false); // Hide contact form when registration is clicked
        }} 
        onContact={() => {
          setShowContact(true);
          setShowRegister(false); // Hide registration form when contact is clicked
        }} 
      />

      {showRegister && <RegistrationPage />}
      {showContact && <ContactPage />}
    </div>
  );
}

export default App;
