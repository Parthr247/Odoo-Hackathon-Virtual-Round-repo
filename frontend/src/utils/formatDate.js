/**
 * Format a date into readable format
 * @param {string | Date} dateInput
 * @returns {string} formatted date (e.g. 03 Jan 2026)
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format time from Date
 * @param {string | Date} dateInput
 * @returns {string} formatted time (e.g. 09:45 AM)
 */
export const formatTime = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
