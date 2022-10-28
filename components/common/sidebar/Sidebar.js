import React, { useState } from "react";

const Sidebar = () => {
  const [menus, setMenus] = useState([
    {
      label: "Organizer",
      value: "organizers",
    },
    {
      label: "Speakers",
      value: "speakers",
    },
    {
      label: "Location",
      value: "locations",
    },
    {
      label: "Schedule",
      value: "schedules",
    },
    {
      label: "Sponsors",
      value: "sponsors",
    },
  ]);
  return (
    <div>
      {menus.map((conference, key) => (
        <div
          draggable
          key={key}
          className="w-full rounded-lg text-xl  text-primary-3 font-medium leading-5 border my-2"
        >
          <div className="px-8 py-4 text-left flex items-center cursor-pointer">
            <svg
              width="29"
              height="26"
              viewBox="0 0 29 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 24L17 19.1111M7 2V24V2ZM7 2L12 6.88889L7 2ZM7 2L2 6.88889L7 2ZM22 24V2V24ZM22 24L27 19.1111L22 24Z"
                stroke="#FFC93E"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="ml-4">{conference.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
