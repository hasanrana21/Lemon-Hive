import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/layouts/MainLayout";
import Banner from "../components/main/home/Banner";
import Schedule from "../components/main/home/Schedule";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lemon Hive</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout className={styles.main}>
        <Banner />
        <Schedule />
      </MainLayout>
    </div>
  );
}
