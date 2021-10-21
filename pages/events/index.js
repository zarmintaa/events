import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";
import { Fragment } from "react";
import EventSearch from "./../../components/events/events-search";
import { useRouter } from "next/router";
const AllEventsPAge = () => {
  const router = useRouter();
  const events = getAllEvents();
  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPAge;
