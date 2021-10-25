import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";

const FilteredEventsPage = (props) => {
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }
  //
  // const filterYear = filterData.at(0);
  // const filterMonth = filterData.at(1);
  //
  // const numYear = +filterYear;
  // const numMonth = +filterMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter Please Adjust Your Value</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Event</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter Please Adjust Your Value</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Event</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const filterData = params.slug;
  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        // notFound: true,
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};

export default FilteredEventsPage;
