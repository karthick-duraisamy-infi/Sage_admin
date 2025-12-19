const truncateString = (label: string, maxLength: number = 15): string => {
  if (!label) return "";

  const trimmed = label.trim();

  if (trimmed.length > maxLength) {
    // Subtract 2 to account for '...'
    return trimmed.substring(0, maxLength) + "...";
  }

  return trimmed;
};

// Function to format date strings
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export { truncateString, formatDate };