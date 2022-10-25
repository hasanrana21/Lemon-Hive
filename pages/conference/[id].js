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
            id,
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
                city
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
  });
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
                      "w-full rounded-lg py-4 text-xl text-primary-3 font-medium leading-5 border my-2",
                      selected
                        ? "bg-primary-1 text-white shadow focus:outline-none"
                        : ""
                    )
                  }
                >
                  <span className="mdi mdi-network-strength-3 text-2xl mr-2"></span>
                  {conference}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="col-span-9 mt-2">
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.organizers?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-primary-3 p-5 mb-5 rounded"
                  >
                    <h3 className="text-xl font-medium mb-2">
                      {item?.firstName + " " + item?.lastName}
                    </h3>
                    <p className="text-lg">{item?.about}</p>
                  </div>
                ))}
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">
                {conferenceInfo.speakers?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-primary-3 p-5 mb-5 rounded"
                  >
                    <h3 className="text-xl font-medium mb-2">
                      {item?.firstName + " " + item?.lastName}
                    </h3>
                    <p className="text-lg">{item?.about}</p>
                  </div>
                ))}
              </Tab.Panel>
              <Tab.Panel className="px-5 py-10">asdfadf 333</Tab.Panel>
              <Tab.Panel className="px-5 py-10">asdfadf 444</Tab.Panel>
              <Tab.Panel className="px-5 py-10">asdfadf 555</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      )}
    </MainLayout>
  );
};

export default Conference;
