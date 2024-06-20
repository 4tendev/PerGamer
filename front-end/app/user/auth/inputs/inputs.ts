import { Lang } from "@/GlobalStates/Slices/languageSlice";
import dictionary from "./dictionary.json";
import { Input } from "@/app/UseForm/UseFormTemplate";
 
export function passwordInput(lang: Lang): Input {
  return {
    type: "password",
    placeHolder: dictionary["password"][lang],
    name: "password",
    validations: { required: true, minLength: 8 },
    validationsMSG: {
      required: dictionary["required"][lang],
      minLength: dictionary["eightChar"][lang],
    },
  };
}

export function trustedDeviceInput(lang: Lang): Input {
  return {
    type: "checkbox",
    placeHolder: dictionary["trustedDevice"][lang],
    name: "trustedDevice",
  };
}

export function acceptRulesInput(lang: Lang): Input {
  return {
    type: "checkbox",
    placeHolder: dictionary["acceptRules"][lang],
    name: "acceptRule",
    validations: { required: true },
    validationsMSG: {
      required: dictionary["required"][lang],
    },
  };
}

export function emailInput(lang: Lang): Input {
  return {
    type: "text",
    placeHolder: dictionary["email"][lang],
    name: "email",
    validations: {
      required: true,
      pattern:
        /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/,
    },
    validationsMSG: {
      required: dictionary["required"][lang],
      pattern: dictionary["emailFormatError"][lang],
    },
  };
}
export function emailOrMobileInput(lang: Lang): Input {
  return {
    type: "text",
    placeHolder: dictionary["emailOrMobile"][lang],
    name: "emailOrMobile",
    validations: {
      required: true,

      pattern:
        /^(?:[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}|09[0-9]{9})$/,
    },
    validationsMSG: {
      required: dictionary["required"][lang],
      pattern: dictionary["emailOrMobileFormatError"][lang],
    },
  };
}

export function emailCodeInput(lang: Lang): Input {
  return {
    autoFocus: true,
    type: "number",
    placeHolder: dictionary["emailCode"][lang],
    name: "emailCode",
    validations: { required: true, maxLength: 6, minLength: 6 },
    validationsMSG: {
      required: dictionary["required"][lang],
      maxLength: dictionary["sixDigit"][lang],
      minLength: dictionary["sixDigit"][lang],
    },
  };
}


export function repeatPasswordInput(lang: Lang): Input {
  const repeatPasswordInput = passwordInput(lang);
  repeatPasswordInput.name = "repeatPassword";
  repeatPasswordInput.placeHolder = dictionary["repeat"][lang];
  return repeatPasswordInput;
}
export function newPasswordInput(lang: Lang): Input {
  return {
    type: "password",
    placeHolder: dictionary["newPassword"][lang],
    name: "newPassword",
    validations: { required: true, minLength: 8 },
    validationsMSG: {
      required: dictionary["required"][lang],
      minLength: dictionary["eightChar"][lang],
    },
  };
}
