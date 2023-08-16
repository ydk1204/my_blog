"use client";

import { useState } from "react";

export const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="duration-100 hover:text-white/80"
    >
      {isCopied ? "복사완료!" : "복사"}
    </button>
  );
};
