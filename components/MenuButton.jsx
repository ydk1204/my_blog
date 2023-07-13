import { useState, useEffect, useContext } from "react";
import MobileToc from "../components/MobileToc";
import { ModalContext } from "../pages/_app";

const MenuBtn = ({ ability }) => {
  const { isClickIndex, toggleModal } = useContext(ModalContext);
  const { props } = ability;
  // const [isClick, setIsClick] = useState(isClickIndex);

  const toggleBtn = () => {
    toggleModal("mobile", "index");
  };

  useEffect(() => {
    if (isClickIndex) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isClickIndex]);

  return (
    // 전달받은 데이터 별로 기능을 다르게
    <>
      {isClickIndex && (
        <div
          onClick={toggleBtn}
          className="fixed top-0 left-0 backdrop-blur-sm bg-black/20 w-screen h-screen"
        ></div>
      )}
      <div className="flex xl:invisible fixed w-full justify-end items-center text-white bottom-10 right-10">
        <button onClick={toggleBtn}>버튼</button>
        {isClickIndex && (
          <div className="flex w-full justify-center items-center">
            <MobileToc post={props.post} />
          </div>
        )}
      </div>
    </>
  );
};

export default MenuBtn;
