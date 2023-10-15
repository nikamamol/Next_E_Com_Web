import React, { Children } from "react";
import Navbar from './Navbar'
import Footer from './Footer'


function Layout({ Children }) {
  return (
    <div>
      <Navbar />
      {Children}
      <Footer />
    </div>
  );
}

export default Layout
