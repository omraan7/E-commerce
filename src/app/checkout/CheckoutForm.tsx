"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Address, shippingAddress } from './checkinterface';
import { handelCachOrder, handelOnlineOrder } from './checkaction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteItemActionAll } from '../cart/cart.services';
import { CartResponse } from '../cart/cartInterface';
import { useDispatch } from 'react-redux';
import { setCartNumber } from '../_Redux/cartNumberslice';


const schema = z.object({
    details: z.string("details of street is required").min(3, "details must be at least 3 characters")
        .regex(/^(?=.*[A-Za-z\u0600-\u06FF])[A-Za-z\u0600-\u06FF0-9]+(?:\s[A-Za-z\u0600-\u06FF0-9]+)*$/, "invalid street"),
    city: z
        .string()
        .min(2, "city must be at least 2 characters")
        .regex(/^[A-Za-z\u0600-\u06FF]+(?:\s[A-Za-z\u0600-\u06FF]+)*$/, "invalid city name"),
    phone: z.string("phone is required").min(11, "phone must be at least 11 characters")
        .regex(/^01[0125][0-9]{8}$/, "phone must be egyptian phone number"),
    postalCode: z.string(),
})

export default function CheckoutForm({ datacart }: { datacart: CartResponse }) {
    console.log("kkk", datacart);

    const dispatch = useDispatch()
    const orderItems = datacart?.data?.products || [];
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

    const { control, handleSubmit, reset } = useForm(
        {
            defaultValues: {
                details: "",
                phone: "",
                city: "",
                postalCode: "12345"
            },
            resolver: zodResolver(schema),
        }
    )

    async function cachOrder(data: Address) {
        const shippingAddress: shippingAddress = {
            shippingAddress: data
        }
        const res = await handelCachOrder(shippingAddress, datacart?.cartId as string)
        toast.success(res.message, { position: "top-center" })
        await deleteItemActionAll()
        dispatch(setCartNumber(0));
        reset()
        router.push("/cart")
    }

    async function onlineOrder(data: Address) {
        const shippingAddress: shippingAddress = {
            shippingAddress: data,
        };

        try {
            const url = await handelOnlineOrder(
                shippingAddress,
                datacart?.cartId as string
            );

 
            if (url) {
                window.open(url, "_self");
            }
        } catch (error) {
            console.error("Payment Error:", error);
        }
    }


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Shipping Address Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="bg-main-color px-5 py-3.5 flex items-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <div>
                                <h2 className="text-white font-semibold text-sm">Shipping Address</h2>
                                <p className="text-main-bg-main-color text-xs">Where should we deliver your order?</p>
                            </div>
                        </div>

                        <div className="p-5">
                            {/* Delivery Info Banner */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start gap-2 mb-5">
                                <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-xs font-semibold text-blue-700">Delivery Information</p>
                                    <p className="text-xs text-blue-600">Please ensure your address is accurate for smooth delivery</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <form className="space-y-4">
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>city</FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                placeholder=" e.g. Cairo, Alexandria, Giza"
                                                autoComplete="off"
                                                className='w-full pl-10 pr-4 py-2.5 border border-main-color rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color transition'
                                                type='text'
                                                required={true}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="details"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                                            <textarea
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                placeholder=" Street name, building number, floor, apartment..."
                                                autoComplete="off"
                                                className="w-full pl-10 pr-4 py-2.5 border border-main-color rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-main-bg-main-color focus:ring-1 focus:ring-main-bg-main-color transition resize-none"
                                                required={true}
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
                                            <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="01xxxxxxxxx"
                                                autoComplete="off"
                                                className='w-full pl-10 pr-4 py-2.5 border border-main-color rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color transition'
                                                type='tel'
                                                required={true}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </form>
                        </div>
                    </div>

                    {/* Payment Method Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="bg-main-color px-5 py-3.5 flex items-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <div>
                                <h2 className="text-white font-semibold text-sm">Payment Method</h2>
                                <p className="text-main-bg-main-color text-xs">Choose how you would like to pay</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-3">
                            {/* Cash on Delivery */}
                            <div
                                onClick={() => setPaymentMethod("cod")}
                                className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "cod"
                                    ? "border-main-bg-main-color bg-main-color"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === "cod" ? "bg-main-color" : "bg-gray-100"
                                            }`}>
                                            <svg className={`w-5 h-5 ${paymentMethod === "cod" ? "text-white" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">Cash on Delivery</p>
                                            <p className="text-xs text-gray-800">Pay when your order arrives at your doorstep</p>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-main-bg-main-color bg-main-color" : "border-gray-300"
                                        }`}>
                                        {paymentMethod === "cod" && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pay Online */}
                            <div
                                onClick={() => setPaymentMethod("online")}
                                className={`border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "online"
                                    ? "border-main-bg-main-color bg-main-color"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === "online" ? "bg-main-color" : "bg-gray-100"
                                            }`}>
                                            <svg className={`w-5 h-5 ${paymentMethod === "online" ? "text-white" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">Pay Online</p>
                                            <p className="text-xs text-gray-800">Secure payment with Credit/Debit Card via Stripe</p>
                                            
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-main-bg-main-color bg-main-color" : "border-gray-300"
                                        }`}>
                                        {paymentMethod === "online" && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Secure & Encrypted */}
                            <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 bg-gray-50">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Secure &amp; Encrypted</p>
                                    <p className="text-xs text-gray-500">Your payment info is protected with 256-bit SSL encryption</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column — Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-4">
                        <div className="bg-main-color px-5 py-3.5 flex items-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <div>
                                <h2 className="text-white font-semibold text-sm">Order Summary</h2>
                                <p className="text-main-bg-main-color text-xs">{orderItems.length} items</p>
                            </div>
                        </div>

                        <div className="p-5">
                            {/* Items */}
                            <div className="space-y-3 mb-5">
                                {orderItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-3">
                                        <img src={item.product.imageCover} alt={item.product.title} className="w-10 h-10 object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-800 leading-tight line-clamp-2">{item.product.title}</p>
                                            <p className="text-xs text-gray-400">{item.count} × {item.price} EGP</p>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800 flex-shrink-0">{item.price * item.count}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mb-4" />

                            {/* Totals */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-800 font-medium">{datacart?.data?.totalCartPrice || 0} EGP</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        Shipping
                                    </span>
                                    <span className="text-main-bg-main-color font-semibold">{datacart.data.totalCartPrice > 500 ? "free" : "50 EGP"}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mb-4" />

                            {/* Total */}
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-base font-bold text-gray-800">Total</span>
                                <span className="text-xl font-bold text-main-bg-main-color">
                                    {datacart.data.totalCartPrice > 500 ? datacart.data.totalCartPrice : datacart.data.totalCartPrice + 50} EGP
                                </span>
                            </div>

                            {/* Place Order Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleSubmit(cachOrder)}
                                    className="w-full bg-main-color hover:bg-main-color active:bg-main-color text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Cash Order
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit(onlineOrder)}
                                    className="w-full bg-main-color hover:bg-main-color active:bg-main-color text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Online Order
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="flex justify-around mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-4 h-4 text-main-bg-main-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-[10px] text-gray-500">Secure</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-[10px] text-gray-500">Fast Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="text-[10px] text-gray-500">Easy Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}