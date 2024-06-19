import Image from "next/image";
import React from "react";
import NavbarSvges from "../NavbarSvg";

interface ProfileImageProps {
  onClick?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-full w-fit h-fit  p-2 border border-success"
      role="button"
      tabIndex={0}
    >
      {NavbarSvges().profile}
    </div>
  );
};

export default ProfileImage;
