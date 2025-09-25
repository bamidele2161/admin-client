import React, { type ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./PopUp.css";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";

interface PopUpProps {
  id: string | number;
  className?: string;
  children: ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ id, children, className }) => {
  const show = useSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (popupRef.current === e.target) {
        handleShow(id);
      }
    };

    const closeOnEscBtn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show[id]) {
        handleShow(id);
      }
    };

    if (show[id]) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", closeOnEscBtn);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", closeOnEscBtn);
      document.body.style.overflow = "auto";
    };
  }, [id, handleShow]);

  return (
    <>
      {show[id] && (
        <div className={`${className}  popUp_container`} ref={popupRef}>
          {children}
        </div>
      )}
    </>
  );
};

export default PopUp;
