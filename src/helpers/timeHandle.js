const TweetPostTime = (TweetTime, timeNow) => {
  if (
    parseInt(timeNow.split("/")[2].split(",")[0]) >
    parseInt(TweetTime.split("/")[2].split(",")[0])
  ) {
    var years =
      parseInt(timeNow.split("/")[2].split(",")[0]) -
      parseInt(TweetTime.split("/")[2].split(",")[0]);
    return years + " years";
  } else if (
    parseInt(timeNow.split("/")[0]) > parseInt(TweetTime.split("/")[0])
  ) {
    var month =
      parseInt(timeNow.split("/")[0]) - parseInt(TweetTime.split("/")[0]);
    return month + " month";
  } else if (
    parseInt(timeNow.split("/")[1]) > parseInt(TweetTime.split("/")[1])
  ) {
    var days =
      parseInt(timeNow.split("/")[1]) - parseInt(TweetTime.split("/")[1]);
    return days + " day";
  } else if (
    parseInt(timeNow.split(" ")[1].split(":")[0]) >
    parseInt(TweetTime.split(" ")[1].split(":")[0])
  ) {
    var hours =
      parseInt(timeNow.split(" ")[1].split(":")[0]) -
      parseInt(TweetTime.split(" ")[1].split(":")[0]);
    if (timeNow.split(" ")[2] === TweetTime.split(" ")[2])
      return hours + " hours";
    else return hours + 12 + " hours";
  } else if (
    parseInt(timeNow.split(" ")[1].split(":")[1]) >
    parseInt(TweetTime.split(" ")[1].split(":")[1])
  ) {
    var min =
      timeNow.split(" ")[1].split(":")[1] -
      TweetTime.split(" ")[1].split(":")[1];
    return min + " minute";
  } else return "just now";
};

export default TweetPostTime;
