import React, { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";

const Schedule = () => {
  const [conferences, setConferences] = useState([]);
  const [years, setYears] = useState([]);

  const conferencesQuery = `
    query{
        conferences{
          id,
          name,
          startDate,
    			endDate,
          year,
    			slogan,
    			websiteUrl
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
        const allYears = [];
        setConferences(allConferences);
        allConferences.map((conference) => {
          // console.log(conference);
          allYears.push(conference.name);
        });
        setYears(allYears);
      });
  };
  useEffect(() => {
    fetchConferences();
  }, []);
  return (
    <div className="m-7 overflow-x-scroll">
      <h3 className="text-4xl font-medium mb-6">Event Schedule</h3>
      <p className="text-lg leading-8">
        Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id
        fermentum.
      </p>
      <table className="mt-14">
        <thead>
          <tr>
            {years.map((year, key) => (
              <th key={key} className={styles.th}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {conferences.map((item, index) => (
              <Link href={`conference/${item.id}`} key={index}>
                <td className={styles.td}>
                  <div className="w-48 bg-primary-1/10 px-3 py-1 border border-primary-3 rounded cursor-pointer">
                    <p>{item.slogan}</p>
                    <p>
                      {item?.startDate} to {item?.endDate}
                    </p>
                  </div>
                </td>
              </Link>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
