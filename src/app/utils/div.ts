export const div = (dividendo: number, divisor: number) => {
  if (divisor === 0) {
    throw new Error("Divisor cannot be zero");
  }

  const absDividendo = Math.abs(dividendo);
  const absDivisor = Math.abs(divisor);
  let acc = absDivisor;
  let contador = 0;

  while (acc <= absDividendo) {
    acc += absDivisor;
    contador++;
  }

  // Ajustar o sinal do contador para corresponder ao sinal do dividendo e do divisor
  const sign = (dividendo < 0) === (divisor < 0) ? 1 : -1;
  return contador * sign;
};