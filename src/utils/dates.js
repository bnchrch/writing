export function formatReadingTime(minutes) {
  return `${minutes} min read`
}

export function formatPostDate(date) {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }

  return new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
