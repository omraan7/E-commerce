"use client"
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
import { useCartContext } from '../_context/CartContextProvider'

const schema = z.object({
    email: z.string("email is required").email("invalid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
    password: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),

})

export default function LoginComponant() {
    const {updateCartNumber,updateWishNumber}=useCartContext()

    const router = useRouter()
    
    const { control, handleSubmit, reset } = useForm(
        {
            defaultValues: {
                
                email: "",
                password: "",
                
                
            },
            
            
            resolver: zodResolver(schema),
            
        }
    )
    

    async function handelLoginData(userData: LoginRequest) {

        const res = await signIn("credentials", {
            ...userData,
            redirect: false
        })
        if (res?.ok) {
            toast.success("Login Successfully 😎", {
                position: "top-center",
                icon: "😎"
            })
        const req=   await handeleGetCartData()
        updateCartNumber(req?.numOfCartItems||0)
        const req2=   await handeleGetWishlistData()
        updateWishNumber(req2?.count||0)
            reset()
            router.push("/")

        } else {
            toast.error(res?.error || "Email or password incorrect", {
                position: "top-center",
                icon: "😡"
            })
        }

        //     const res = await handelLogin(userData)
        //     
    }


    return (
        <>
         <div className="flex  justify-center items-center  gap-3 w-full">

      {/* Google */}
      <button
        onClick={() => signIn("google" ,{redirectTo:"/"})}
        className="flex items-center justify-center gap-2 p-5 bg-white text-black border rounded-lg py-2 hover:bg-gray-100"
      >
         Continue with Google
      </button>

      {/* Facebook */}
      <button
        onClick={() => signIn("facebook")}
        className="flex items-center justify-center gap-2 p-5 bg-blue-400 text-white rounded-lg py-2 hover:bg-blue-700"
      >
         Continue with Facebook
      </button>

    </div>
            <form onSubmit={handleSubmit(handelLoginData)}>





                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder=" inter your email"
                                autoComplete="off"
                                className='focus-visible:ring-main-color'
                                type='email'
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="inter your password"
                                autoComplete="new-password"
                                className='focus-visible:ring-main-color'
                                type='password'
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <p>Dont have an account <Link href="/Register" className='text-main-color'>Create an account</Link>   </p>
                <FreshButton className='bg-main-color p-3 rounded-3xl mt-2' type='submit'>submit</FreshButton>
                {/* <button type='submit' className='bg-main-color p-3 rounded-3xl mt-2'>submit</button> */}

            </form>


        </>)
}
