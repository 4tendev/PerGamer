"use client";

import responseMessageFinder from "@/commonTsBrowser/responseMessageFinder";

import {
  repeatPasswordInput,
  emailOrMobileInput,
  trustedDeviceInput,
  newPasswordInput,
} from "../inputs/inputs";

import dictionary from "./dictionary.json";

import { useRouter } from "next/navigation";

import { fetchapi } from "@/commonTsBrowser/fetchAPI";

import { useAppDispatch, useAppSelector } from "@/GlobalStates/hooks";
import { newUserState } from "@/GlobalStates/Slices/userSlice";
import {
  newAlert,
  connectionErrorAlert,
} from "@/GlobalStates/Slices/alert/Slice";
import { language } from "@/GlobalStates/Slices/languageSlice";
import { useState } from "react";
import Verification from "@/app/user/Verification/Verification";
import Alert from "@/app/components/Alert/Alert";
import UseFormTemplate from "@/app/UseForm/UseFormTemplate";

const Page = () => {
  const [modalVerification, setModalVerification]: [
    JSX.Element | undefined,
    Function
  ] = useState(undefined);

  const setGlobalState = useAppDispatch();
  const lang = useAppSelector(language).lang;
  const router = useRouter();
  const form = {
    inputs: [
      emailOrMobileInput(lang),
      newPasswordInput(lang),
      repeatPasswordInput(lang),
      trustedDeviceInput(lang),
    ],
    action: dictionary.askCode[lang],
  };

  async function resetPassword(data: any) {
    if (data.newPassword !== data.repeatPassword) {
      setGlobalState(
        newAlert({
          mode: "warning",
          message: dictionary.notMatchPassword[lang],
          time: 4,
        })
      );
      return;
    }
    return await fetchapi("/user/", "OPTIONS", (data = data))
      .then((response) => {
        const code = response.code;
        const mode = code === "200" ? "success" : "warning";
        switch (code) {
          case "200":
            setModalVerification(undefined);
            setGlobalState(newUserState(response.data));
            router.push("/user");
            break;
          case "400":
            setModalVerification(undefined);
            break;
          case "201":
            setModalVerification(
              <Verification
                key={Math.random()}
                action={resetPassword}
                data={data}
                timeRemaining={response.data.timeRemaining}
                lang={lang}
              />
            );
            return;
          case "4004":
            return (
              <Alert
                alert={{
                  message: responseMessageFinder(dictionary, lang, code),
                  mode: "warning",
                }}
              />
            );
          case "4003":
            setModalVerification(undefined);
            break;
          default:
            break;
        }
        setGlobalState(
          newAlert({
            message: responseMessageFinder(dictionary, lang, code),
            mode: mode,
            time: 4,
          })
        );
      })
      .catch((resson) => {
        setGlobalState(connectionErrorAlert(lang));
      });
  }
  return (
    <div className="mx-auto max-w-md px-3">
      <UseFormTemplate form={form} action={resetPassword} />
      {modalVerification ? modalVerification : null}
    </div>
  );
};

export default Page;
