"use client";
import React from "react";
import SignInComponent from "./SignInComponent";
import NavbarSignInComponent from "../../navbar/NavbarSignInComponent";

const MainSignInComponent = () => {
  return (
    <>
      <NavbarSignInComponent />
      <div className="bg-[#F4F4F6] flex justify-center items-center animate-bounceLeftToRight">
        <SignInComponent />
      </div>
    </>
  );
};

export default MainSignInComponent;