import React from "react";
import { generateHash } from "../utils/hash"; // Make sure hash.js exists in utils/

const VerifyButton = ({ transaction }) => {
  const handleVerify = () => {
    const { from, to, amount, timestamp, hash } = transaction;
    const generatedHash = generateHash({ from, to, amount, timestamp });

    if (generatedHash === hash) {
      alert("✅ Transaction Verified: Data is authentic");
    } else {
      alert("❌ Transaction Tampered: Data mismatch detected");
    }
  };

  return (
    <button
      onClick={handleVerify}
      style={{
        marginLeft: "10px",
        padding: "4px 8px",
        cursor: "pointer",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Verify
    </button>
  );
};

export default VerifyButton;