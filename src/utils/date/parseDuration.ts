export type ParsedDurationInfo = Record<
  "days" | "hours" | "minutes" | "seconds" | "milliseconds" | "full",
  number
>;
/**
 * each time property includes full time
 * @example
 * parseDurationAbsolute(5 * 60 * 1000) // {full: 5 * 60 * 1000, day: 5/24/60, hour: 5/60  minutes: 5, secends: 5 * 60, milliseconds: 5 * 60 * 1000 }
 */
export function parseDurationAbsolute(duration: number): ParsedDurationInfo {
  return {
    full: duration,
    days: duration / 24 / 60 / 60 / 1000,
    hours: duration / 60 / 60 / 1000,
    minutes: duration / 60 / 1000,
    seconds: duration / 1000,
    milliseconds: duration,
  };
}
