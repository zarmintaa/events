import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "./../components/events/event-list";
import { FIREBASE_URL } from "../helpers/api-utils";

const HomePage = (props) => {
  return (
    <div>
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
  };
};

export default HomePage;
