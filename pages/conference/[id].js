import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layouts/MainLayout";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Conference = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [conferenceInfo, setConferenceInfo] = useState({});
  const detailsQuery = `
    query{
        conference(id: "${id}"){
            organizers{
                firstName,
                lastName,
                about
              },
            speakers{
                firstName,
                lastName,
                about
              }
            locations{
                address,
                city,
                about,
                country{
                  name
                }
              }
            schedules{
                day,
                description
              }
            sponsors{
                firstName,
                lastName,
                about
              }
        },
      }
    `;
  const fetchDetails = () => {
    axios
      .post("https://api.react-finland.fi/graphql/", {
        query: detailsQuery,
      })
      .then((res) => {
        setLoading(true);
        console.log("res", conference);
        const conference = res.data.data.conference;
        setConferenceInfo(conference);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDetails();
  }, [detailsQuery]);
  console.log("conferenceInfo", conferenceInfo);
  return (
    <MainLayout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tab.Group>
          <div className="grid grid-flow-row grid-cols-12 gap-x-4">
            <Tab.List className="col-span-3 rounded-xl p-2">
              {Object.keys(conferenceInfo).map((conference, key) => (
                <Tab
                  key={key}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg px-8 py-4 text-xl text-left text-primary-3 font-medium leading-5 border my-2",
                      selected
                        ? "bg-primary-1 text-white shadow focus:outline-none"
                        : ""
                    )
                  }
                >
                  <span className="flex items-center">
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
                    <span className="ml-4">{conference}</span>
                  </span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="col-span-9 mt-2">
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.organizers.length > 0 ? (
                  conferenceInfo.organizers?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-primary-3 p-5 mb-5 rounded"
                    >
                      <h3 className="text-xl font-medium mb-2">
                        {item?.firstName + " " + item?.lastName}
                      </h3>
                      <p className="text-lg">{item?.about}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg border border-primary-3 rounded py-4">No Data Found</div>
                )}
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.speakers.length > 0 ? (
                  conferenceInfo.speakers?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-primary-3 p-5 mb-5 rounded"
                    >
                      <h3 className="text-xl font-medium mb-2">
                        {item?.firstName + " " + item?.lastName}
                      </h3>
                      <p className="text-lg">{item?.about}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg border border-primary-3 rounded py-4">No Data Found</div>
                )}
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.locations.length > 0 ? (
                  conferenceInfo.locations?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-primary-3 p-5 mb-5 rounded"
                    >
                      <h3 className="text-xl font-medium mb-2">
                        {item?.address +
                          ", " +
                          item?.city +
                          ", " +
                          item.country?.name}
                      </h3>
                      <p className="text-lg">{item?.about}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg border border-primary-3 rounded py-4">No Data Found</div>
                )}
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">
                <div className="grid grid-flow-rows grid-cols-3 gap-6">
                  {conferenceInfo.schedules.length > 0 ? (
                    conferenceInfo.schedules?.map((item, index) => (
                      <div
                        key={index}
                        className="col-span-1 border border-primary-3 p-5 mb-5 rounded"
                      >
                        <h3 className="text-xl font-medium mb-2">
                          {item?.day}
                        </h3>
                        <p className="text-lg">{item?.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-lg border border-primary-3 rounded py-4">No Data Found</div>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.sponsors.length > 0 ? (
                  conferenceInfo.sponsors?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-primary-3 p-5 mb-5 rounded"
                    >
                      <h3 className="text-xl font-medium mb-2">
                        {item?.firstName + " " + item?.lastName}
                      </h3>
                      <p className="text-lg">{item?.about}</p>
                    </div>  
                  ))
                ) : (
                  <div className="text-center text-lg border border-primary-3 rounded py-4">No Data Found</div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      )}
    </MainLayout>
  );
};

export default Conference;
