import React from "react";
import Header from "./Header.jsx";

const Layouts = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
};

export default Layouts;
