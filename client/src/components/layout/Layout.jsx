import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
