import LinkedInIcon from "./global/icons/linkedin";
import GithubIcon from "./global/icons/github";
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 flex-col justify-center w-full 2xl:max-w-1/2 items-center justify-between xl:py-32 md:px-16 sm:items-start">
        <div className="w-full flex flex-wrap flex-row min-h-3/4 p-5">
          <div className="grow content-center">
            <h1 className="text-4xl text-white font-extrabold md:text-start text-center">Hi, I'm <span className="text-primary">Korrawit</span></h1>
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
              <h1 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-secondary">
                Full Stack Developer
              </h1>
              <p className="max-w-md text-lg text-white leading-8">
                I'm a Software Engineer focused on building scalable systems, solving challenging problems, and turning ideas into software that works.
              </p>
            </div>
            <div className="flex">
              <LinkedInIcon className="m-2" />
              <GithubIcon className="m-2" />
            </div>
          </div>
          <div className="lg:flex flex-col justify-center self-center hidden w-1/3">
            <img src={"/profile.jpg"} alt="profile"/>
          </div>
        </div>
      </main>
    </div>
  );
}
