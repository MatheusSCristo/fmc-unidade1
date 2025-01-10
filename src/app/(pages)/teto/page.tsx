"use client";
import Link from "next/link";
import { useState } from "react";

interface Error {
  numero: {
    message: string | null;
  };
}

const Teto = () => {
  const [numero, setNumero] = useState<string>("0");
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<Error>({
    numero: { message: null },
  });

  const teto = (numero: string) => {
    let res = 0;
    const numeroTratado = parseFloat(numero);
    const restoPorUm= numeroTratado % 1;
    if (restoPorUm === 0) {
      console.log("numeroTratado", numeroTratado);
      return numeroTratado;
    }
    if (numeroTratado >= 0) {
      res = numeroTratado - restoPorUm + 1;
    } else {
      res = numeroTratado - restoPorUm;
    }
    return res;
  };

  const handleResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (numero === "") {
      setError({ numero: { message: "Por favor, insira um número." } });
      return;
    }
    const res = teto(numero);
    setResult(res);
    return;
  };

  const handleNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ numero: { message: null } });
    let inputValue = e.target.value.replace(",", ".");

    inputValue = inputValue.replace(/[^\d.-]/g, "");

    if (inputValue.indexOf("-") > 0) {
      inputValue = inputValue.replace(/-/g, "");
    }

    const inputParts = inputValue.split(".");
    if (inputParts.length > 2) {
      inputValue =
        inputParts[0] + "." + inputParts.slice(1).join("").replace(/\./g, "");
    }

    if (inputValue === "") {
      setNumero("");
      return;
    }

    if (/^-?0\d/.test(inputValue)) {
      inputValue = inputValue.replace(
        /^-?0+/,
        inputValue.startsWith("-") ? "-" : ""
      );
    }

    if (!/^-?\d*\.?\d*$/.test(inputValue)) {
      setError({ numero: { message: "Por favor, insira um número válido." } });
      return;
    }

    const numero = parseFloat(inputValue);
    if (inputValue != "-" && isNaN(numero)) {
      setError({ numero: { message: "Por favor, insira um número válido." } });
      return;
    }

    if (numero > 9999999999 || numero < -9999999999) {
      setError({
        numero: { message: "O número é muito grande ou muito pequeno." },
      });
      return;
    }

    setNumero(inputValue);
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
        Teto
      </h1>
      <div className="flex flex-col items-center bg-white border border-black p-5 rounded-md w-2/5 gap-5">
        <form
          onSubmit={handleResult}
          className="flex flex-col items-center gap-5"
        >
          <h2 className="font-medium text-xl">Calcular o Teto </h2>
          <div className="flex flex-col">
            <input
              type="text"
              value={numero}
              onChange={(e) => {
                handleNumero(e);
              }}
              placeholder="Digite o numero"
              className="border px-5 py-2 rounded-lg border-gray-400"
            />
            {error.numero?.message && (
              <span className="text-red-500">{error.numero.message}</span>
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
      </div>
    </main>
  );
};

export default Teto;