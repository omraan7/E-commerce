"use client";

import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "@/app/_Redux/ReduxStore";
import { fetchCartAndWish } from "@/app/_Redux/cartNumberslice";
import { useEffect } from "react";

function InitApp() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartAndWish());
  }, [dispatch]);

  return null;
}

export default function WrapeRedux({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitApp />
      {children}
    </Provider>
  );
}