import Link from "next/link";

export default function Home() {
  const buttons = [
    {
      name: "Encontrar o piso",
      url: "/piso",
    },
    {
      name: "Encontrar o teto",
      url: "/teto",
    },
    {
      name: "Calcular a div",
      url: "/div",
    },
    {
      name: "Calcular o mod",
      url: "/mod",
    },
    {
      name:"Primos",
      url:"/primos"
    }
  ];

  return (
    <main className="relative bg-primary flex flex-col w-screen h-screen flex justify-center items-center">
      <h1 className="absolute top-[10%] text-[4rem] text-white uppercase ">Fundamentos Matemáticos da Computação I</h1>
      <div className="flex flex-col gap-5">
        {buttons.map((button) => (
          <Button button={button} key={button.url} />
        ))}
      </div>
    </main>
  );
}

interface ButtonProps {
  button: {
    name: string;
    url: string;
  };
}
const Button = ({ button }: ButtonProps) => {
  const { name, url } = button;
  return (
    <Link
      href={url}
      className="bg-white w-96 p-5 rounded-md text-xl font-medium text-center"
    >
      {name}
    </Link>
  );
};
