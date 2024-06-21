import { Duration } from "luxon";

const convertDurationToMs = (duration: string): number => {
  let durationInMs: number;
  const time = Number(duration.slice(0, -1));

  switch (duration.slice(-1)) {
    // Minutes
    case "m": {
      durationInMs = Duration.fromObject({ minutes: time }).as("milliseconds");
      break;
    }

    // Days
    case "d": {
      durationInMs = Duration.fromObject({ days: time }).as("milliseconds");
      break;
    }

    default: {
      durationInMs = -1;
    }
  }

  return durationInMs;
};

export default convertDurationToMs;
