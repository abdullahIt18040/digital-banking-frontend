
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaymentSettingComponent from "./PasswordComponent";
import ExcelDataGridComponent from "./ExcelDataGridComponent";
import PersonalInformationComponent from "./PasswordComponent";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiUserLine,
  RiLockPasswordLine,
  RiWallet3Line,
} from "react-icons/ri";
import NavbarOneComponent from "../Navbars/NavbarOneComponent";
import LoaderFullScreen from "../loders/loader/LoaderFullScreen";
import { TbCategory2 } from "react-icons/tb";
import ManageCategoryComponent from "./PasswordComponent";
import constants from "@/utils/constants";
import axios from "axios";

const DashboardMainComponent: React.FC = () => {
 
  //-------translate text input states end
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [myIndex, setMyIndex] = useState(0);

  useEffect(() => {
    const temMyPaymentIndex =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "payment_setup_personal"
      ) || "";
    if (temMyPaymentIndex) {
      setMyIndex(parseInt(temMyPaymentIndex));
    }
  }, []);
  const Menus = [
    { title: "personal information", icon: "RiUserLine" },
    { title: "translatePassword", icon: "RiLockPasswordLine" },
    { title: "translatePaymentSettings", icon: "RiWallet3Line" },
    { title: "translateCategorySettings", icon: "TbCategory2" },
    { title: "translateCategorySettings", icon: "TbCategory2" },
    { title: "translateCategorySettings", icon: "TbCategory2" },
  ];

  // Function to render icon dynamically based on the icon name
  const renderIcon = (iconName: string) => {
    // Map icon name to corresponding RiIcons component
    const iconComponents = {
      RiUserLine: RiUserLine,
      RiLockPasswordLine: RiLockPasswordLine,
      RiWallet3Line: RiWallet3Line,
      TbCategory2: TbCategory2,
      // Add more icon mappings as needed
    };

    // Check if the icon name exists in iconComponents object
    const IconComponent = iconComponents[iconName];

    // If the icon component exists, render it, otherwise render a default icon or nothing
    return IconComponent ? <IconComponent className={`text-[15px]`} /> : null;
  };

  return (
    <>
      <NavbarOneComponent setMenuClick={setMenuClick} />
      {menuClick ? (
        <>
          <>
            <LoaderFullScreen />
          </>
        </>
      ) : (
        <>
          <div className="flex justify-end items-end mt-25 md:mt-0 ">
            <div
              className={`transition-all duration-5000 ${
                sideMenuIsExpand
                  ? "w-full "
                  : "w-full h-20 flex justify-end items-end"
              } bg-[#5232F8] relative md:hidden block`}
            >
              <div className="flex items-center justify-between p-4">
                <span
                  className={`${
                    !sideMenuIsExpand && "hidden"
                  } origin-right text-[#9ba4bb] text-[16px] mr-4 flex justify-start items-center`}
                >
                  DIGITAL-BANKING
                </span>
                <span
                  className="bg-[#5232F8] border border-[#c7cdde] w-10 h-[38.5px] rounded-[6px] flex justify-center items-center cursor-pointer"
                  onClick={() => setSideMenuIsExpand(!sideMenuIsExpand)}
                >
                  {sideMenuIsExpand ? (
                    <RxCross2 className="text-[#c7cdde] text-lg" />
                  ) : (
                    <AiOutlineMenu className="text-[#c7cdde] text-lg " />
                  )}
                </span>
              </div>

              {sideMenuIsExpand ? (
                <>
                  <hr className="text-[#F4F4F6]" />
                  <ul className="m-4 mr-0 mt-15">
                    {Menus.map((Menu, index) => (
                      <li
                        key={index}
                        className={`flex rounded-s-[10px] p-3.5 cursor-pointer hover:bg-[#5232F8] text-[15px] items-center gap-x-1.5 h-[50px]
             ${
               index === myIndex
                 ? "bg-[#4122de] text-white hover:bg-[#4122de]  "
                 : "text-[#c7cdde] hover:text-[#5232F8] bg-[#5232F8] "
             } `}
                        onClick={() => {
                          setMyIndex(index);
                          if (window.innerWidth <= 640) {
                            setSideMenuIsExpand(false); // Hide side menu in smaller views
                          }
                        }}
                      >
                        {Menu.icon && renderIcon(Menu.icon)}
                        <span
                          className={`${
                            !sideMenuIsExpand && "hidden"
                          } origin-left ml-1`}
                        >
                          {Menu.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex">
            <div
              className={`hidden md:flex flex-col mt-25  ${
                !sideMenuIsExpand ? "w-[250px]" : "w-20"
              } bg-white relative `}
            >
              <div className="flex items-center p-4">
                <span
                  className="bg-white border border-[#c7cdde] w-10 h-[38.5px] rounded-[6px] flex justify-center items-center cursor-pointer"
                  onClick={() => setSideMenuIsExpand(!sideMenuIsExpand)}
                >
                  {!sideMenuIsExpand ? (
                    <RiArrowLeftSLine className="text-[#c7cdde] text-lg" />
                  ) : (
                    <RiArrowRightSLine className="text-[#c7cdde] text-lg" />
                  )}
                </span>
                <span
                  className={`${
                    sideMenuIsExpand && "hidden"
                  } origin-left  text-[#9ba4bb] text-[16px] ml-4`}
                >
                  DIGITAL-BANKING
                </span>
              </div>
              <hr className="text-[#F4F4F6]" />
              <ul className="m-4 mr-0 ">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
               className={`flex rounded-s-[10px] p-3.5 cursor-pointer  text-[15px] items-center gap-x-1.5 h-[50px]
  ${
    index === myIndex
      ? "bg-[#4122de] text-white  "
      : "text-[#c7cdde]   hover:text-[#5232F8] hover:bg-white"
  }
`}
                    onClick={() => {
                      setMyIndex(index);
                      if (window.innerWidth <= 640) {
                        setSideMenuIsExpand(false); // Hide side menu in smaller views
                      }
                    }}
                  >
                    {/* <RiUserLine className="text-[15px]" /> */}
                    {Menu.icon && renderIcon(Menu.icon)}
                    <span
                      className={`${
                        sideMenuIsExpand && "hidden"
                      } origin-left ml-1`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" flex-1 p-0 md:p-3 lg:p-5 sm:px-[40px] sm:py-[45px] md:mt-25 bg-slate-100">
              <>
                {myIndex === 0 ? (
                  <>
                    <PersonalInformationComponent />
                  </>
                ) : myIndex === 1 ? (
                  <>
                    <ExcelDataGridComponent/>
                  </>
                ) : myIndex === 2 ? (
                  <>
                    {/* <PaymentSettingComponent
                      sideMenuIsExpand={sideMenuIsExpand}
                    /> */}
                  </>
                ) : myIndex === 3 ? (
                  <>
                    {/* <ManageCategoryComponent /> */}
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardMainComponent;
