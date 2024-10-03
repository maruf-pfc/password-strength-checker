"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [strength, setStrength] = useState("");

  const checkRequirements = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);

    setRequirements({ length, uppercase, number, specialChar });

    // Determine strength
    const fulfilledCriteria = [length, uppercase, number, specialChar].filter(
      Boolean
    ).length;
    if (fulfilledCriteria === 4) {
      setStrength("Strong");
    } else if (fulfilledCriteria === 3) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkRequirements(newPassword);
  };

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharset = "0123456789";
    const specialCharset = "!@#$%^&*()_+~";

    let newPassword = "";
    newPassword +=
      uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
    newPassword +=
      numberCharset[Math.floor(Math.random() * numberCharset.length)];
    newPassword +=
      specialCharset[Math.floor(Math.random() * specialCharset.length)];

    for (let i = 3; i < length; i++) {
      const randomCharset = Math.floor(Math.random() * 4);
      if (randomCharset === 0) {
        newPassword += charset[Math.floor(Math.random() * charset.length)];
      } else if (randomCharset === 1) {
        newPassword +=
          uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
      } else if (randomCharset === 2) {
        newPassword +=
          numberCharset[Math.floor(Math.random() * numberCharset.length)];
      } else {
        newPassword +=
          specialCharset[Math.floor(Math.random() * specialCharset.length)];
      }
    }

    newPassword = newPassword
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
    setPassword(newPassword);
    checkRequirements(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        toast("Password copied to clipboard", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          style: { backgroundColor: "green", color: "white" },
        });
      },
      () => {
        toast.error("Failed to copy password.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          style: { backgroundColor: "#ff4d4d", color: "white" },
        });
      }
    );
  };

  return (
    <div className="password-checker">
      <input
        type="text"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <div className="requirements">
        <p className={requirements.length ? "met" : "unmet"}>
          {requirements.length ? "✔" : "✖"} At least 8 characters
        </p>
        <p className={requirements.uppercase ? "met" : "unmet"}>
          {requirements.uppercase ? "✔" : "✖"} At least one uppercase letter
        </p>
        <p className={requirements.number ? "met" : "unmet"}>
          {requirements.number ? "✔" : "✖"} At least one number
        </p>
        <p className={requirements.specialChar ? "met" : "unmet"}>
          {requirements.specialChar ? "✔" : "✖"} At least one special character
        </p>
      </div>
      {password && (
        <div className={`strength ${strength.toLowerCase()}`}>
          Strength: {strength}
        </div>
      )}
      <div className="buttons">
        <button onClick={generatePassword}>Generate Password</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordStrengthChecker;
