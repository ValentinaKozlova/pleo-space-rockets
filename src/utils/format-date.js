import moment from "moment-timezone"

export function formatDateTimeMoment(timestamp) {
  const offset = moment(timestamp)._tzm/60
  return moment(timestamp).utcOffset(offset).format(('dddd, MMMM Do YYYY, h:mm:ss a'));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}
