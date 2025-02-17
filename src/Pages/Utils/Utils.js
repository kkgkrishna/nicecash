export const Utils = {
  getLastNDays(n) {
    const days = [];
    const options = { weekday: "long" };
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      let dayName = date.toLocaleDateString("en-US", options);
      let formattedDate = `${String(date.getDate()).padStart(2, "0")}-${
        monthNames[date.getMonth()]
      }-${date.getFullYear()}`;

      if (date.toDateString() === today.toDateString()) {
        days.push({ date: "Today", day: dayName });
      } else if (date.toDateString() === yesterday.toDateString()) {
        days.push({ date: "Yesterday", day: dayName });
      } else {
        days.push({ date: formattedDate, day: dayName });
      }
    }

    return days;
  },

  getLast10DaysFromDate(inputDate) {
    const days = [];
    const options = { weekday: "long" };
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const baseDate = new Date(inputDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    for (let i = 0; i < 10; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - i);

      let dayName = date.toLocaleDateString("en-US", options);
      let formattedDate = `${String(date.getDate()).padStart(2, "0")}-${
        monthNames[date.getMonth()]
      }-${date.getFullYear()}`;

      if (date.toDateString() === today.toDateString()) {
        days.push({ date: "Today", day: dayName });
      } else if (date.toDateString() === yesterday.toDateString()) {
        days.push({ date: "Yesterday", day: dayName });
      } else {
        days.push({ date: formattedDate, day: dayName });
      }
    }

    return days;
  },
};
