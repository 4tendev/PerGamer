"use client";
import React from "react";

import { useAppSelector } from "@/GlobalStates/hooks";
import { isKnown } from "@/GlobalStates/Slices/userSlice";

import CheckUser from "./CheckUser";

import UserProfile from "./UserProfile/UserProfile";
import LinkSvg from "../LinkSvg";
import NavbarSvges from "../NavbarSvg";

const Profile = () => {
  const userisKnown = useAppSelector(isKnown);

  return userisKnown === undefined ? (
    <CheckUser />
  ) : userisKnown === true ? (
    <UserProfile />
  ) : (
    <LinkSvg svg={NavbarSvges().profile} link="/user/auth"/>

  );
};

export default Profile;
