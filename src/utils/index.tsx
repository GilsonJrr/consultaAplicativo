export const uidGenerator = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};

export const updateDateTime = (originalDateString: Date, newTime: string) => {
  var originalDate = new Date(originalDateString);

  var [hours, minutes] = newTime.split(':');
  originalDate.setUTCHours(Number(hours), Number(minutes), 0, 0);

  var updatedDateString = originalDate.toISOString();

  return updatedDateString;
};
