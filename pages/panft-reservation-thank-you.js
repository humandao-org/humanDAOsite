import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Reservation({ story }) {
  const { query } = useRouter();

  return (
    <div className="bg-[#F8F3F3]">
    <div className="relative z-10 mx-auto w-full overflow-hidden">
      <nav className="relative z-50 px-6 py-6">
        <div
          className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-5"
        >
          <a href="#" className="block w-full max-w-[250px] lg:max-w-[300px]"
            ><img
              src="assets/images/logo-main.svg"
              alt="Logo main"
              className="block h-auto w-full object-contain"
          /></a>

          <a
            href="#"
            className="hidden rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary sm:block"
            >Become an ambassador</a
          >
        </div>
      </nav>

      <section className="px-5 lg:pt-20 lg:pb-24">
        <div className="mx-auto w-full max-w-[1110px]">
          <h1
            className="mb-6 text-center font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl"
          >
            Thanks for your reservation!
          </h1>

          <div
            className="mx-auto mb-16 flex w-full max-w-[762px] flex-col items-center justify-between gap-6 rounded-[10px] bg-white px-9 pt-9 pb-14 shadow-box sm:flex-row"
          >
            <div className="w-full max-w-[391px]">
              <h3
                className="mb-8 text-2xl font-semibold leading-8 -tracking-[0.45px]"
              >
                Your reservation details
              </h3>
              <ul className="space-y-8">
                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40"
                    >timestamp</span
                  >
                  <span className="font-medium text-dark"
                    >December 21, 2022 8:32:34 (UTC+2)</span
                  >
                </li>

                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40"
                    >owner</span
                  >
                  <span className="break-words font-medium text-dark"
                    >0xE0De29a77c58Db586F61FAC2e019F1A0A12D6D54</span
                  >
                </li>

                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40"
                    >reservation spot</span
                  >
                  <span className="font-medium text-dark">#1234</span>
                </li>
              </ul>
            </div>
            <div className="order-first w-full max-w-[280px] sm:order-none">
              <img
                src="assets/images/checked.png"
                alt="Checked"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <Link href="/panft-reservation">
            <a
                className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl"
                >Return to homepage</a
            >
          </Link>
        </div>
      </section>
    </div>
    </div>
  );
}
