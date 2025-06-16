import { useState } from "react";
import Uik from "@reef-chain/ui-kit";
import Header from "../components/Layout/Header";

export default function Home() {
  const { Button, ReefLogo } = Uik;

  return (
    <>
      <div className="min-h-screen bg-[#f4f1fc]">
        <Header />
      </div>
    </>
  );
}
