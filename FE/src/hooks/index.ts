export const getFormalizedDate = (dateString: string) => {
  const dateInfo = new Date(dateString);
  const year = dateInfo.getFullYear();
  const month = dateInfo.getMonth() + 1;
  const date = dateInfo.getDate();

  return `${year}.${month}.${date}`;
};
