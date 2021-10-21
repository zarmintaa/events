import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

const AllEventsPAge = () => {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPAge;
