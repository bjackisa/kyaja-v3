"use client"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";

export default function LoginComponent({returnUrl , session}:{returnUrl:string | string[] | undefined | any , session:|any }) {

if (session){
    redirect(`${returnUrl }`);
}

  return (
    <div className="w-full h-[40vh] md:h-[60vh] lg:h-screen flex justify-center items-center  px-18 rounded-lg">
      <div className="flex items-center justify-center lg:py-2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Login using google credentials
            </p>
          </div>
          <div className="grid gap-4">
           
              <button
             onClick={()=>signIn("google")}
              className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer">
         <div className="relative flex items-center space-x-4 justify-center">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg"
             className="absolute left-0 w-5" alt="google logo"/>
             <span
             className="block w-max font-normal tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google
               </span>
               </div>
              </button>
            {/* <Button variant="outline" className="lg:w-full bg-blue-600">
              Login with Google
            </Button> */}
          </div>
          <div className="lg:mt-2 text-center text-sm">
          Continue Shopping on kyaja {" "}{" "}
            <Link href="/" className="underline">
            Click to Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
