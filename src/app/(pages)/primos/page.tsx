"use client";
import Link from "next/link";
import { useState } from "react";

interface Error {
  primeiro: {
    message: string | null;
  };
  segundo: {
    message: string | null;
  };
}

const Primos = () => {
  const [primeiro, setPrimeiro] = useState<number>(0);
  const [segundo, setSegundo] = useState<number>(0);
  const [result, setResult] = useState<number[]>([]);
  const [execTime, setExecTime] = useState<number>(0);
  const [error, setError] = useState<Error>({
    primeiro: { message: null },
    segundo: { message: null },
  });

  const isPrimo = (n: number) => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getPrimos = (a: number, b: number) => {
    const primos = [];
    for (let i = a; i <= b; i++) {
      if (isPrimo(i)) {
        primos.push(i);
      }
    }
    return primos;
  };

  const checkErrors = (a: number, b: number) => {
    if (isNaN(a) || parseInt(a.toString()) !== a) {
      setError({
        ...error,
        primeiro: { message: "O valor deve ser um número inteiro" },
      });
      return true;
    }
    if (isNaN(b) || parseInt(b.toString()) !== b) {
      setError({
        ...error,
        segundo: { message: "O valor deve ser um número inteiro" },
      });
      return true;
    }
    if (a > b) {
      setError({
        ...error,
        segundo: { message: "O segundo valor deve ser maior que o primeiro" },
      });
      return true;
    }
    return false;
  };

  const handleResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const initalTime = performance.now();
    setError({
      primeiro: { message: null },
      segundo: { message: null },
    });
    if (checkErrors(primeiro, segundo)) return;
    const finalTime = performance.now();
    setExecTime(finalTime - initalTime);
    const primos = getPrimos(primeiro, segundo);
    setResult(primos);
  };

  const handlePrimeiro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    if (number > 9999999999) return;
    setPrimeiro(number);
  };

  const handleSegundo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    setSegundo(number);
  };

  return (
    <main className="relative bg-primary flex flex-col w-screen min-h-screen flex justify-center items-center">
      <Link
        href={"/"}
        className="bg-white px-5 py-2 absolute top-5 left-5 rounded"
      >
        Menu
      </Link>
      <h1 className=" top-[10%] text-[4rem] text-white uppercase font-medium">
        Primos
      </h1>
      <div className="flex flex-col items-center bg-white border border-black p-5 rounded-md w-2/5 gap-5">
        <form
          onSubmit={handleResult}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="font-medium text-xl">Descobrir os Primos entre </h2>
          <div className="flex flex-col">
            <input
              type="text"
              value={primeiro}
              onChange={(e) => {
                handlePrimeiro(e);
              }}
              placeholder="Digite o primeiro inteiro"
              className="border px-5 py-2 rounded-lg border-gray-400"
            />
            {error.primeiro?.message && (
              <span className="text-red-500">{error.primeiro.message}</span>
            )}
          </div>
          <span>
            <strong>E</strong>
          </span>

          <div className="flex-col flex">
            <input
              type="text"
              value={segundo}
              onChange={(e) => {
                handleSegundo(e);
              }}
              placeholder="Digite o segundo inteiro"
              className="border px-5 py-2 rounded-lg border-gray-400"
            />
            {error.segundo?.message && (
              <span className="text-red-500">{error.segundo.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="border border-gray-400 px-6 py-2 rounded-lg"
          >
            Encontrar
          </button>
        </form>
        <div className="text-wrap w-full break-words text-center">
          <strong>Resultado:</strong> {result.length>0 ?    result.join(", "): `Nenhum número primo encontrado entre ${primeiro} e ${segundo}`}
        </div>
        <span>
          <strong>Tempo de execução:</strong>{" "}
          {execTime.toLocaleString("pt-br", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })}{" "}
          ms
        </span>
      </div>
    </main>
  );
};

export default Primos;
