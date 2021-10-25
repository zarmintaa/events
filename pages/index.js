import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "./../components/events/event-list";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find a lot of great events you will find out!"
          adsad
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
