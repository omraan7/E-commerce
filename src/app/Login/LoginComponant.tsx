"use client"
import { useDispatch } from "react-redux";
import { setCartNumber, setWishNumber } from "@/app/_Redux/cartNumberslice";
import FreshButton from '@/components/shard/AppButton/freshbutton'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { LoginRequest } from './LoginInterface'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { handeleGetCartData, handeleGetWishlistData } from './Login.services'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Users, Star, Loader2 } from 'lucide-react'
import { useState } from 'react'

const schema = z.object({
  email: z.string("email is required").email("invalid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
  password: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),
})

export default function LoginComponant() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  })

  async function handelLoginData(userData: LoginRequest) {
    const res = await signIn("credentials", { ...userData, redirect: false })
    if (res?.ok) {
      toast.success("Login Successfully 😎", { position: "top-center", icon: "😎" })
      const req = await handeleGetCartData()
      dispatch(setCartNumber(req?.numOfCartItems || 0));
      const req2 = await handeleGetWishlistData()
      dispatch(setWishNumber(req2?.count || 0));
      reset()
      router.push("/")
    } else {
      toast.error("Email or password incorrect", { position: "top-center", icon: "😡" })
    }
  }

  return (
    <div className="w-full">

      {/* Logo + Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">
          <span className="text-main-color">Fresh</span>
          <span className="text-gray-900">Cart</span>
        </h1>
        <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to continue your fresh shopping experience</p>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3 mb-5">
        <button
          onClick={() => signIn("google", { redirectTo: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={() => signIn("facebook", { redirectTo: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium tracking-widest">OR CONTINUE WITH EMAIL</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handelLoginData)} className="flex flex-col gap-4">

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </FieldLabel>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                  type="email"
                  className="pl-9 focus-visible:ring-main-color border-gray-200"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between mb-1">
                <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  Password
                </FieldLabel>
                <p className="text-sm text-main-color hover:underline font-medium">
                  Forgot Password?
                </p>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-9 focus-visible:ring-main-color border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Keep me signed in */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-main-color" />
          <span className="text-sm text-gray-600">Keep me signed in</span>
        </label>

        {/* Submit */}
        <FreshButton
          disabled={isSubmitting}
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-base transition-colors mt-1 flex items-center justify-center gap-2
            ${isSubmitting
              ? "bg-green-400 cursor-not-allowed opacity-70"
              : "bg-main-color hover:bg-green-100 hover:text-main-color cursor-pointer"
            } text-white`}        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />

              Waiting...
            </>
          ) : (
            "Sign In"
          )}

        </FreshButton>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-gray-500 mt-5">
        New to FreshCart?{" "}
        <Link href="/Register" className="text-main-color    font-semibold hover:underline">
          Create an account
        </Link>
      </p>

      {/* Bottom trust badges */}
      <div className="flex items-center justify-center gap-5 mt-5 pt-5 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck size={13} className="text-gray-400" />
          SSL Secured
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Users size={13} className="text-gray-400" />
          50K+ Users
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Star size={13} className="text-gray-400" />
          4.9 Rating
        </span>
      </div>

    </div>
  )
}