import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import axios from "axios";
import constants from "@/utils/constants";
import { useRouter } from "next/navigation";
import MainSignInCompopnent from "@/components/auth/signin/MainSignInCompopnent";
// import LoaderFullScreenMiddle from "@/components/EventBy/Loaders/LoaderFullScreenMiddle";
export const metadata: Metadata = {
  title: "Sign In",
  description: "This is Signin page",
  // other metadata
};

const SignIn: React.FC = () => {
  

  return (
    <>
<h1 className="">this si sig n  in compone nt </h1>
      <MainSignInCompopnent/>
    </>
  );
};

export default SignIn;