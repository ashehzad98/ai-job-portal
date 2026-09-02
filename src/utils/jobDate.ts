function parseJobDate(dateValue: string) {
  return new Date(`${dateValue}T00:00:00Z`);
}

function formatPostedDate(dateValue: string) {
  const postedDate = parseJobDate(dateValue);
  const currentDate = new Date();

  const differenceInMilliseconds =
    currentDate.getTime() - postedDate.getTime();

  const differenceInDays = Math.max(
    0,
    Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)),
  );

  if (differenceInDays === 0) {
    return "Today";
  }

  if (differenceInDays === 1) {
    return "Yesterday";
  }

  return `${differenceInDays} days ago`;
}

function formatExactDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseJobDate(dateValue));
}

export { formatExactDate, formatPostedDate };