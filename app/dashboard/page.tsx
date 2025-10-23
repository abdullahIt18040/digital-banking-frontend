"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import constants from "@/utils/constants";
import LoaderFullScreenMiddle from "../../components/loders/loader/LoaderFullScreenMiddle";
import DashboardMainComponent from "@/components/dashboard/DashboardMainComponent";
// import OverView from "@/components/datagrid/OverviewComponent";

const EventManagement: React.FC = () => {
  const params = useParams<{ id: string }>();

  // session expire start
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrganizationOwner, setIsOrganizationOwner] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    const tempLoginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";

    if (tempLoginToken) {
    //   checkUserLoginExpire(tempLoginToken);
    } else {
    //   goToLoginPage();
    }
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
//           checkOrganizationOwner(loginToken);
//           // setIsLoading(false);
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
  
  return (
    <>
      {isLoading ? (
        <>
          <LoaderFullScreenMiddle />
        </>
      ) : (
        <>
          {/* {isOrganizationOwner && (
            <>
              <ManageOrganizationMainComponent organizationId={params.id} />
            </>
          )} */}
        <DashboardMainComponent/>
          {/* <DashboardMainComponent /> */}
              {/* <ManageOrganizationMainComponent organizationId={params.id} /> */}
            
        </>
      )}
    </>
  );
};

export default EventManagement;