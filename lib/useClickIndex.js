import { useState, useEffect } from 'react';

export const useClickIndex = () => {
  const [isClickIndex, setIsClickIndex] = useState(false);
  const [isClickList, setIsClickList] = useState(false);

  const setToggle = (division) => {
    // 목차 클릭 시
    if (division === 'index') {
      setIsClickIndex(prev => !prev);
    }
    // 포스팅 리스트 클릭 시
    else if (division === 'list') {
      setIsClickList(prev => !prev);
    }
  }

  console.log("isClickIndex", isClickIndex);
  console.log("isClickList", isClickList);


  const toggleModal = (mode = "pc", division) => {
    if (mode === "pc") return;
    setToggle(division);
  }

  return { isClickIndex, isClickList, toggleModal };
}