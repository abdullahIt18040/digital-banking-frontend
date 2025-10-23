"use client";
import { useRouter } from "next/navigation";

import staticPath from "@/utils/staticPath";
import axios from "axios";
import constants from "@/utils/constants";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NavbarSignUpComponent: React.FC = () => {
  const [translateSignInButton, setTranslateSignInButton] = useState("Sign In");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);



  const goToSignInPage = () => {
    router.replace(staticPath.authSignIn);
  };

  return (
    <div className="w-full bg-white h-[98px] py-6 px-3 fixed top-0 z-99999 shadow-[0px_10px_10px_-10px_rgba(33,35,38,.2)] ">
      <div className="flex justify-between items-center max-w-[1370px] mx-auto px-[12px] ">
        <div className="w-full flex justify-between items-center mr-[5px] ">
          <div
  className={`flex flex-col items-center  ${
    isVisible ? "animate-dropBounce " : ""
  }  rounded-lg`}
>
  <Link href={staticPath.authSignIn}>
    <div className="flex  items-center cursor-pointer ">
      <Image
        src="/images/silimage/rbl_plc.png"
        alt="Logo"
        width={60}
        height={40}
        className="object-contain"
      />
      <div className=" mb-2  ml-1">Online Banking</div>
    </div>
  </Link>
</div>

          <div
            className={` bg-[#5332f5]  text-white lg:w-[150px] w-auto px-[17px] py-[12px] rounded-lg cursor-pointer hover:bg-[#462BD3] 
              transition-all duration-300 ease-out ${
                isVisible ? "animate-dropBounce" : ""
              }
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ position: "relative" }}
            suppressHydrationWarning={true}
            onClick={goToSignInPage}
          >
            <button className="w-full">SignIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSignUpComponent;