import React, { useState, useEffect } from "react";

const Header = () => {
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  }, [lightMode]);

  const toggleTheme = () => {
    setLightMode((prev) => !prev);
  };

  return (
    <header>
      <div>
        <h1>Where in the world?</h1>
      </div>
      <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
        <i className={`fas ${lightMode ? "fa-sun" : "fa-moon"}`}></i>
        {lightMode ? " Light Mode" : " Dark Mode"}
      </div>
    </header>
  );
};

export default Header;
