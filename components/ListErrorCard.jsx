import React from "react";

const ListErrorCard = ({ errorMsg, errorPrompt, icon }) => {
  return (
    <div className="border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2 h-72 m-auto">
      <div className="flex flex-col justify-center h-full gap-6">
        <div className="flex w-full justify-center">
          {/* <FaFileCircleQuestion size={50} /> */}
          {icon}
        </div>
        <div>
          <p className="text-center">{errorMsg}</p>
          <p className="text-center">{errorPrompt}</p>
        </div>
      </div>
    </div>
  );
};

export default ListErrorCard;
