const ConvertTimeToUTC = (localDateString) => {
  const localDate = new Date(localDateString);
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  );
  return utcDate;
};

module.exports = ConvertTimeToUTC;
