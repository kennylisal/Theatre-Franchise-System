import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const spotlight = document.querySelector(`.${styles.spotlight}`);
      if (spotlight instanceof HTMLElement) {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY - 150}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.spotlight}></div>
      <div className={styles.container} role="alert">
        <h1>404 - Curtains Down!</h1>
        <p>
          Oops! The page you’re looking for has taken a bow and left the stage.
          It might be on intermission or never made it to the script.
        </p>
        <Link to="/" className={styles.btn}>
          Return to Main Stage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
