import type { CompanyContent } from "../publication/content";

const weekdayNames = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

export function formatHours(hours: CompanyContent["hours"]): string {
  const names = hours.days.map((day) => weekdayNames[day]);
  const weekdays = Object.keys(weekdayNames);
  const continuous = hours.days.every(
    (day, index) =>
      index === 0 ||
      weekdays.indexOf(day) === weekdays.indexOf(hours.days[index - 1]) + 1,
  );
  const label =
    names.length > 1 && continuous
      ? names[0] + " a " + names[names.length - 1]
      : names.join(", ");
  return (
    label.charAt(0).toUpperCase() +
    label.slice(1) +
    " · " +
    hours.opens +
    "–" +
    hours.closes
  );
}
