"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import constants from "@/utils/constants";
import { RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import alertMessages from "@/utils/alertMessages";
import LoaderButton from "../Loaders/LoaderButton";
import LoaderFullScreen from "../Loaders/LoaderFullScreen";
const PasswordChecklist = dynamic(() => import("react-password-checklist"), {
  ssr: false,
});

const OrganizationSpeakersComponent: React.FC = () => {
  //-------translate text input states start
  const [translateTitle, setTranslateTitle] = useState("Passwords");

  const [translateSubTitle, setTranslateSubTitle] = useState(
    "Set up or change your EventBy profile password here with ease"
  );

  const [translateCurrentPassword, setTranslateCurrentPassword] =
    useState("Current Password");
  const [
    translateCurrentPasswordPlaceHolder,
    setTranslateCurrentPasswordPlaceHolder,
  ] = useState("password");

  const [translateChangePassword, setTranslateChangePassword] =
    useState("Change Password");
  const [translateNewPasswordPlaceHolder, setTranslateNewPasswordPlaceHolder] =
    useState("new password");
  const [translateConfirmPassword, setTranslateConfirmPassword] =
    useState("Confirm Password");
  const [
    translateConfirmPasswordPlaceHolder,
    setTranslateConfirmPasswordPlaceHolder,
  ] = useState("Confirm new password");
  const [translateSaveChangesButton, setTranslateSaveChangesButton] =
    useState("Save Changes");

  useEffect(() => {
    const languageId = localStorage.getItem(
      constants.localStorageCustomNameEventBy + "default_language_id"
    );

    if (languageId !== "" && languageId !== undefined && languageId !== null) {
      axios({
        method: "post",
        url:
          process.env.NEXT_PUBLIC_BACKEND_SERVER +
          constants.api.getLanguagePageItemWithoutToken,
        data: {
          default_language_id: languageId,
          page_short_form: "passwords",
        },
      })
        .then(function (response) {
          if (response.data.status === 200) {
            if (response.data.total > 0) {
              const tempData = response.data.data;
              tempData.map((item, index) => {
                if (item.shortForm === "title") {
                  setTranslateTitle(item.value);
                }

                if (item.shortForm === "subtitle") {
                  setTranslateSubTitle(item.value);
                }

                if (item.shortForm === "current_password") {
                  setTranslateCurrentPassword(item.value);
                }

                if (item.shortForm === "current_password_placeholder") {
                  setTranslateCurrentPasswordPlaceHolder(item.value);
                }

                if (item.shortForm === "change_password") {
                  setTranslateChangePassword(item.value);
                }

                if (item.shortForm === "newpassword_placeholder") {
                  setTranslateNewPasswordPlaceHolder(item.value);
                }
                if (item.shortForm === "confirm_password") {
                  setTranslateConfirmPassword(item.value);
                }
                if (item.shortForm === "confirmpassword_placeholder") {
                  setTranslateConfirmPasswordPlaceHolder(item.value);
                }
                if (item.shortForm === "save_changes_button") {
                  setTranslateSaveChangesButton(item.value);
                }
              });

              // console.log("default_language ", response.data.data);
            }
          }
        })
        .catch(function (error) {
          setIsLoading(false);
          return error;
        });
    }
  }, []);
  //-------translate text input states end

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [isNewPasswordHide, setIsNewPasswordHide] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [isNewPasswordEmpty, setIsNewPasswordEmpty] = useState(false);

  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const [loaderFullScreen, setLoaderFullScreen] = useState(false);

  const passwordPattern = constants.passwordPatternCheckEventBy;

  const [isSocialMediaLogin, setIsSocialMediaLogin] = useState(false);

  useEffect(() => {
    setLoaderFullScreen(true);
    const loginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";
    if (loginToken) {
      // setLoaderFullScreen(false);
      getIsSocialMediaLogin(loginToken);
    }
  }, []);

  const getIsSocialMediaLogin = (loginToken: String) => {
    setLoaderFullScreen(true);
    axios({
      method: "get",
      url:
        process.env.NEXT_PUBLIC_BACKEND_SERVER +
        constants.api.isSocialMediaLogin,
      headers: { Authorization: `Bearer ${loginToken}` },
    })
      .then(function (response) {
        // console.log("personal", response);

        if (response.data.status === 200) {
          setLoaderFullScreen(false);
          if (response?.data?.data !== "") {
            // console.log(
            //   "login data ++++++++++++++++7777777777777",
            //   response?.data
            // );
            if (response?.data?.data?.usedSocialMedia) {
              // setIsSocialMediaLogin(response?.data?.data?.usedSocialMedia);
              setIsSocialMediaLogin(true);
            }
            // console.log(
            //   "login with social midea++++++++++++++++88888888888888",
            //   response?.data?.data?.usedSocialMedia
            // );
          }
        } else {
          setLoaderFullScreen(false);
          if (response.data.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: alertMessages.COMMON_ERROR_MESSAGE,
            });
          } else if (response.data.status === 401) {
            setLoaderFullScreen(false);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: alertMessages.USER_NOT_FOUND,
            });
          } else {
            setLoaderFullScreen(false);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: response.data.message,
            });
          }
        }
      })
      .catch(function (error) {
        setLoaderFullScreen(false);
        //  setIsLoadingFullPage(false);
        return error;
      });
  };

  const handleChangePasswordShowHide = () => {
    setIsPasswordHide(!isPasswordHide);
  };
  const handleChangeNewPasswordShowHide = () => {
    setIsNewPasswordHide(!isNewPasswordHide);
  };
  const handleChangeConfirmPasswordShowHide = () => {
    setIsConfirmPasswordHide(!isConfirmPasswordHide);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorPassword("This is required.");
      return;
    }
    // else if (
    //   e.target.value.length > 0 &&
    //   !passwordPattern.test(e.target.value)
    // ) {
    //   setErrorPassword(
    //     "Please use 8 or more characters with a mix of letters, numbers & symbols"
    //   );
    //   return;
    // }
    else {
      setErrorPassword("");
    }
    // Clear any previous errors
    setErrorPassword("");
  };

  const onChangeNewPassword = (e: any) => {
    setNewPassword(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorNewPassword("This is required.");
      return;
    } else if (
      e.target.value.length > 0 &&
      !passwordPattern.test(e.target.value)
    ) {
      setErrorNewPassword(
        "Please use 8 or more characters with a mix of letters, numbers & symbols"
      );
      return;
    } else {
      setErrorNewPassword("");
    }
    // Clear any previous errors
    setErrorNewPassword("");
  };

  const onChangeConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);

    if (e.target.value.length < 1 || e.target.value === "") {
      setErrorConfirmPassword("This is required.");
      return;
    }
    // else if (
    //   e.target.value.length > 0 &&
    //   !passwordPattern.test(e.target.value)
    // ) {
    //   setErrorConfirmPassword(
    //     "Please use 8 or more characters with a mix of letters, numbers & symbols"
    //   );
    //   return;
    // }
    else {
      setErrorConfirmPassword("");
    }
    // Clear any previous errors
    setErrorConfirmPassword("");
  };

  const handleSubmit = (e: any) => {
    const loginToken =
      localStorage.getItem(
        constants.localStorageCustomNameEventBy + "login_token"
      ) || "";
    let temp_password = password;
    let temp_new_password = newPassword;
    let temp_confirm_password = confirmPassword;
    setIsPasswordEmpty(true);
    setIsNewPasswordEmpty(true);
    setIsConfirmPasswordEmpty(true);

    if (isSocialMediaLogin) {
      if (temp_new_password.length < 1 || temp_new_password === "") {
        setErrorNewPassword("This is required.");
        document.getElementById("changpassInput").focus();
        return;
      } else if (
        temp_new_password.length > 0 &&
        !passwordPattern.test(temp_new_password)
      ) {
        setErrorNewPassword(
          "Please use 8 or more characters with a mix of letters, numbers & symbols"
        );
        document.getElementById("changpassInput").focus();
        return;
      } else if (
        temp_confirm_password.length < 1 ||
        temp_confirm_password === ""
      ) {
        setErrorConfirmPassword("This is required.");
        document.getElementById("confirmpassInput").focus();
        return;
      } else if (temp_new_password !== temp_confirm_password) {
        Swal.fire({
          icon: "error",
          title: "New password and confirmed password are mismatched!",
        });
        document.getElementById("confirmpassInput").focus();
        return;
      }
    } else {
      if (
        temp_password.length < 1 &&
        temp_new_password.length < 1 &&
        temp_confirm_password.length < 1
      ) {
        setErrorPassword("This is required.");
        setErrorNewPassword("This is required.");
        setErrorConfirmPassword("This is required.");
        document.getElementById("currpassInput").focus();
        return;
      } else if (temp_password.length < 1 || temp_password === "") {
        setErrorPassword("This is required.");
        document.getElementById("currpassInput").focus();
        return;
      } else if (
        temp_password.length > 0 &&
        !passwordPattern.test(temp_password)
      ) {
        setErrorPassword(
          "Please use 8 or more characters with a mix of letters, numbers & symbols"
        );
        document.getElementById("currpassInput").focus();
        return;
      }
    }

    setErrorPassword("");
    setErrorNewPassword("");
    setErrorConfirmPassword("");
    setIsPasswordEmpty(false);
    setIsNewPasswordEmpty(false);
    setIsConfirmPasswordEmpty(false);
    setIsLoading(true);

    ///
    axios({
      method: "post",
      url:
        process.env.NEXT_PUBLIC_BACKEND_SERVER + constants.api.updatePassword,
      headers: { Authorization: `Bearer ${loginToken}` },
      data: {
        current_password: temp_password,
        new_password: temp_confirm_password,
        is_social_media_login: isSocialMediaLogin,
      },
    })
      .then(function (response) {
        //console.log(response.data);

        if (response.data.status === 200) {
          setIsLoading(false);

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: alertMessages.PASSWORD_UPDATED_SUCCESSFUL,
            confirmButtonText: "OK",
          });
        } else {
          setIsLoading(false);
          if (response.data.status === 501) {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: alertMessages.INCORRECT_PASSWORD,
            });
          } else if (response.data.status === 502) {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: alertMessages.INCORRECT_SAME_PASSWORD,
            });
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: alertMessages.COMMON_ERROR_MESSAGE,
            });
          }
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        return error;
      });

    //////////////
  };
  return (
    <>
      {loaderFullScreen ? (
        <>
          <LoaderFullScreen />
        </>
      ) : (
        <>
          <div className="bg-white pb-[0px] flex justify-center items-center w-full  rounded-[10px]  ">
            <div className="w-full xl:max-w-[1570px] bg-white sm:rounded-[10px] flex-col justify-center items-center">
              <div className="relative py-[38px] mr-[8px] sm:mr-[30px] md:mr-[32px] lg:mr-[40px] xl:mr-[40px] 3xl:mr-[0px] -mt-[9px] sm:mt-[2px]">
                <div
                  className="w-[180px] h-[60px] bg-[#2DC774] rounded-[10px] right-0 absolute flex justify-center items-center cursor-pointer hover:bg-[#4DCF89] "
                  onClick={(e) => handleSubmit(e)}>
                  {isLoading ? (
                    <>
                      <LoaderButton />
                    </>
                  ) : (
                    <>
                      <div className="text-center text-white text-base font-medium font-['DM Sans'] leading-tight">
                        {translateSaveChangesButton}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center items-start py-[50px] sm:py-[50px] md:py-[0px]">
                <div className="flex-col justify-between items-start sm:items-center sm:px-[45px] sm:py-[45px] md:px-[10px] md:py-[0px] md:mt-14">
                  <div className="text-slate_700 text-3xl font-bold font-['DM Sans'] flex justify-center items-center">
                    {translateTitle}
                  </div>
                  <div className="text-slate_400 text-sm font-normal font-['DM Sans'] leading-tight mt-[15px] flex justify-center  items-center ">
                    {translateSubTitle}
                  </div>
                  {!isSocialMediaLogin && (
                    <div className="mt-[50px]">
                      <div className="w-[382px] sm:w-[470px]  md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px]">
                        <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px] justify-between items-center">
                          {translateCurrentPassword}*
                        </div>

                        <div className="relative group w-full">
                          <span className="absolute top-5 left-5 text-slate_400 group-focus-within:text-[#2DC774]">
                            <RiLockLine className="text-xl" />
                          </span>

                          <input
                            id="currpassInput"
                            type={isPasswordHide ? "password" : "text"}
                            placeholder={translateCurrentPasswordPlaceHolder}
                            value={password}
                            className="w-[382px] sm:w-[470px] md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px] bg-white h-[60px] rounded-[10px] border border-slate_200  font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-15 pl-15"
                            onChange={(e) => onChangePassword(e)}
                            autoComplete="off"
                            maxLength={25}
                          />

                          <span
                            className="absolute right-5 top-5 text-slate_400 group-focus-within:text-[#2DC774]"
                            onClick={() => handleChangePasswordShowHide()}>
                            {isPasswordHide ? (
                              <>
                                <RiEyeOffLine className="text-xl cursor-pointer" />
                              </>
                            ) : (
                              <>
                                <RiEyeLine className="text-xl cursor-pointer" />
                              </>
                            )}
                          </span>
                        </div>
                        {isPasswordEmpty && errorPassword && (
                          <div className="text-[#ef4444] text-base font-semibold">
                            {errorPassword}
                          </div>
                        )}
                        {/* {password.length > 0 ? (
                      <>
                        <div className="password_error_div my-2">
                          <PasswordChecklist
                            rules={[
                              "letter",
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
                    )} */}
                      </div>
                    </div>
                  )}

                  <div className="mt-[30px]">
                    <div className="w-[382px] sm:w-[470px]  md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px]">
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px]">
                        {translateChangePassword}*
                      </div>

                      <div className="relative group w-full">
                        <span className="absolute top-5 left-5 text-slate_400 group-focus-within:text-[#2DC774]">
                          <RiLockLine className="text-xl" />
                        </span>
                        <input
                          id="changpassInput"
                          type={isNewPasswordHide ? "password" : "text"}
                          placeholder={translateNewPasswordPlaceHolder}
                          value={newPassword}
                          className="w-[382px] sm:w-[470px]  md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px] bg-white h-[60px] rounded-[10px] border border-slate_200  font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-15 pl-15"
                          onChange={(e) => onChangeNewPassword(e)}
                          autoComplete="off"
                          maxLength={25}
                        />

                        <span
                          className="absolute right-5 top-5 text-slate_400 group-focus-within:text-[#2DC774]"
                          onClick={() => handleChangeNewPasswordShowHide()}>
                          {isNewPasswordHide ? (
                            <>
                              <RiEyeOffLine className="text-xl cursor-pointer" />
                            </>
                          ) : (
                            <>
                              <RiEyeLine className="text-xl cursor-pointer" />
                            </>
                          )}
                        </span>
                      </div>
                      {isNewPasswordEmpty && errorNewPassword && (
                        <div className="text-[#ef4444] text-base font-semibold">
                          {errorNewPassword}
                        </div>
                      )}
                      {newPassword.length > 0 ? (
                        <>
                          <div className="password_error_div my-2">
                            <PasswordChecklist
                              rules={[
                                "letter",
                                "number",
                                "specialChar",
                                "minLength",
                                "maxLength",
                              ]}
                              minLength={8}
                              maxLength={25}
                              value={newPassword}
                              onChange={(isValid) => {}}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="mt-[30px] mb-20">
                    <div className="w-[382px] sm:w-[470px]  md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px]">
                      <div className="text-slate_500 text-sm font-medium font-['DM Sans'] mb-[10px]">
                        {translateConfirmPassword}*
                      </div>

                      <div className="relative group w-full">
                        <span className="absolute top-5 left-5 text-slate_400 group-focus-within:text-[#2DC774]">
                          <RiLockLine className="text-xl" />
                        </span>
                        <input
                          id="confirmpassInput"
                          type={isConfirmPasswordHide ? "password" : "text"}
                          placeholder={translateConfirmPasswordPlaceHolder}
                          value={confirmPassword}
                          className="w-[382px] sm:w-[470px]  md:w-[400px] lg:w-[470px] xl:w-[570px] 2xl:w-[670px] bg-white h-[60px] rounded-[10px] border border-slate_200  font-medium outline-none transition focus:border-[#2DC774] active:border-[#2DC774] disabled:cursor-default disabled:bg-whiter text-black placeholder:text-slate_400 py-5 pr-15 pl-15"
                          onChange={(e) => onChangeConfirmPassword(e)}
                          autoComplete="off"
                          maxLength={25}
                        />

                        <span
                          className="absolute right-5 top-5 text-slate_400 group-focus-within:text-[#2DC774]"
                          onClick={() => handleChangeConfirmPasswordShowHide()}>
                          {isConfirmPasswordHide ? (
                            <>
                              <RiEyeOffLine className="text-xl cursor-pointer" />
                            </>
                          ) : (
                            <>
                              <RiEyeLine className="text-xl cursor-pointer" />
                            </>
                          )}
                        </span>
                      </div>
                      {isConfirmPasswordEmpty && errorConfirmPassword && (
                        <div className="text-[#ef4444] text-base font-semibold">
                          {errorConfirmPassword}
                        </div>
                      )}
                      {/* {confirmPassword.length > 0 ? (
                      <>
                        <div className="password_error_div my-2">
                          <PasswordChecklist
                            rules={[
                              "letter",
                              "number",
                              "specialChar",
                              "minLength",
                              "maxLength",
                            ]}
                            minLength={8}
                            maxLength={25}
                            value={newPassword}
                            onChange={(isValid) => {}}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrganizationSpeakersComponent;