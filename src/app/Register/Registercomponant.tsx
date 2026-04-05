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

const schema = z.object({
    name: z.string("name is required").min(3, "name must be at least 3 characters").regex(/^[a-zA-Z\s]+$/, "name must only contain letters and spaces"),
    email: z.string("email is required").email("invalid email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
    password: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),
    rePassword: z.string("password is required").min(6, "password must be at least 6 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain at least one letter and one number"),
    phone: z.string("phone is required").min(11, "phone must be at least 11 characters").regex(/^01[0125][0-9]{8}$/, "phone must be egyptian phone number"),

}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});

export default function Registercomponant() {
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm(
        {
            defaultValues: {
                name: "",
                email: "",
                password: "",
                rePassword: "",
                phone: "",

            },


            resolver: zodResolver(schema),

        }
    )


    async function handelregisterData(userData: RegisterInterface) {
        const res = await sendRegisterData(userData)
        // console.log("userData",userData);
        

        if (res === "success") {
            toast.success(res, {
                position: "top-center",
                icon: "😎"
            })
            reset()
            router.push("/Login")

        } else {
            toast.error(res, {
                position: "top-center",
                icon: "😡😡"
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handelregisterData)}>

                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="inter your name"
                                autoComplete="off"
                                className='focus-visible:ring-main-color'
                                type='text'
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
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
                <Controller
                    name="rePassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>RePassword</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Inter your Repassword"
                                autoComplete="off"
                                className='focus-visible:ring-main-color'
                                type='password'
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="inter your phone"
                                autoComplete="off"
                                className='focus-visible:ring-main-color'
                                type='tel'
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <p>Already have an account ? <Link href="/Login" className='text-main-color'>Login</Link>   </p>
                <FreshButton className='bg-main-color p-3 rounded-3xl mt-2' type='submit'>submit</FreshButton>
                {/* <button type='submit' className='bg-main-color p-3 rounded-3xl mt-2'>submit</button> */}

            </form>


        </>)
}
