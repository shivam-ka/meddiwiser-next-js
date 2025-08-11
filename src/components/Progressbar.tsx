"use client";
import NextTopLoader from "nextjs-toploader";

export default function Progressbar() {
  return (
    <NextTopLoader
      showSpinner={false}
      height={1.5}
      color="#1524fc"
      easing="ease"
    />
  );
}
