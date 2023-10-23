import { useState, useEffect } from 'react';

export const useClickIndex = () => {
  const [isClickIndex, setIsClickIndex] = useState(false);

  const setToggle = () => {
    // 목차 클릭 시
    setIsClickIndex(prev => !prev);
  }

  const toggleModal = (mode = "pc") => {
    if (mode === "pc") return;
    setToggle();
  }

  return { isClickIndex, toggleModal };
}