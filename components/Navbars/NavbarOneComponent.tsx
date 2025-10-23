"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  RiCalendarLine,
  RiArchiveLine,
  RiLogoutBoxRLine,
  RiCheckboxCircleFill,
  RiNotification3Line,
  RiSettings4Line,
} from "react-icons/ri";
import constants from "@/utils/constants";
 
import utils, { nameCharactersCountAndEmptyCheck } from "../../utils/utils";
import Link from "next/link";
import Image from "next/image";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useRouter } from "next/dist/client/components/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import staticPath from "@/utils/staticPath";
import { FaCircle } from "react-icons/fa";
// import DropdownNotificationNavBar from "./Common/DropdownNotificationNavBar";
// import DropdownMessageNabBar from "./Common/DropdownMessageNabBar";
import axios from "axios";
import LoaderButton from "../loders/loader/LoaderButton";
import LoaderButtonSpinner from "../loders/loader/LoaderButtonSpinner";

interface NavbarOnlyLogOutProps {
  profileImage?: string | undefined;
  setMenuClick?: Dispatch<SetStateAction<boolean>>;
}

const NavbarOneComponent: React.FC<NavbarOnlyLogOutProps> = ({
  profileImage,
  setMenuClick,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [toggle, setToggle] = useState(true);

  const [isHome, setIsHome] = useState(false);
  const [isMyEvents, setIsMyEvents] = useState(true);
  const [isOrganizations, setIsOrganizations] = useState(false);
  const [isOtherOrganizations, setIsOtherOrganizations] = useState(false);
  const [isInbox, setIsInbox] = useState(false);
  const toggleRef = useRef(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // session expire start

  useEffect(() => {
    // setIsLoading(true);
    const tempLoginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";

    // if (tempLoginToken) {
    //   checkUserLoginExpire(tempLoginToken);
    // } else {
    //   goToLoginPage();
    // }
  }, []);
//   const goToLoginPage = () => {
//     router.replace("/auth/signin");
//   };

//   const checkUserLoginExpire = (loginToken: string) => {
//     // console.log("data", data);
//     axios({
//       method: "post",
//       url:
//         process.env.NEXT_PUBLIC_BACKEND_SERVER +
//         constants.api.checkUserLoginExpire,
//       headers: { Authorization: `Bearer ${loginToken}` },
//     })
//       .then(function (response) {
//         // console.log("get Event : ", response.data);

//         if (response.data.status === 200) {
//           setIsLoading(false);
//         } else {
//           const keyToKeep = localStorage.getItem(
//             constants.localStorageCustomNameEventBy + "default_language_id"
//           );
//           const keyToKeepRememberMeEmail = localStorage.getItem(
//             constants.localStorageCustomNameEventBy + "remember_me_email"
//           );
//           const keyToKeepRememberMePassword = localStorage.getItem(
//             constants.localStorageCustomNameEventBy + "remember_me_password"
//           );
//           localStorage.clear();
//           if (keyToKeep) {
//             localStorage.setItem(
//               constants.localStorageCustomNameEventBy + "default_language_id",
//               keyToKeep
//             );
//           }
//           if (keyToKeepRememberMeEmail) {
//             localStorage.setItem(
//               constants.localStorageCustomNameEventBy + "remember_me_email",
//               keyToKeepRememberMeEmail
//             );
//           }
//           if (keyToKeepRememberMePassword) {
//             localStorage.setItem(
//               constants.localStorageCustomNameEventBy + "remember_me_password",
//               keyToKeepRememberMePassword
//             );
//           }
//           goToLoginPage();
//         }
//       })
//       .catch(function (error) {
//         goToLoginPage();
//       });
//   };
  // session expire end

  useEffect(() => {
    const login_token =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";
    const tempFirstName =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "firstName"
      ) || "";
    const tempLastName =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "lastName"
      ) || "";
    const login_email =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_email"
      ) || "";
    const tempProfilePhoto =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "profileImage"
      ) || "";

    const selectedNavbar =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "navbar_item"
      ) || "";

    if (login_token) {
      setName(nameCharactersCountAndEmptyCheck(tempFirstName, tempLastName));
      if (selectedNavbar === "My Event") {
        setIsHome(false);
        setIsMyEvents(true);
        setIsInbox(false);
        setIsOrganizations(false);
        setIsOtherOrganizations(false);
      } else if (selectedNavbar === "Inbox") {
        setIsHome(false);
        setIsMyEvents(false);
        setIsInbox(true);
        setIsOrganizations(false);
        setIsOtherOrganizations(false);
      } else if (selectedNavbar === "Organizations") {
        setIsHome(false);
        setIsMyEvents(false);
        setIsInbox(false);
        setIsOrganizations(true);
        setIsOtherOrganizations(false);
      } else if (selectedNavbar === "Home") {
        setIsHome(true);
        setIsMyEvents(false);
        setIsInbox(false);
        setIsOrganizations(false);
        setIsOtherOrganizations(false);
      } else if (selectedNavbar === "Other Organizations") {
        setIsHome(false);
        setIsMyEvents(false);
        setIsInbox(false);
        setIsOrganizations(false);
        setIsOtherOrganizations(true);
      }
      if (tempFirstName) {
        setFirstName(tempFirstName);
      }
      if (tempLastName) {
        setLastName(tempLastName);
      }
      if (login_email) {
        setEmail(login_email);
      }
      if (tempProfilePhoto) {
        setProfilePhoto(tempProfilePhoto);
      }
    } else {
      handleLogOut();
    }

    // console.log("tempProfilePhotosdfd", profileImage);
  }, []);

  useEffect(() => {
    const tempProfilePhoto =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "profileImage"
      ) || "";
    // console.log("tempProfilePhoto", tempProfilePhoto);

    if (profileImage) {
      setProfilePhoto(tempProfilePhoto);
    }
  }, [profileImage]);

  const handleLogOut = () => {
    const keyToKeep = localStorage.getItem(
      constants.localStorageCustomNameEventBy + "default_language_id"
    );
    const keyToKeepRememberMeEmail = localStorage.getItem(
      constants.localStorageCustomNameEventBy + "remember_me_email"
    );
    const keyToKeepRememberMePassword = localStorage.getItem(
      constants.localStorageCustomNameEventBy + "remember_me_password"
    );

    ///////////////////////////////
    const tempLoginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";
    axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_SERVER + constants.api.logoutUser,
      headers: { Authorization: `Bearer ${tempLoginToken}` },
    })
      .then(function (response) {
        // console.log("get Event : ", response.data);

        if (response.data.status === 200) {
          // goToLoginPage();
        } else {
        //   goToLoginPage();
        }
      })
      .catch(function (error) {
        // goToLoginPage();
      });

    //////////////////////////////

    localStorage.clear();
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

    // router.push(staticPath.authSignIn);
  };

  const handleHome = () => {
    localStorage.setItem(
      constants.localStorageCustomNameEventBy + "navbar_item",
      "Home"
    );
    // router.replace(staticPath.dashboard);
  };

  const handleAccountSettings = () => {
    // setMenuClick(true); //check
    localStorage.setItem(
      constants.localStorageCustomNameEventBy + "payment_setup_personal",
      "0"
    );
    // router.replace("https://www.google.com/");
    // router.replace(staticPath.accountSettingsVerify);
    // setLoading(false);

    // Use setTimeout to simulate loading; remove in production
    // setTimeout(() => {
    //   router.replace(staticPath.accountSettings);
    //   setLoading(false);
    // }, 1000); // Adjust time as needed
  };
  const handleNevigation = (code: string) => {
    // setMenuClick(true); //check
    if (code === "My Event") {
      localStorage.setItem(
        constants.localStorageCustomNameEventBy + "navbar_item",
        "My Event"
      );
    //   router.push(staticPath.myEvents);
    } else if (code === "Inbox") {
      localStorage.setItem(
        constants.localStorageCustomNameEventBy + "navbar_item",
        "Inbox"
      );
    //   router.push(staticPath.inboxOrChat);
    } else if (code === "Organizations") {
      localStorage.setItem(
        constants.localStorageCustomNameEventBy + "navbar_item",
        "Organizations"
      );
    //   router.push(staticPath.organizations);
    } else if (code === "Other Organizations") {
      localStorage.setItem(
        constants.localStorageCustomNameEventBy + "navbar_item",
        "Other Organizations"
      );
    //   router.push(staticPath.otherOrganization);
    }
  };

  useEffect(() => {
    const checkOnlineStatus = () => {
      // Check if navigator is online
      const online = navigator.onLine;
      setIsOnline(online);
    };

    // Call checkOnlineStatus initially
    checkOnlineStatus();

    // Set up event listener to detect online status changes
    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, []);

  // const toggleMenu = () => {
  //   const navToggle = document.getElementsByClassName("toggle");
  //   for (let i = 0; i < navToggle.length; i++) {
  //     navToggle.item(i).classList.toggle("hidden");
  //   }
  // };

  const handleEventCreate = () => {
    setMenuClick(true);
    localStorage.setItem(
      constants.localStorageCustomNameEventBy + "navbar_item",
      "Create Event"
    );
    // router.push(staticPath.createEvent);
  };
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };
  const handleToggleAndOpen = () => {
    setIsOpen(false);
    setToggle(!toggle);
  };
  // hide drop down menu when click out side start
  const menuRef1 = useRef(null);
  const menuRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef1.current &&
        !menuRef1.current.contains(event.target) &&
        menuRef2.current &&
        !menuRef2.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target) &&
        !event.target.closest('[data-dropdown="menu"]') && // Ignore clicks within the dropdown
        !event.target.closest('[data-dropdown="menu-item"]') // Ignore clicks on menu items
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef1, menuRef2]);
  // hide drop down menu when click out side end

  useEffect(() => {
    if (isMessageOpen) {
      // console.log("working.....................");
      setIsOpen(false);
    }
  }, [isMessageOpen]);

  useEffect(() => {
    if (isNotificationOpen) {
      // console.log("working.....................");
      setIsOpen(false);
    }
  }, [isNotificationOpen]);
  return (
    <>
      <div
        className={`w-full animate-slideFromTop  bg-white ${
          toggle ? "h-[98.5px]" : "h-[400px]"
        } 
        
         lg:h-[98.5px] py-6 px-3 fixed top-0 z-99999 shadow-[0px_10px_10px_-10px_rgba(33,35,38,.2)] mb-20 md:mb-0`}
      >
        <div className="flex justify-between items-center max-w-[1370px] mx-auto">
          <div className="w-full lg:w-[1553px] xl:w-[2200px] flex justify-start ">
            <span className="lg:mr-5 xl:mr-9">
              <span onClick={handleHome} className="cursor-pointer">
                <object
                  data="/images/eventby/logo.svg"
                  width={140}
                  type="image/svg+xml"
                  style={{ pointerEvents: "none" }}
                />
              </span>
            </span>
            <span className=" hidden lg:flex">
              <span
                className={`lg:px-[10px] xl:px-5 pt-1 text-black-2 text-[15px] ${
                  isHome ? "text-primary" : ""
                } hover:text-primary cursor-pointer`}
                onClick={handleHome}
              >
                translateHome
              </span>
              <span
                className={`lg:px-[10px] xl:px-5 pt-1 text-black-2 text-[15px] ${
                  isMyEvents ? "text-primary" : ""
                } hover:text-primary`}
              >
                <div
                  onClick={() => handleNevigation("My Event")}
                  className="cursor-pointer"
                >
                  translateMyEvents
                </div>
              </span>

              <span
                className={`lg:px-[10px] xl:px-5  pt-1 text-black-2 text-[15px] ${
                  isOrganizations ? "text-primary" : ""
                } hover:text-primary`}
              >
                <div
                  onClick={() => handleNevigation("Organizations")}
                  className="cursor-pointer"
                >
                  translateMyOrganizations
                </div>
              </span>
              <span
                className={`lg:px-[14px] xl:px-5 pt-1 text-black-2 text-[15px]  ${
                  isOtherOrganizations ? "text-primary" : ""
                } hover:text-primary`}
              >
                <div
                  onClick={() => handleNevigation("Other Organizations")}
                  className="cursor-pointer"
                >
                  translateOtherOrganizations
                </div>
              </span>
            </span>
          </div>
          <div className="w-full lg:flex justify-end items-center hidden">
            <div
              className="bg-primary rounded-[10px] flex justify-center items-center cursor-pointer border border-primary hover:bg-[#462BD3] px-4 lg:px-[10px] py-3 mr-5"
              onClick={() => handleEventCreate()}
            >
              <span className="mr-1">
                <RiCalendarLine className="text-white text-base" />
              </span>
              <div className="text-center font-medium text-white text-base font-poppins leading-6">
                <div>translateCreateEvent</div>
              </div>
            </div>

            {/* <div className="flex justify-center items-center cursor-pointer gap-2">
              <Image
                src={"/images/eventby/avata.png"}
                width={40}
                height={40}
                alt="Profile Image"
              />
              <p className="text-base text-black-2 font-poppins">
                Md. Nayeem Sagor
              </p>
              <Icon
                path={mdiChevronDown}
                title="Expand"
                size={0.7}
                color="#656F89"
              />
            </div> */}
            {/* <div className="relative ml-[-10px] gap-5 flex justify-center items-center">
              <div>
                <RiNotification3Line
                  className=" text-[#9BA4BB] flex justify-center items-center mt-1 mx-4 "
                  size={25}
                />
              </div>
            </div>
            <div>
              <span>
                <FaCircle
                  className={`${
                    isOnline ? "text-[#2DC774]" : "text-red-500"
                  } mt-1.5 -mx-6 w-[12px]`}
                  onClick={toggleOnlineStatus}
                />
              </span>
            </div> */}
            {/* <div className="flex justify-center items-center mr-5">
         
              <DropdownMessageNabBar
                setIsMessageOpen={setIsMessageOpen}
                isOpen={isOpen}
              />
            </div> */}
            {/* <div className="flex justify-center items-center mr-5">
              <DropdownNotificationNavBar
                setIsNotificationOpen={setIsNotificationOpen}
                isOpen={isOpen}
              />
            </div> */}
            <div className="relative ">
              <div
                ref={toggleRef}
                className="flex justify-center items-center cursor-pointer gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Image
                  src={
                    profilePhoto
                      ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/get-image-by-path/${profilePhoto}/200/200/both`
                      : "/images/eventby/avatar2.png"
                  }
                  width={50}
                  height={45}
                  alt="Profile Image"
                  className="rounded-full mt-[3px]"
                />
                <p className="text-base text-black-2 font-poppins ">{name}</p>

                <Icon
                  path={mdiChevronDown}
                  title="Expand"
                  size={0.7}
                  color="#656F89"
                />
              </div>

              {isOpen ? (
                <div
                  ref={menuRef1}
                  className="w-73 h-45 bg-white z-999 rounded-[10px] border border-slate_200 absolute right-0 -bottom-[190px] shadow-card"
                >
                  <div className="relative p-5 truncate">
                    <Image
                      src={
                        profilePhoto
                          ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/get-image-by-path/${profilePhoto}/200/200/both`
                          : "/images/eventby/avata.png"
                      }
                      width={60}
                      height={60}
                      alt="Profile Image"
                      className="rounded-full"
                    />
                    <span className="absolute top-0 p-5 right-0">
                      <RiCheckboxCircleFill className="text-xl text-[#2DC774]" />
                    </span>
                    <div className="">
                      <div className="flex justify-center items-center">
                        <div className="max-w-[160px] absolute inset-0 flex justify-start items-center text-base text-black-2 font-poppins translate-x-[90px] gap-0 -mt-7">
                          <p className="truncate">
                            {firstName + " " + lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-[265px] absolute inset-0 flex justify-start items-center text-slate_500 text-[13px] font-poppins px-10 translate-x-[50px] mt-4">
                      <p className="truncate">{email}</p>
                    </div>
                  </div>
                  <div className="p-[-20px]  -mt-2">
                    <div
                      className="flex justify-center items-center cursor-pointer gap-2  hover:text-primary font-poppins translate-x-[0px] text-base h-10  "
                      onClick={handleAccountSettings}
                    >
                      {loading ? (
                        <>
                          <LoaderButtonSpinner />
                        </>
                      ) : (
                        <>
                          <RiSettings4Line
                            className="text-base ml-13"
                            size={20}
                          />
                          <span>translateAccountSettings</span>
                        </>
                      )}
                    </div>
                    <div
                      className="flex justify-center items-center cursor-pointer gap-2 hover:text-primary font-poppins -translate-x-[52px] text-base mt-3 ml-19"
                      onClick={handleLogOut}
                    >
                      <RiLogoutBoxRLine />
                      <span>translateLogout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* mobileView toggle start */}
          {/* <div className="flex md:hidden ml-5">
            <button id="hamburger" onClick={toggleMenu}>
              <img
                className="toggle block"
                src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
                width="50"
                height="50"
              />
              <img
                className="toggle hidden"
                src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
                width="50"
                height="50"
              />
            </button>
          </div> */}
          {/* mobileView toggle end */}
          {toggle ? (
            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              className="lg:hidden block text-2xl cursor-pointer hover:text-primary"
            />
          ) : (
            <AiOutlineClose
              onClick={handleToggleAndOpen}
              // onClick={() => setToggle(!toggle)}
              className="lg:hidden block text-2xl cursor-pointer hover:text-primary"
            />
          )}
        </div>
        <div
          className={`flex lg:hidden  flex-col ${toggle ? "hidden" : "flex"}`}
        >
          <div className="w-full flex justify-start  flex-col">
            <span className="  flex flex-col mt-[-10px]">
              <span
                className={`${
                  isHome ? "text-primary" : ""
                } px-5 pt-1 text-black-2 text-[15px] hover:text-primary mt-5 w-15 cursor-pointer`}
                onClick={handleHome}
              >
                translateHome
              </span>
              <span
                className={` ${
                  isMyEvents ? "text-primary" : ""
                } w-[190px] px-5 pt-1 text-black-2 text-[15px] hover:text-primary mt-3`}
              >
                <div
                  onClick={() => handleNevigation("My Event")}
                  className="cursor-pointer"
                >
                  translateMyEvents
                </div>
              </span>
              {/* <span
                className={`lg:px-3 xl:px-5 pt-1 text-black-2 text-[15px] ${
                  isInbox ? "text-primary" : ""
                } hover:text-primary`}
              >
                <div
                  onClick={() => handleNevigation("Inbox")}
                  className="cursor-pointer"
                >
                  Inbox
                </div>
              </span> */}
              <span
                className={`${
                  isOrganizations ? "text-primary" : ""
                } w-[190px] px-5 pt-1 text-black-2 text-[15px] hover:text-primary mt-3`}
              >
                <div
                  onClick={() => handleNevigation("Organizations")}
                  className="cursor-pointer"
                >
                  translateMyOrganizations
                </div>
              </span>
              <span
                className={`${
                  isOtherOrganizations ? "text-primary" : ""
                } w-[190px] px-5 pt-1 text-black-2 text-[15px] hover:text-primary mt-3`}
              >
                <div
                  onClick={() => handleNevigation("Other Organizations")}
                  className="cursor-pointer"
                >
                  translateOtherOrganizations
                </div>
              </span>
              {/* <span className="flex justify-start items-start ml-[18px] mt-[5px]">
                <DropdownMessageNabBar
                  setIsMessageOpen={setIsMessageOpen}
                  isOpen={isOpen}
                />
              </span> */}
              {/* <span className="flex justify-start items-start ml-[18px] mt-[5px]">
                <DropdownNotificationNavBar
                  setIsNotificationOpen={setIsNotificationOpen}
                  isOpen={isOpen}
                />
              </span> */}
            </span>
          </div>
          <div className=" flex  flex-col w-[180px] justify-start  lg:hidden">
            <div
              className="bg-primary rounded-[8px] flex justify-start items-center cursor-pointer border border-primary hover:bg-[#462BD3] px-2 py-1.5 mr-0 ml-5 mt-3 "
              onClick={() => handleEventCreate()}
            >
              <span className="mr-1">
                <RiCalendarLine className="text-white text-base" />
              </span>
              <div className="text-center font-medium text-white text-base font-poppins leading-6 ">
                <div>translateCreateEvent</div>
              </div>
            </div>

            {/* <div className="relative ml-[-10px] gap-5 flex justify-center items-center">
              <div>
                <RiNotification3Line
                  className=" text-[#9BA4BB] flex justify-center items-center mt-3 mr-28"
                  size={25}
                />
              </div>
            </div>
            <div>
              <span>
                <FaCircle
                  className={`${
                    isOnline ? "text-[#2DC774]" : "text-red-500"
                  } -mt-8 mx-9.5 w-[12px]`}
                  onClick={toggleOnlineStatus}
                />
              </span>
            </div> */}

            {/* <div className="flex justify-center items-center cursor-pointer gap-2">
              <Image
                src={"/images/eventby/avata.png"}
                width={40}
                height={40}
                alt="Profile Image"
              />
              <p className="text-base text-black-2 font-poppins">
                Md. Nayeem Sagor
              </p>
              <Icon
                path={mdiChevronDown}
                title="Expand"
                size={0.7}
                color="#656F89"
              />
            </div> */}

            <div className="relative mt-3">
              <div
                className="w-[208px] flex justify-center items-center cursor-pointer gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Image
                  src={
                    profilePhoto
                      ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/get-image-by-path/${profilePhoto}/200/200/both`
                      : "/images/eventby/avatar2.png"
                  }
                  width={40}
                  height={40}
                  alt="Profile Image"
                  className="rounded-full"
                />
                <p className="text-base text-black-2 font-poppins">{name}</p>
                <Icon
                  path={mdiChevronDown}
                  title="Expand"
                  size={0.7}
                  color="#656F89"
                />
              </div>
              {isOpen ? (
                <div
                  ref={menuRef2}
                  data-dropdown="menu"
                  className=" w-70 h-[150px] bg-white z-999 rounded-[10px] border border-slate_200 absolute right-0 -bottom-[157px] shadow-card left-1  "
                >
                  <div className="relative  p-1 ">
                    <Image
                      src={
                        profilePhoto
                          ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/get-image-by-path/${profilePhoto}/200/200/both`
                          : "/images/eventby/avatar2.png"
                      }
                      width={50}
                      height={40}
                      alt="Profile Image"
                      className="rounded-full"
                    />
                    <span className="absolute top-0  p-4  -right-2">
                      <RiCheckboxCircleFill className="text-base text-[#2DC774]" />
                    </span>
                    <div>
                      <span className="absolute inset-0 flex justify-start items-center text-sm text-black-2 font-poppins translate-x-[70px] gap-0 -mt-3">
                        {`${firstName} ${
                          firstName.length + lastName.length > 10
                            ? lastName.slice(0, 10 - firstName.length) + "..."
                            : lastName
                        }`}
                      </span>
                    </div>
                    <div className=" absolute inset-0 flex justify-start items-center text-slate_500 text-sm font-poppins px-10 translate-x-[28px] mt-[34px]">
                      <p className="truncate">{email}</p>
                    </div>
                  </div>
                  <div className="p-[-20px] -mt-1">
                    <div
                      data-dropdown="menu-item"
                      className="flex justify-center items-center cursor-pointer gap-2  hover:text-primary font-poppins translate-x-[0px] text-base  h-9 mt-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccountSettings();
                      }}
                    >
                      {loading ? (
                        <>
                          <LoaderButtonSpinner />
                        </>
                      ) : (
                        <>
                          <RiSettings4Line
                            className="text-base ml-5"
                            size={18}
                          />
                          <span>ranslateAccountSettings</span>
                        </>
                      )}
                    </div>
                    <div
                      data-dropdown="menu-item"
                      className="flex justify-center items-center cursor-pointer gap-2 hover:text-primary font-poppins -translate-x-[30px] text-base mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogOut();
                      }}
                    >
                      <RiLogoutBoxRLine />
                      <span>translateLogout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarOneComponent;