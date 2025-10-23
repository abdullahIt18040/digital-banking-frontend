import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import MainSignUpComponent from "@/components/auth/signup/MainSignUpCompontent";
export const metadata: Metadata = {
  title: "Sign Up",
  description: "This is Signup page",
  // other metadata
};

const SignUp: React.FC = () => {


  return (
    <>
     <MainSignUpComponent/>
      <h2 className="bg-primary">this is sign up page </h2>
    </>
  );
};

export default SignUp;