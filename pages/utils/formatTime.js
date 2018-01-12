module.exports = ({offset = 0}) => {
  let timeObj = {};

  //GMT -8
  const zoneOffset = -8;
  const nowDate = new Date();
  const now = nowDate.getTime();
  const offsetMilliSecond = nowDate.getTimezoneOffset() * 60 * 1000;
  const currentZoneDate = new Date(now + offsetMilliSecond + zoneOffset * 60 * 60 * 1000);

  const timestamp = (currentZoneDate).getTime() - offset * 24 * 60 * 60 * 1000;
  const time = new Date(timestamp);
  let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let month = time.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  const year = time.getFullYear();

  let day = '';
  const dayIndex = time.getDay();

  if (offset == 0) {
    day = 'Today';
  } else if (offset == 1) {
    day = 'Yesterday';
  } else {
    day = dayList[time.getDay()];
  }

  return { year, month, date, day, dayIndex };
};