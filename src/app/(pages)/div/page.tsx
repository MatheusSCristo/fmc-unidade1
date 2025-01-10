"use client";
import { div } from "@/app/utils/div";
import Link from "next/link";
import { useState } from "react";

interface Error {
  divisor: {
    message: string | null;
  };
  dividendo: {
    message: string | null;
  };
}

const Div = () => {
  const [dividendo, setDividendo] = useState<number>(0);
  const [divisor, setDivisor] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [execTime, setExecTime] = useState<number>(0);
  const [error, setError] = useState<Error>({
    divisor: { message: null },
    dividendo: { message: null },
  });


  const handleResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const initalTime = performance.now();
    setError({} as Error);
    if (divisor === 0) {
      setError({
        ...error,
        divisor: { message: "O divisor não pode ser 0" },
      });
      return;
    }
    if (isNaN(dividendo) || parseInt(dividendo.toString()) !== dividendo) {
      setError({
        ...error,
        dividendo: { message: "O dividendo deve ser um número" },
      });
      return;
    }
    if (isNaN(divisor) || parseInt(divisor.toString()) !== divisor) {
      setError({
        ...error,
        divisor: { message: "O divisor deve ser um número inteiro" },
      });
      return;
    }
    const res = div(dividendo, divisor);
    const finalTime = performance.now();
    setExecTime(finalTime - initalTime);
    setResult(res);
  };

  const handleDividendo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    if (number > 9999999999) return;
    setDividendo(number);
  };

  const handleDivisor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (isNaN(number)) return;
    setDivisor(number);
  };

  return (
    <main className="relative bg-primary flex flex-col w-screen h-screen flex justify-center items-center">
      <Link
        href={"/"}
        className="bg-white px-5 py-2 absolute top-5 left-5 rounded"
      >
        Menu
      </Link>
      <h1 className="absolute top-[10%] text-[4rem] text-white uppercase font-medium">
        DIV
      </h1>
      <div className="flex flex-col items-center bg-white border border-black p-5 rounded-md w-2/5 gap-5">
        <form
          onSubmit={handleResult}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="font-medium text-xl">Calcular o DIV </h2>
          <div className="flex flex-col">
            <input
              type="text"
              value={dividendo}
              onChange={(e) => {
                handleDividendo(e);
              }}
              placeholder="Digite o dividendo"
              className="border px-5 py-2 rounded-lg border-gray-400"
            />
            {error.dividendo?.message && (
              <span className="text-red-500">{error.dividendo.message}</span>
            )}
          </div>
          <span><strong>DIV</strong></span>
          <div className="flex-col flex">
            <input
              type="text"
              value={divisor}
              onChange={(e) => {
                handleDivisor(e);
              }}
              placeholder="Digite o divisor"
              className="border px-5 py-2 rounded-lg border-gray-400"
            />
            {error.divisor?.message && (
              <span className="text-red-500">{error.divisor.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="border border-gray-400 px-6 py-2 rounded-lg"
          >
            Calcular
          </button>
        </form>
        <span>
          <strong>Resultado:</strong> {result.toLocaleString("pt-br")}
        </span>
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

export default Div;