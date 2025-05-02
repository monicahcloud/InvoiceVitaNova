import Image from "next/image";
import React from "react";
import image from "../../../public/underConstruction.svg";
function TasksRoute() {
  return (
    <div>
      <Image src={image} alt="under construction" priority />
    </div>
  );
}

export default TasksRoute;
