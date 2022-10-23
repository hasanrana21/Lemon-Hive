import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";

const Schedule = () => {
  const [conferences, setConferences] = useState([]);
  const conferencesQuery = `
    query{
        conferences{
          id,
          name,
          startDate,
          schedules{
            day,
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
        setConferences(res.data.data.conferences);
      });
  };
  useEffect(() => {
    fetchConferences();
  }, []);
  console.log("conferences", conferences);
  return (
    <div className="p-7">
      <h3 className="text-4xl font-medium mb-6">Event Schedule</h3>
      <p className="text-lg leading-8">
        Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id
        fermentum.
      </p>
      <table className="min-w-full mt-14">
        <thead>
          <tr>
            <th className={styles.th}></th>
            <th className={styles.th}>Mon</th>
            <th className={styles.th}>Tue</th>
            <th className={styles.th}>Wed</th>
            <th className={styles.th}>Thu</th>
            <th className={styles.th}>Fri</th>
            <th className={styles.th}>Sat</th>
            <th className={styles.th}>Sun</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>asfda</td>
            <td className={styles.td}>asdfa</td>
            <td className={styles.td}>asdfasdf</td>
            <td className={styles.td}>asdfasdf</td>
            <td className={styles.td}>asdfasdf</td>
            <td className={styles.td}>asdfasdf</td>
            <td className={styles.td}>asdfasdf</td>
            <td className={styles.td}>asdfasdf</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
