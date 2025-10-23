"use client";
import React from "react";
import SignUpComponent from "./SignUpComponent";
import NavbarSignUpComponent from "@/components/navbar/NavbarSignUpComponent";


const MainSignUpComponent = () => {
  return (
    <>
      <NavbarSignUpComponent/>
      <SignUpComponent />
    </>
  );
};

export default MainSignUpComponent;