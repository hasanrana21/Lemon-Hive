import React from "react";
import Sidebar from "../common/sidebar/Sidebar";

const DetailsLayout = () => {
  return (
    <div className="grid grid-flow-row grid-cols-12 gap-x-4">
      <div className="col-span-3 rounded-xl p-2">
        <Sidebar />
      </div>
      <div className="col-span-9 mt-2">
        this is DetailsLayout
      </div>
    </div>
  );
};

export default DetailsLayout;
