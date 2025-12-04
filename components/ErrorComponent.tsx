'use client'
import logo from "../public/logo.svg";
import Link from "next/link"
import { useRouter } from "next/navigation";
import CustomImage from "./ui/CustomImage";

 
export default function ErrorComponent() {
    const router = useRouter();
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleBackHome = () => {
    window.location.reload();
    setTimeout(() => {
      router.push('/');
    }, 1000); 
  };
  return (
    <>
    <header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a className="block text-teal-600" href="#">
      <span className="sr-only">Home</span>
      <Link  className="flex items-center lg:gap-0 md:gap-0 gap-2"href="/">
          <CustomImage src={logo} alt="kyaja logo" className="lg:w-[4rem] w-[3rem] h-[3rem] lg:h-[4rem] mt-4" />
          <div className="flex flex-col">
            <span className="font-black text-xl uppercase text-[#282828] lg:block md:block hidden">Kyaja</span>
          </div>
        </Link>
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/">Home </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/cart"> Cart </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <a
            className="block rounded-md bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#ff9900]"
            href="/login"
          >
            Login
          </a>

          <a
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
            href="/register"
          >
            Register
          </a>
        </div>

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
      </header>


        <section className="bg-gray-50">
     <div className="max-w-screen-xl px-4 py-32 lg:flex lg:h-[80vh] mx-auto">
     <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl font-black sm:text-5xl tracking-normal">
       Stay With Us.
        <strong className=" text-red-700 text-3xl font-black sm:text-5xl">Something Is Not Right.</strong>
      </h1>

      <p className="mt-4">
        There might be a slight hiccup with your internet or our service. Please refresh or head back home.
       </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={handleRefresh}
          className="block w-full rounded bg-red-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-700 sm:w-auto"
        >
          Refresh App
        </button>

        <button onClick={handleBackHome}
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-700 sm:w-auto"
        >
          Back Home
        </button>
      </div>
    </div>
  </div>
        </section>

        <footer className="bg-gray-50 ">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        Copyright &copy; 2024. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </>
  )
}