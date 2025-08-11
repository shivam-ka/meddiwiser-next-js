import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="relative flex flex-col items-center justify-center bg-blue-200 text-center dark:bg-blue-950/50">
        <Image
          src={assets.banner}
          alt="Medical professionals providing healthcare services"
          width={1000}
          height={800}
          quality={100}
          priority={true}
          draggable={false}
        />

        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-black/10 to-black" />

        <div className="space-y-2 absolute bottom-4 md:bottom-10">
          <p className="mx-auto w-fit rounded-sm bg-black/20 px-2 text-xs font-medium tracking-wider text-green-500 sm:text-lg md:text-xl lg:text-2xl">
            Trusted medical professionals
          </p>
          <h1 className="px-5 sm:px-0 xs:text-3xl max-w-5xl text-2xl  font-bold text-neutral-100 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Hassle-Free Healthcare{" "}
            <span className="text-primary">Booking Today</span>
          </h1>
        </div>
      </div>
    </main>
  );
}
