import Header from "@/app/component/Header/Header";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default layout;
