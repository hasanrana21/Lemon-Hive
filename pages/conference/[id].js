import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MainLayout from "../../components/layouts/MainLayout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Conference = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [conferenceInfo, setConferenceInfo] = useState([]);
  const [menus, setMenus] = useState([]);
  const dragContent = useRef(null);
  const dragOverContent = useRef(null);
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
        const conference = res.data.data.conference;

        // SET SIDEMENU LABEL
        let labels = [];
        let lists = Object.entries(conference).map((item) => {
          labels.push(item[0]);
          return item;
        });
        setMenus(labels);

        // SET LIST OF CONFERENCE
        setConferenceInfo(lists);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const sortableContent = () => {
    let contents = [...conferenceInfo];

    // DRAG AND DROP
    let draggedItem = contents.splice(dragContent.current, 1)[0];
    contents.splice(dragOverContent.current, 0, draggedItem);

    // SET SIDEMENU LABEL
    let labels = [];
    contents.map((item) => {
      labels.push(item[0]);
    });
    setMenus(labels);

    // SET DRAG AND DROP MENU
    setConferenceInfo(contents);
  };

  return (
    <MainLayout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tabs className="grid grid-flow-row grid-cols-12 gap-x-4">
          {/* SIDEMENU LISTS */}
          <TabList className="col-span-3 rounded-xl p-2">
            {menus.map((conference, key) => (
              <Tab
                draggable
                onDragStart={(e) => (dragContent.current = key)}
                onDragEnter={(e) => (dragOverContent.current = key)}
                onDragEnd={sortableContent}
                onDragOver={(e) => e.preventDefault()}
                key={key}
                className="list w-full rounded-lg text-xl  text-primary-3 font-medium leading-5 border my-2"
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
                  <span className="ml-4">{conference}</span>
                </div>
              </Tab>
            ))}
          </TabList>

          {/* CONFERENCES CONTENT */}
          <div className="col-span-9 mt-2">
            <TabPanel className="px-5">
              {conferenceInfo[0]?.length ? (
                conferenceInfo[0][1]?.map((item, index) => (
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
                <div className="text-center text-lg border border-primary-3 rounded py-4">
                  No Data Found
                </div>
              )}
            </TabPanel>
            <TabPanel className="px-5">
              {conferenceInfo[1]?.length ? (
                conferenceInfo[1][1]?.map((item, index) => (
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
                <div className="text-center text-lg border border-primary-3 rounded py-4">
                  No Data Found
                </div>
              )}
            </TabPanel>
            <TabPanel className="px-5">
              {conferenceInfo[2]?.length ? (
                conferenceInfo[2][1]?.map((item, index) => (
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
                <div className="text-center text-lg border border-primary-3 rounded py-4">
                  No Data Found
                </div>
              )}
            </TabPanel>
            <TabPanel className="px-5">
              <div className="grid grid-flow-rows grid-cols-3 gap-6">
                {conferenceInfo[3]?.length ? (
                  conferenceInfo[3][1]?.map((item, index) => (
                    <div
                      key={index}
                      className="col-span-1 border border-primary-3 p-5 mb-5 rounded"
                    >
                      <h3 className="text-xl font-medium mb-2">{item?.day}</h3>
                      <p className="text-lg">{item?.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg border border-primary-3 rounded py-4">
                    No Data Found
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel className="px-5">
              {conferenceInfo[4]?.length ? (
                conferenceInfo[4][1]?.map((item, index) => (
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
                <div className="text-center text-lg border border-primary-3 rounded py-4">
                  No Data Found
                </div>
              )}
            </TabPanel>
          </div>
        </Tabs>
      )}
    </MainLayout>
  );
};

export default Conference;
