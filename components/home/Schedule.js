import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
// import Link from "next/link";

const Schedule = () => {
  const [datas, setDatas] = useState([]);
  const [maxData, setMaxData] = useState(0);

  const conferencesQuery = `
    query{
        conferences{
          id,
          name,
          startDate,
          year,
          schedules{
            day,
            description,
            location{
              address,
              city,
              country{
                name
              }
            }
            intervals{
              begin,
              end
            }
          }
        },
      }
    `;
  const fetchConferences = () => {
    axios
      .post("https://api.react-finland.fi/graphql/", {
        query: conferencesQuery,
      })
      .then((res) => {
        const allConferences = res.data.data.conferences;
        const allData = [];
        const maxData = [];
        allConferences.map((conference) => {
          conference.schedules.map((item) => {
            allData.push(item);
            console.log(item);
            maxData.push(item.intervals.length);
          });
        });
        setMaxData(Math.max(...maxData));
        setDatas(allData);
      });
  };
  useEffect(() => {
    fetchConferences();
  }, []);
  // console.log("maxData", maxData);
  return (
    <div className="p-7">
      <h3 className="text-4xl font-medium mb-6">Event Schedule</h3>
      <p className="text-lg leading-8">
        Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id
        fermentum.
      </p>
      <table className="min-w-full mt-14">
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}></th>
            {[...Array(maxData)].map((item, key) => (
              <th key={key} className={styles.th}>
                Session {key + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, key) => (
            <tr key={key} className={styles.tr}>
              <td className={styles.td}>{data?.day}</td>
              {data.intervals.map((interval, index) => (
                <td key={index} className={styles.td}>
                  <div className="border border-primary-1 px-4 py-2 rounded bg-primary-1/10">
                    {/* {data.location?.address}, &nbsp;
                    {data.location?.city}, &nbsp;
                    {data.location?.country?.name} */}
                    {data?.description}
                    <p>
                      {interval?.begin}--{interval?.end}
                    </p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
