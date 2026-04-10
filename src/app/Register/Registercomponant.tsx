"use client"
import FreshButton from '@/components/shard/AppButton/freshbutton'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { sendRegisterData } from './register.services'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { RegisterInterface } from './RegisterInterface'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, Phone, ShieldCheck, Users, Star, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string("name is required").min(3, "name must be at least 3 characters").regex(/^[a-zA-Z\s]+$/, "name must only contain letters and spaces"),
  email: z.string("email is required").email("invalid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
  password: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),
  rePassword: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),
  phone: z.string("phone is required").min(11, "phone must be at least 11 characters").regex(/^01[0125][0-9]{8}$/, "phone must be egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

export default function Registercomponant() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    resolver: zodResolver(schema),
  })

  async function handelregisterData(userData: RegisterInterface) {
    const res = await sendRegisterData(userData)
    if (res === "success") {
      toast.success(res, { position: "top-center", icon: "😎" })
      reset()
      router.push("/Login")
    } else {
      toast.error(res, { position: "top-center", icon: "😡" })
    }
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">
          <span className="text-green-600">Fresh</span>
          <span className="text-gray-900">Cart</span>
        </h1>
        <h2 className="text-xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-gray-500 text-sm mt-1">Join thousands of happy customers today</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handelregisterData)} className="flex flex-col gap-4">

        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </FieldLabel>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                  type="text"
                  className="pl-9 focus-visible:ring-green-500 border-gray-200"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  className="pl-9 focus-visible:ring-green-500 border-gray-200"
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
              <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </FieldLabel>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-9 focus-visible:ring-green-500 border-gray-200"
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

        {/* RePassword */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter your password"
                  autoComplete="off"
                  type={showRePassword ? "text" : "password"}
                  className="pl-9 pr-9 focus-visible:ring-green-500 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showRePassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1 block">
                Phone Number
              </FieldLabel>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your phone number"
                  autoComplete="off"
                  type="tel"
                  className="pl-9 focus-visible:ring-green-500 border-gray-200"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit */}
        <FreshButton
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-base transition-colors mt-1 flex items-center justify-center gap-2
            ${isSubmitting
              ? "bg-green-400 cursor-not-allowed opacity-70"
              : "bg-main-color hover:bg-green-100 hover:text-main-color cursor-pointer"
            } text-white`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </FreshButton>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <Link href="/Login" className="text-green-600 font-semibold hover:underline">
          Sign in
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