import Image from "next/image";
import React from "react";
import image from "../../../public/underConstruction.svg";
function SchedulerRoute() {
  return (
    <div className="mx-auto mt-10 justify-center items-center">
      <h1 className="text-purple-800 text-4xl mb-5">
        This page is Under Construction... Thank you for your patience
      </h1>

      <Image src={image} alt="under construction" priority />
    </div>
  );
}
export default SchedulerRoute;
