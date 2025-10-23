"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  RiArrowLeftSLine,
  RiUserLine,
  RiArrowRightSLine,
  RiMore2Fill,
  RiArrowDownSFill,
  RiBookmark2Line,
  RiCheckLine,
} from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiCheck, mdiChevronDown } from "@mdi/js";

import constants from "@/utils/constants";
import alertMessages from "@/utils/alertMessages";

import axios from "axios"; // Import Axios
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";

import staticPath from "@/utils/staticPath";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#5232F8", // Customize the primary color here
    },
    secondary: {
      main: "#ffffff", // Customize the primary color here
    },
  },
});

interface OrganizationOrganizersProps {
  organizationData: object;
}
const OrganizationSponsorsComponent: React.FC = () =>  {
  const popupRef = useRef(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);
  // category dropdown code start
  const options = [
    "Organizer",
    "Co_organizer",
    "Moderator",
    // "Attendee",
    "Speaker",
    "Sponsor",
    // "Invitation Lists",
    // "Other Organizations",
  ];
  const actions = ["Invite Again", "Delete"];
  const [selectedOption, setSelectedOption] = useState("Organizer");
  const [categoryErrorMassage, setCategoryErrorMassage] = useState("");

  const [loginToken, setLoginToken] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizerList, setOrganizerList] = useState([]);
  const [heightOfTable, setHeightOfTable] = useState(-1);
  const [heightOfTableMini, setHeightOfTableMini] = useState(-1);
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const tempLoginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";

  

    
  }, []);

  //get organizer list start
 
  //get organizer list end

  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const handleEmail = async (e: any) => {
    let tempEmail = e.target.value.trim();

    setEmail(tempEmail.replace(/[\u0980-\u09FF]/g, ""));

    if (tempEmail.length < 1) {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
    }
  };

  return (
    <>
      {/* <NavbarOnlyLogOutComponent /> */}
     <div>
        <h1>THis is component one </h1>
     </div>
    </>
  );
};

export default OrganizationSponsorsComponent;