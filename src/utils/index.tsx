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

export const timesArrayGenerator = (
  startTime: string,
  endTime: string,
  intervalGap: number,
) => {
  const _startTime = new Date(`2024-01-01 ${startTime}`);
  const _finishTime = new Date(`2024-01-01 ${endTime}`);
  const horas = [];

  let _timeNow = new Date(_startTime);
  while (_timeNow <= _finishTime) {
    horas.push(
      _timeNow.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    );
    _timeNow.setMinutes(_timeNow.getMinutes() + intervalGap);
  }

  return horas;
};
