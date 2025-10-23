"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import constants from "@/utils/constants";
import { useRouter } from "next/navigation"

import axios from "axios";
import Swal from "sweetalert2";
import LoaderFullScreenMiddle from "../../loders/loader/LoaderFullScreenMiddle";

import staticPath from "@/utils/staticPath";


import alertMessages from "@/utils/alertMessages";

import LoaderFullScreen from "../../loders/loader/LoaderFullScreen";

const PasswordChecklist = dynamic(() => import("react-password-checklist"), {
  ssr: false,
});

const SignUpComponent: React.FC = () => {
  
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [password, setPassword] = useState("");
  const [isTermsAndCondition, setIsTermsAndCondition] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCondition, setErrorCondition] = useState("");
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEventId, setRegisteredEventId] = useState("");

  const nameAlphabetWithSpaceAndPeriodPattern =
    constants.namePatternCheckEventBy;
  const passwordPattern = constants.passwordPatternCheckEventBy;
  const emailPattern = constants.emailPatternCheckEventBy;

  useEffect(() => {
    localStorage.removeItem(
      constants.localStorageCustomNameEventBy + "selected_page"
    );
  }, []);

  const handleChangeFirstName = (e: any) => {
    const trimmedValue = e.target.value.trim(); // Trim whitespace from the input
    setFirstName(e.target.value);
    if (trimmedValue.length === 0) {
      setErrorFirstName("This is required.");
      return;
    } else if (e.target.value.length < 1 || e.target.value === "") {
      setErrorFirstName("This is required.");
      return;
    } else if (
      e.target.value.length > 0 &&
      !nameAlphabetWithSpaceAndPeriodPattern.test(e.target.value)
    ) {
      setErrorFirstName("Only letters are allowed");

      setFirstName(e.target.value.replace(/[^a-zA-Z  ,.'-]/g, ""));
      return;
    } else {
      setErrorFirstName("");
    }
    // Clear any previous errors
    setErrorFirstName("");
  };
  const navigateToDasBoardOrSetup = (isProfileCompleted: any) => {
    // console.log(isProfileCompleted);
    const tempRegisteredEventId = localStorage.getItem(
      "temp_event_id_" + "registered_eventId" || ""
    );
    if (tempRegisteredEventId) {
      setRegisteredEventId(tempRegisteredEventId);
    }
    // 👇️ navigate to /
    if (isProfileCompleted === "not completed") {
      router.replace(staticPath.userSetup);
    } else if (
      isProfileCompleted === "completed" ||
      isProfileCompleted === "working"
    ) {
      if (tempRegisteredEventId) {
        router.replace(`/public/events/single/${tempRegisteredEventId}`);
      } else {
        router.replace(staticPath.authSignIn);
      }
    }
  };

  const handleChangeLastName = (e: any) => {
    setLastName(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorLastName("This is required.");
      return;
    } else if (
      e.target.value.length > 0 &&
      !nameAlphabetWithSpaceAndPeriodPattern.test(e.target.value)
    ) {
      setErrorLastName("Only letters are allowed");
      setLastName(e.target.value.replace(/[^a-zA-Z  ,.'-]/g, ""));
      return;
    } else {
      setErrorLastName("");
    }
    // Clear any previous errors
    setErrorLastName("");
  };

  const handleEmail = async (e: any) => {
    setEmail(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorEmail("This is required.");
      return;
    } else if (
      e.target.value.length > 0 &&
      !emailPattern.test(e.target.value)
    ) {
      setErrorEmail("Please enter a valid email");

      setEmail(e.target.value.replace(/[\u0980-\u09FF]/g, ""));
      return;
    } else {
      setErrorEmail("");
    }
    // Clear any previous errors
    setErrorEmail("");
  };

  const handleChangePasswordShowHide = () => {
    setIsPasswordHide(!isPasswordHide);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorPassword("This is required.");
      return;
    } else if (
      e.target.value.length > 0 &&
      !passwordPattern.test(e.target.value)
    ) {
      // setErrorPassword(
      //   "Please use 8 or more characters with a mix of letters, numbers & symbols"
      // );
      setErrorPassword("");
      setPassword(e.target.value.replace(/[\u0980-\u09FF]/g, ""));
      return;
    } else {
      setErrorPassword("");
    }
    // Clear any previous errors
    // setErrorPassword("");
  };

  const handleSubmit = (e: any) => {
    let temp_first_name = firstName;
    let temp_last_name = lastName;
    let temp_email = email;
    let temp_password = password;

    setIsFirstNameEmpty(true);
    setIsLastNameEmpty(true);
    setIsEmailEmpty(true);
    setIsPasswordEmpty(true);
    if (
      temp_first_name.length < 1 &&
      temp_last_name.length < 1 &&
      temp_email.length < 1 &&
      temp_password.length < 1 &&
      isTermsAndCondition === false
    ) {
      setErrorFirstName("This is required.");
      setErrorLastName("This is required.");
      setErrorEmail("This is required.");
      setErrorPassword("This is required.");
      setErrorCondition("This is required.");
      document.getElementById("firstName")?.focus();
    } else if (temp_first_name.trim().length < 1 || temp_first_name === "") {
      setErrorFirstName("This is required.");
      document.getElementById("firstName")?.focus();
    } else if (
      temp_first_name.length > 0 &&
      !nameAlphabetWithSpaceAndPeriodPattern.test(temp_first_name)
    ) {
      setErrorFirstName("Only letters are allowed");
      document.getElementById("firstName")?.focus();
    } else if (temp_last_name.trim().length < 1 || temp_last_name === "") {
      setErrorLastName("This is required.");
      document.getElementById("lastName")?.focus();
    } else if (
      temp_last_name.length > 0 &&
      !nameAlphabetWithSpaceAndPeriodPattern.test(temp_last_name)
    ) {
      setErrorLastName("Only letters are allowed");
      document.getElementById("lastName")?.focus();
    } else if (temp_email.length < 1 || temp_email === "") {
      setErrorEmail("This is required.");
      document.getElementById("email")?.focus();
    } else if (temp_email.length > 0 && !emailPattern.test(temp_email)) {
      setErrorEmail("Please enter a valid email");
      document.getElementById("email")?.focus();
    } else if (temp_password.length < 1 || temp_password === "") {
      setErrorPassword("This is required.");
      document.getElementById("password")?.focus();
    } else if (
      temp_password.length > 0 &&
      !passwordPattern.test(temp_password)
    ) {
      setErrorPassword(
        "Please use 8 or more characters with a mix of letters, numbers & symbols"
      );
      document.getElementById("password")?.focus();
    } else if (isTermsAndCondition === false) {
      setErrorCondition("This is required.");
    } else {
      setErrorFirstName("");
      setIsFirstNameEmpty(false);
      setErrorLastName("");
      setIsLastNameEmpty(false);
      setErrorEmail("");
      setIsEmailEmpty(false);
      setErrorPassword("");
      setIsPasswordEmpty(false);
      if (typeof window !== "undefined") {
        const keyToKeep = localStorage.getItem(
          constants.localStorageCustomNameEventBy + "default_language_id"
        );
        const keyToKeepRememberMeEmail = localStorage.getItem(
          constants.localStorageCustomNameEventBy + "remember_me_email"
        );
        const keyToKeepRememberMePassword = localStorage.getItem(
          constants.localStorageCustomNameEventBy + "remember_me_password"
        );
        // localStorage.clear();
        localStorage.removeItem(constants.localStorageCustomNameEventBy);
        if (keyToKeep) {
          localStorage.setItem(
            constants.localStorageCustomNameEventBy + "default_language_id",
            keyToKeep
          );
        }
        if (keyToKeepRememberMeEmail) {
          localStorage.setItem(
            constants.localStorageCustomNameEventBy + "remember_me_email",
            keyToKeepRememberMeEmail
          );
        }
        if (keyToKeepRememberMePassword) {
          localStorage.setItem(
            constants.localStorageCustomNameEventBy + "remember_me_password",
            keyToKeepRememberMePassword
          );
        }
      }

      localStorage.setItem("temp_email", email);

      const signUpData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      // console.log("sign up checking", signUpData);
      // return;
      localStorage.setItem("signUpData", JSON.stringify(signUpData));
      // console.log("signUpData " + JSON.stringify(signUpData));
      setIsLoading(true);
      // return;
      axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_SERVER + constants.api.signUp,
        data: signUpData,
      })
        .then(function (response) {
           console.log("data submit............................123.......", response);
          if (response.data.status === "OK" ) {
            // console.log("Signup " + JSON.stringify(response.data));
    setIsLoading(false);
            Swal.fire({
              icon: "success",
              title: "Success !",
              text: "User Sign Up Successfully  .",
            });
            // localStorage.setItem(
            //   constants.localStorageCustomNameEventBy + "_verificationEmail",
            //   email
            // );

            // localStorage.setItem(
            //   constants.localStorageCustomNameEventBy + "_verificationPassword",
            //   password
            // );

            // sendVerificationEmail(email);
          }  else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: response.data.message,
            });
          }
        })
        .catch(function (error) {
           Swal.fire({
                          icon: "error",
                          title: "Error!",
                          text: alertMessages.EMAIL_ALREADY_EXISTS,
                        });
          setIsLoading(false);
          return error;
        });
    }
  };

  const sendVerificationEmail = (email: string) => {
    // setIsLoading(true);

    // axios({
    //   method: "post",
    //   url:
    //     process.env.NEXT_PUBLIC_BACKEND_SERVER +
    //     constants.api.sendVerificationCode,
    //   headers: {},
    //   data: {
    //     email: email,
    //   },
    // })
    //   .then(function (response) {
    //     // console.log("sagor", response);

    //     if (response.status === 200) {
    //       navigateToVerification();
    //     } else {
    //       setIsLoading(false);
    //       Swal.fire({
    //         icon: "error",
    //         title: "Error!",
    //         text: response.data.message,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     setIsLoading(false);
    //     return error;
    //   });
  };

  const navigateToVerification = () => {
    router.push(staticPath.authSignUpVerification);
  };
  const navigateToSignIn = () => {
    // 👇️ navigate to /
    router.replace(staticPath.authSignIn);
  };

  //---------

  //-----------------------------

  //----------------
  const handleChangeTerms = () => {
    window.open("https://eventby.xyz/privacy-policy/", "_blank");
  };
  const handleChangePrivacyPolicy = () => {
    window.open("https://eventby.xyz/privacy-policy/", "_blank");
  };
  //------------------------------------
  return (
    <>
      {isLoading ? (
        <>
          <LoaderFullScreenMiddle />
        </>
      ) : (
        <div className="w-full bg bg-[#F4F4F6] sm:px-[80px] md:p[80px] lg:px-[80px] lg:py-[60px] xl:py-0 xl:p-20 lg:p-25 flex justify-center items-center animate-bounceRightToLeft">
          <div className=" w-[1370px] sm:w-[558px] md:w-[600px] lg:w-[900px] xl:w-[1084px] 2xl:w-[1370px] 3xl:w-[1370px] bg-white sm:px-[45px] sm:py-[80px] mt-[100px] sm:mt-[140px] sm:mx-20 md:mt-[180px] md:mb-20 lg:mb-0 md:mx-20  py-[50px] px-20   md:p-[45px] lg:p-[55px]  xl:p-[96px]  sm:rounded-[10px]  sm:m-10  md:pr-10  lg:mt-25 xl:mt-48 xl:mb-20 lg:mx-0 2xl:mb-20  lg:justify-start lg:items-start flex flex-col justify-center items-center xl:mx-0 2xl:mx-[20px] ">
            <>
              <div className=" text-black text-[35.05px] md:text-[] font-bold font-poppins flex justify-center lg:justify-start items-center ">
               Sign Up 
              </div>
              <div className="flex justify-between items-start md:gap-[0px] gap-[60px] mt-[50px] ">
                <div className="flex-col justify-between items-center sm:pl-[55px] lg:pl-0 ">
                  <div className=" xl:flex gap-[30px]">
                    <div>
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px] ml-15 sm:ml-0">
                       First Name*
                      </div>

                      <div className="relative group ml-15 sm:ml-0 ">
                        <span className="absolute top-5 left-5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-slate_400 group-focus-within:text-[#2DC774]"
                            fill="none"
                          >
                            <g id="user-line 1" clipPath="url(#clip0_209_130)">
                              <path
                                id="Vector"
                                d="M3.33594 18.3334C3.33594 16.5653 4.03832 14.8696 5.28856 13.6193C6.5388 12.3691 8.23449 11.6667 10.0026 11.6667C11.7707 11.6667 13.4664 12.3691 14.7166 13.6193C15.9669 14.8696 16.6693 16.5653 16.6693 18.3334H15.0026C15.0026 17.0073 14.4758 15.7355 13.5381 14.7978C12.6005 13.8602 11.3287 13.3334 10.0026 13.3334C8.67652 13.3334 7.40475 13.8602 6.46707 14.7978C5.52939 15.7355 5.0026 17.0073 5.0026 18.3334H3.33594ZM10.0026 10.8334C7.2401 10.8334 5.0026 8.59587 5.0026 5.83337C5.0026 3.07087 7.2401 0.833374 10.0026 0.833374C12.7651 0.833374 15.0026 3.07087 15.0026 5.83337C15.0026 8.59587 12.7651 10.8334 10.0026 10.8334ZM10.0026 9.16671C11.8443 9.16671 13.3359 7.67504 13.3359 5.83337C13.3359 3.99171 11.8443 2.50004 10.0026 2.50004C8.16094 2.50004 6.66927 3.99171 6.66927 5.83337C6.66927 7.67504 8.16094 9.16671 10.0026 9.16671Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_209_130">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <input
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                          className="w-[350px] sm:w-[470px] lg:w-[350px] xl:w-[221px] h-[60px] rounded-[10px] border border-slate_200 bg-white font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-5 pl-15 "
                          onChange={(e) => handleChangeFirstName(e)}
                          value={firstName}
                          maxLength={100}
                          autoComplete="off"
                        />
                      </div>
                      {isFirstNameEmpty && errorFirstName && (
                        <div className="text-[#ef4444] text-base font-semibold ml-15 sm:ml-0">
                          {errorFirstName}
                        </div>
                      )}
                    </div>
                    <div className="mt-[30px] xl:mt-0">
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px] ml-15 sm:ml-0">
                        LastName*
                      </div>

                      <div className="relative group ml-15 sm:ml-0">
                        <span className="absolute top-5 left-5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-slate_400 group-focus-within:text-[#2DC774]"
                            fill="none"
                          >
                            <g id="user-line 1"  clipPath="url(#clip0_209_130)">
                              <path
                                id="Vector"
                                d="M3.33594 18.3334C3.33594 16.5653 4.03832 14.8696 5.28856 13.6193C6.5388 12.3691 8.23449 11.6667 10.0026 11.6667C11.7707 11.6667 13.4664 12.3691 14.7166 13.6193C15.9669 14.8696 16.6693 16.5653 16.6693 18.3334H15.0026C15.0026 17.0073 14.4758 15.7355 13.5381 14.7978C12.6005 13.8602 11.3287 13.3334 10.0026 13.3334C8.67652 13.3334 7.40475 13.8602 6.46707 14.7978C5.52939 15.7355 5.0026 17.0073 5.0026 18.3334H3.33594ZM10.0026 10.8334C7.2401 10.8334 5.0026 8.59587 5.0026 5.83337C5.0026 3.07087 7.2401 0.833374 10.0026 0.833374C12.7651 0.833374 15.0026 3.07087 15.0026 5.83337C15.0026 8.59587 12.7651 10.8334 10.0026 10.8334ZM10.0026 9.16671C11.8443 9.16671 13.3359 7.67504 13.3359 5.83337C13.3359 3.99171 11.8443 2.50004 10.0026 2.50004C8.16094 2.50004 6.66927 3.99171 6.66927 5.83337C6.66927 7.67504 8.16094 9.16671 10.0026 9.16671Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_209_130">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <input
                          id="lastName"
                          type="text"
                          placeholder="last Name"
                          className="w-[350px] sm:w-[470px] lg:w-[350px] xl:w-[221px] h-[60px] rounded-[10px] border border-slate_200 bg-white font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-5 pl-15"
                          onChange={(e) => handleChangeLastName(e)}
                          value={lastName}
                          maxLength={100}
                          autoComplete="off"
                        />
                      </div>
                      {isLastNameEmpty && errorLastName && (
                        <div className="text-[#ef4444] text-base font-semibold ml-15 sm:ml-0">
                          {errorLastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <div>
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px] ml-15 sm:ml-0">
                        Email*
                      </div>

                      <div className="relative group ml-15 sm:ml-0">
                        <span className="absolute top-5 left-5">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-slate_400 group-focus-within:text-[#2DC774]"
                            fill="none"
                          >
                            <g id="Email" clipPath="url(#clip0_209_123)">
                              <path
                                id="Vector"
                                d="M2.4974 2.25H17.4974C17.7184 2.25 17.9304 2.32902 18.0867 2.46967C18.2429 2.61032 18.3307 2.80109 18.3307 3V15C18.3307 15.1989 18.2429 15.3897 18.0867 15.5303C17.9304 15.671 17.7184 15.75 17.4974 15.75H2.4974C2.27638 15.75 2.06442 15.671 1.90814 15.5303C1.75186 15.3897 1.66406 15.1989 1.66406 15V3C1.66406 2.80109 1.75186 2.61032 1.90814 2.46967C2.06442 2.32902 2.27638 2.25 2.4974 2.25ZM16.6641 5.4285L10.0574 10.7535L3.33073 5.412V14.25H16.6641V5.4285ZM3.75656 3.75L10.0482 8.7465L16.2491 3.75H3.75656Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_209_123">
                                <rect width="20" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <input
                          id="email"
                          type="email"
                          placeholder="Enter Email"
                          className="w-[350px] sm:w-[470px] lg:w-[350px] xl:w-[470px] h-[60px] rounded-[10px] border border-slate_200 bg-white font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-5 pl-15"
                          onChange={(e) => handleEmail(e)}
                          value={email}
                          maxLength={100}
                          autoComplete="off"
                        />
                      </div>
                      {isEmailEmpty && errorEmail && (
                        <div className="text-[#ef4444] text-base font-semibold ml-15 sm:ml-0">
                          {errorEmail}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <div className="w-[470px] lg:w-[350px] xl:w-[470px]">
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px] ml-15 sm:ml-0">
                        Password *
                      </div>

                      <div className="relative group w-[350px] sm:w-full ml-15 sm:ml-0">
                        <span className="absolute top-5 left-5">
                          {" "}
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-slate_400 group-focus-within:text-[#2DC774]"
                            fill="none"
                          >
                            <g id="Frame" clipPath="url(#clip0_209_116)">
                              <path
                                id="Vector"
                                d="M14.25 7.5H15C15.1989 7.5 15.3897 7.57902 15.5303 7.71967C15.671 7.86032 15.75 8.05109 15.75 8.25V15.75C15.75 15.9489 15.671 16.1397 15.5303 16.2803C15.3897 16.421 15.1989 16.5 15 16.5H3C2.80109 16.5 2.61032 16.421 2.46967 16.2803C2.32902 16.1397 2.25 15.9489 2.25 15.75V8.25C2.25 8.05109 2.32902 7.86032 2.46967 7.71967C2.61032 7.57902 2.80109 7.5 3 7.5H3.75V6.75C3.75 6.06056 3.8858 5.37787 4.14963 4.74091C4.41347 4.10395 4.80018 3.5252 5.28769 3.03769C5.7752 2.55018 6.35395 2.16347 6.99091 1.89963C7.62787 1.6358 8.31056 1.5 9 1.5C9.68944 1.5 10.3721 1.6358 11.0091 1.89963C11.646 2.16347 12.2248 2.55018 12.7123 3.03769C13.1998 3.5252 13.5865 4.10395 13.8504 4.74091C14.1142 5.37787 14.25 6.06056 14.25 6.75V7.5ZM3.75 9V15H14.25V9H3.75ZM8.25 10.5H9.75V13.5H8.25V10.5ZM12.75 7.5V6.75C12.75 5.75544 12.3549 4.80161 11.6517 4.09835C10.9484 3.39509 9.99456 3 9 3C8.00544 3 7.05161 3.39509 6.34835 4.09835C5.64509 4.80161 5.25 5.75544 5.25 6.75V7.5H12.75Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_209_116">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <input
                          id="password"
                          type={isPasswordHide ? "password" : "text"}
                          placeholder="Enter Password "
                          value={password}
                          className="w-[350px] sm:w-[470px] lg:w-[350px] xl:w-[470px] bg-white h-[60px] rounded-[10px] border border-slate_200  font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-15 pl-15"
                          onChange={(e) => onChangePassword(e)}
                          autoComplete="off"
                          maxLength={25}
                        />

                        <span
                          className="absolute right-5 top-5"
                          onClick={() => handleChangePasswordShowHide()}
                        >
                          {isPasswordHide ? (
                            <>
                              <svg
                                width="21"
                                height="18"
                                viewBox="0 0 21 19"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-slate_400 group-focus-within:text-[#2DC774] cursor-pointer"
                                fill="none"
                              >
                                <g id="Frame" clipPath="url(#clip0_209_113)">
                                  <path
                                    id="Vector"
                                    d="M15.3346 14.4727C13.8423 15.3094 12.111 15.7525 10.3438 15.75C5.76879 15.75 1.96249 12.84 1.16406 8.99999C1.52894 7.25303 2.52302 5.65716 3.998 4.45049L1.34309 2.10599L2.5437 1.04474L19.3429 15.8947L18.1423 16.9552L15.3338 14.4727H15.3346ZM5.19776 5.51249C4.04467 6.43918 3.24142 7.65658 2.89667 8.99999C3.16165 10.0248 3.69362 10.9808 4.45025 11.7919C5.20688 12.603 6.16726 13.2468 7.25496 13.672C8.34265 14.0972 9.52762 14.292 10.7155 14.2411C11.9035 14.1901 13.0615 13.8948 14.0975 13.3785L12.3768 11.8575C11.6443 12.2654 10.7767 12.4411 9.91639 12.3558C9.05606 12.2706 8.25404 11.9294 7.64188 11.3883C7.02973 10.8472 6.64377 10.1383 6.54733 9.37781C6.45089 8.61734 6.64968 7.85047 7.1111 7.20299L5.19776 5.51249ZM11.1193 10.746L8.36855 8.31449C8.21758 8.65419 8.18204 9.02545 8.26631 9.38275C8.35058 9.74004 8.55099 10.0678 8.84295 10.3259C9.13492 10.584 9.50575 10.7611 9.90996 10.8356C10.3142 10.9101 10.7342 10.8787 11.1185 10.7452L11.1193 10.746ZM17.8164 12.444L16.6023 11.3715C17.1694 10.657 17.5732 9.85138 17.791 8.99999C17.5604 8.10728 17.1268 7.26535 16.5167 6.52536C15.9065 5.78537 15.1325 5.16278 14.2417 4.69544C13.3508 4.2281 12.3618 3.92576 11.3346 3.80681C10.3075 3.68786 9.26371 3.75477 8.26673 4.00349L6.92782 2.81999C7.98588 2.45249 9.13898 2.24999 10.3438 2.24999C14.9189 2.24999 18.7252 5.15999 19.5236 8.99999C19.2636 10.2493 18.6792 11.4282 17.8164 12.444ZM10.1088 5.63099C10.6489 5.60149 11.1899 5.67379 11.6959 5.8431C12.202 6.01241 12.6616 6.27487 13.0442 6.61308C13.4268 6.95128 13.7237 7.35751 13.9153 7.80483C14.1068 8.25215 14.1886 8.73036 14.1552 9.20774L10.1079 5.63099H10.1088Z"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_209_113">
                                    <rect
                                      width="20.3636"
                                      height="18"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                width="21"
                                height="18"
                                viewBox="0 0 21 22"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current text-slate_400 group-focus-within:text-[#2DC774] cursor-pointer"
                                fill="none"
                              >
                                <g id="Style=Outlined">
                                  <path
                                    id="Vector"
                                    d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.8 17.5 12 17.5C8.2 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z"
                                  />
                                </g>
                              </svg>
                            </>
                          )}
                        </span>
                      </div>
                      {password.length > 0 ? (
                        <>
                          <div className="password_error_div my-2 ml-[56px] sm:ml-0  ">
                            <PasswordChecklist
                              rules={[
                                "capital",
                                "lowercase",
                                "number",
                                "specialChar",
                                "minLength",
                                "maxLength",
                              ]}
                              minLength={8}
                              maxLength={25}
                              value={password}
                              onChange={(isValid) => {}}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {isPasswordEmpty && errorPassword && (
                      <div className="text-[#ef4444] text-base font-semibold ml-15 sm:ml-0">
                        {errorPassword}
                      </div>
                    )}
                  </div>

                  <div className="mt-[32px] ">
                    <div>
                      <label
                        htmlFor="isTermsAndCondition"
                        className="w-[75%] sm:w-[55%] lg:w-[75%] xl:w-[55%] flex  select-none items-center text-sm font-medium font-['DM Sans'] leading-tight"
                      >
                        <div className="relative ml-15 sm:ml-0 ">
                          <input
                            type="checkbox"
                            id="isTermsAndCondition"
                            checked={isTermsAndCondition}
                            className="sr-only"
                            onChange={() => {
                              setIsTermsAndCondition(!isTermsAndCondition);
                            }}
                          />
                          <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center cursor-pointer rounded-full border-slate_400 border ${
                              isTermsAndCondition && "border-0 bg-[#2DC774]"
                            }`}
                          >
                            <span
                              className={`opacity-0 ${
                                isTermsAndCondition && "!opacity-100"
                              }`}
                            >
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#fff"
                                  stroke="#fff"
                                  strokeWidth="0.8"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <span className="text-slate_500">
                           I Agree to{" "}
                          </span>
                          <span
                            className="text-[#5232F8] cursor-pointer"
                            // onClick={(e) => {
                            //   e.stopPropagation();
                            //   handleChangeTerms();
                            // }}
                          >
                           Term 
                          </span>
                          <span className="text-slate_500">
                            {" "}
                           and {" "}
                          </span>
                          <span
                            className="text-[#5232F8] cursor-pointer"
                            // onClick={(e) => {
                            //   handleChangePrivacyPolicy();
                            //   e.stopPropagation();
                            // }}
                          >
                          PrivacyPolicy
                          </span>
                        </div>
                      </label>
                    </div>
                    {!isTermsAndCondition && (
                      <div className="text-[#ef4444] text-base font-semibold ml-15 sm:ml-0">
                        {errorCondition}
                      </div>
                    )}
                  </div>
                  <div
                    className="w-[350px] sm:w-[470px] lg:w-[350px] xl:w-[470px] h-[61px] bg-[#5232F8] rounded-[10px] mt-[32px] flex items-center justify-center cursor-pointer hover:bg-[#462BD3] ml-15 sm:ml-0"
                    onClick={(e) => handleSubmit(e)}
                  >
                    <div className="text-center text-white text-base font-medium font-['DM Sans'] leading-tight">
                      Sign UP
                    </div>
                  </div>
                  <div className="mt-[30px] ml-15 sm:ml-0">
                    <span className="text-slate_400 text-sm font-normal font-['DM Sans'] leading-tight">
                    Already have an account?{" "}
                    </span>
                    <a
                      href="#"
                      className="text-[#5232F8] text-sm font-bold font-['DM Sans'] leading-tight cursor-pointer hover:text-[#1B63CD]"
                      onClick={navigateToSignIn}
                    >
                 Please Sign In                    </a>
                  </div>

            
                </div>

                <div
                  className="w-[624.41px] lg:w-[376px] xl:w-[356px] 2xl:w-[750px] h-[436.40px] justify-center items-center lg:inline-flex hidden md:pl-10 mt-120 xl:mt-[120px]
              "
                >
                  <div className="md:w-[400px] lg:w-[474px] xl:w-[495px] 2xl:w-[660.31px]  absolute lg:bottom-0 lg:top-65 xl:bottom-auto lg:pr-20">
                    <div className="lg:mt-[135px] xl:mt-[180px]">
                      <img
                        src="/images/silimage/rbl_plc.png"
  alt="RBL Logo"

                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpComponent;