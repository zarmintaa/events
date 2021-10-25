import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "./../../components/event-detail/event-content";
import EventLogistics from "./../../components/event-detail/event-logistics";
import Button from "./../../components/ui/button";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <Fragment>
        <div className="center">
          <p>Loading</p>
        </div>
        <div className="center">
          <Button link="/events">Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticPaths = async (context) => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const getEventId = await getEventById(eventId);

  return {
    props: {
      selectedEvent: getEventId,
    },
    revalidate: 30,
  };
};

export default EventDetailPage;
