import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <>
        <h1 className="text-4xl text-white font-extrabold">Hi, I'm <span className="text-primary">Korrawit</span></h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-accent">
            Full Stack Developer
          </h1>
          <p className="max-w-md text-lg text-white leading-8">
           I'm a Software Engineer focused on building scalable systems, solving challenging problems, and turning ideas into software that works.
          </p>
        </div>
        </>
        <>
        <div></div>
        </>
      </main>
    </div>
  );
}
