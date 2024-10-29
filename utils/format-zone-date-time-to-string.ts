const formatZonedDateTime = (dateObj) => {
  const year = dateObj.year;
  const month = String(dateObj.month).padStart(2, '0');
  const day = String(dateObj.day).padStart(2, '0');
  const hours = String(dateObj.hour).padStart(2, '0');
  const minutes = String(dateObj.minute).padStart(2, '0');
  const seconds = String(dateObj.second).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default formatZonedDateTime;
