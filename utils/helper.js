export const getTimeFromCreatePost = (created) => {
  const currentTime = new Date(Date.now()).getTime();
  const createdDateTime = new Date(created);
  const createdTime = new Date(created).getTime();
  const time = (currentTime - createdTime) / 1000;
  if (time > 0 && time < 60) return "Vừa xong";
  if (time >= 60 && time < 3600) return `${Math.floor(time / 60)} phút`;
  if (time >= 3600 && time < 86400) return `${Math.floor(time / 3600)} giờ`;
  if (time >= 86400 && time < 604800) return `${Math.floor(time / 86400)} ngày`;
  const timeString = `${createdDateTime.getDate()} Tháng ${createdDateTime.getMonth()}`;
  return timeString;
};
