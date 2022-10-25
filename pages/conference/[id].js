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
  const [detailsData, setDetailsData] = useState(null);
  const [conferenceInfo] = useState({
    Organizer: {},
    Speakers: {},
    Location: {},
    Schedule: {},
    Sponsors: {},
  });
  const detailsQuery = `
    query{
        conference(id: "${id}"){
            id,
            startDate,
    	    endDate,
            year,
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
        const conference = res.data.data?.conference;
        console.log("res", conference);
        conferenceInfo.Organizer = conference?.organizers;
        conferenceInfo.Speakers = conference?.speakers;
        conferenceInfo.Location = conference?.locations;
        conferenceInfo.Schedule = conference?.schedules;
        conferenceInfo.Sponsors = conference?.sponsors;
      });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log("conferenceInfo", conferenceInfo);

  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  return (
    <MainLayout>
      <Tab.Group>
        <div className="grid grid-flow-row grid-cols-12 gap-x-4">
          <Tab.List className="col-span-3 rounded-xl p-2">
            {Object.keys(conferenceInfo).map((conference, key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-4 text-lg text-primary-3 font-medium leading-5 border my-2",
                    selected
                      ? "bg-primary-1 text-white shadow focus:outline-none"
                      : ""
                  )
                }
              >
                <span className="mdi mdi-network-strength-3 text-2xl mr-2">
                </span>
                {conference}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="col-span-9 mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className="ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="relative rounded-md p-3 hover:bg-gray-100"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>

                      <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{post.date}</li>
                        <li>&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li>&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>

                      <a
                        href="#"
                        className="ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </MainLayout>
  );
};

export default Conference;
