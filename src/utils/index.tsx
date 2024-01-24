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

export const ageCalculator = (dataNascimentoStr: string) => {
  const partesData: string[] = dataNascimentoStr.split('/');
  const dia: number = parseInt(partesData[0], 10);
  const mes: number = parseInt(partesData[1], 10) - 1; // Os meses em JavaScript começam do zero
  const ano: number = parseInt(partesData[2], 10);

  const dataNascimento: Date = new Date(ano, mes, dia);
  const hoje: Date = new Date();
  const anoNascimento: number = dataNascimento.getFullYear();
  const anoAtual: number = hoje.getFullYear();

  // Verifica se o aniversário já ocorreu este ano
  const aniversarioOcorreuEsteAno: boolean =
    hoje.getMonth() > dataNascimento.getMonth() ||
    (hoje.getMonth() === dataNascimento.getMonth() &&
      hoje.getDate() >= dataNascimento.getDate());

  // Calcula a idade
  const idade: number = aniversarioOcorreuEsteAno
    ? anoAtual - anoNascimento
    : anoAtual - anoNascimento - 1;

  return idade;
};
