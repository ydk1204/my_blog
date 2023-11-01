import { useState, useEffect } from 'react';

export const useClickIndex = () => {
  const [isClickIndex, setIsClickIndex] = useState(false);

  const setToggle = () => {
    setIsClickIndex(prev => !prev);
  }

  const toggleModal = (mode = "pc") => {
    if (mode === "pc") return;
    setToggle();
  }

  return { isClickIndex, toggleModal };
}