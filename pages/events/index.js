import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventSearch from "./../../components/events/events-search";
import { useRouter } from "next/router";
import Head from "next/head";

const AllEventsPAge = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events you will find out!"
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
};

export default AllEventsPAge;
