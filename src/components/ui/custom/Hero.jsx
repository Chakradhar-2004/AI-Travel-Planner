import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-60 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        "Your Dream Trip, Just a Few Clicks Away!"
      </h1>
      <h3 className="font-extrabold text-[30px] text-center">
        Say goodbye to the hassle of planning. Experience seamless travel{" "}
        <span className="text-[#ffb703]">planning with the power of AI.</span>
      </h3>
      <Link to={'/create-trip'}>
        <Button>Get's Started</Button>
      </Link>
      <img src="/landingpage.jpg" alt="" className="rounded-full"/>
    </div>
  );
}
