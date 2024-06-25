"use client";
import { user } from "@/GlobalStates/Slices/userSlice";
import { useAppSelector } from "@/GlobalStates/hooks";

export default function Template({ children }: { children: React.ReactNode }) {
  const userCanSell = useAppSelector(user).canSell;

  return userCanSell === false ? (
    <div className="w-full flex justify-center">You cant Sell</div>
  ) : (
    <>{children}</>
  );
}
