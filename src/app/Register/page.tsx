import { Headphones, ShieldCheck, Truck } from "lucide-react";
import Registercomponant from "./Registercomponant";
import Image from "next/image";
import image2 from "../../asssets/img/login.png"



export default function page() {
  return (<>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 my-5">
      <div className="w-full max-w-8xl bg-white rounded-2xl shadow-lg overflow-hidden flex">

        {/* ===== LEFT SIDE ===== */}
        <div className=" md:flex flex-col items-center justify-center w-1/2 p-10 bg-white">

          {/* Illustration */}
          <div
            className="w-full rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
            style={{ background: "#fdf3ee", minHeight: 280 }}
          >
            <Image src={image2} alt="FreshCart logo" width={900} height={500} />


          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 leading-snug">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8 max-w-xs">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 text-sm text-gray-600 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Truck size={15} className="text-green-600" />
              Free Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-green-600" />
              Secure Payment
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones size={15} className="text-green-600" />
              24/7 Support
            </span>
          </div>
        </div>

        {/* ===== RIGHT SIDE: Login Form ===== */}
        <div className="w-full md:w-1/2 p-10 border-l border-gray-100">
          <Registercomponant />
        </div>

      </div>
    </div>

  </>)
}
