export const convertNumbertoBrazilian = (num: number): string => {
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  });
};
