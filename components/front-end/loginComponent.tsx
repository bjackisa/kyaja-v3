"use client"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { LogIn, ShoppingBag } from "lucide-react"

export default function LoginComponent({ returnUrl, session }: { returnUrl: string | string[] | undefined | any, session: any }) {
  if (session) {
    redirect(`${returnUrl}`)
  }

  return (
    <div className="w-full min-h-[60vh] flex justify-center items-center px-4 py-12 mt-15">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-gradient-to-br from-neutral-900 to-black border border-orange-500/20 rounded-2xl shadow-2xl shadow-orange-500/10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-lg shadow-orange-500/30">
              <LogIn className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60 text-sm">
              Sign in to continue your shopping experience
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={() => signIn("google")}
            className="group relative w-full h-12 bg-white hover:bg-gray-50 border-2 border-orange-500/30 rounded-xl transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 overflow-hidden"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center justify-center space-x-3">
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5" 
                alt="Google logo"
              />
              <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                Continue with Google
              </span>
            </div>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-500/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-br from-neutral-900 to-black px-3 text-white/50">
                Or
              </span>
            </div>
          </div>

          {/* Continue Shopping Link */}
          <Link 
            href="/"
            className="group flex items-center justify-center gap-2 w-full h-11 bg-black/50 border border-orange-500/30 rounded-xl text-white/80 hover:text-orange-500 hover:bg-black/70 hover:border-orange-500 transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="font-medium text-sm">Continue Shopping</span>
          </Link>

          {/* Footer Text */}
          <p className="text-center text-xs text-white/40 mt-6">
            By continuing, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  )
}
