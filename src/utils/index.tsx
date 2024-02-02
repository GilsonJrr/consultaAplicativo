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

export const timeArrayGenerator = (
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

export const dateArrayGenerator = (initDate: Date, FinDate: Date) => {
  let inicio = new Date(initDate);
  let fim = new Date(FinDate);

  if (inicio > fim) {
    console.error('Data de início deve ser anterior à data de fim');
    return [];
  }

  let arrayDeDatas = [];

  while (inicio <= fim) {
    arrayDeDatas.push(new Date(inicio));
    inicio.setDate(inicio.getDate() + 1);
  }

  return arrayDeDatas;
};

export const extractError = (err: any) => {
  const codeStart = err?.message?.indexOf('[auth/');
  const codeEnd = err?.message?.indexOf(']', codeStart);

  if (codeStart !== -1 && codeEnd !== -1) {
    const codeError = err.message.substring(codeStart + 1, codeEnd);
    return codeError;
  } else {
    return 'algo deu errado';
  }
};
