import React from 'react'
import {  FaShoppingBag, FaTruck } from 'react-icons/fa'
import {  CartResponse } from './cartInterface';

type Props = {
  data: CartResponse | null;
};
export default function OrderSamary({ data }: Props) {
    if (!data) {
    return <div >ف انتظار </div>;
  }
  // console.log("data from sammary ", data);
  // const products :CartItem = data?.data?.products
  // console.log( "product",products);
  const {  data: {  totalCartPrice, products: { } } } = data


const freeShippingThreshold = 500;

const subtotal = totalCartPrice;
const shipping = subtotal > freeShippingThreshold ? 0 : 50;
const total = subtotal + shipping;

const remaining = Math.max(freeShippingThreshold - subtotal, 0);
const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <>
      <div className="rounded-2xl overflow-hidden shadow-lg w-full   border border-gray-100">
        <div className="bg-main-color p-4 w-full text-white">
          <div className="flex items-center gap-2 font-bold text-lg">
            <FaShoppingBag />
            <span>Order Summary</span>
          </div>
          <div className="text-sm text-red-100 mt-1">{data.numOfCartItems as number} items in your cart</div>
        </div>

        <div className="bg-white">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FaTruck className="text-main-color" />
              {remaining > 0 ? (
                <span>
                  Add <strong className="text-main-color">{remaining} EGP</strong> for free shipping
                </span>
              ) : (
                <span className="text-green-600   font-medium">You have unlocked free shipping! 🎉</span>
              )}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-main-color rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="px-4 py-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">{subtotal} EGP</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">
                {shipping === 0 ? "Free" : `${shipping} EGP`}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>{total} EGP</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-4 pb-4">
            <button className="w-full bg-main-color hover:bg-[#c1121f] transition-colors duration-200 text-white font-semibold py-3 rounded-xl shadow-sm active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
