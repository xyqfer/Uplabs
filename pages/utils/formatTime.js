module.exports = ({offset = 0}) => {
  let timeObj = {};
  const timestamp = (new Date()).getTime() - offset * 24 * 60 * 60 * 1000;
  const time = new Date(timestamp);
  let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let month = time.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();

  let day = '';

  if (offset == 0) {
    day = 'Today';
  } else if (offset == 1) {
    day = 'Yesterday';
  } else {
    day = dayList[time.getDay()];
  }

  return { month, date, day };
};