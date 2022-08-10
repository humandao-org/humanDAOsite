import React, { useRef } from "react";
import Link from "next/link";

export default function SiteMenu({ children }) {

  const toggleMobileMenu = function() {
    navList.current.toggleAttribute('open')
    burgerMenu.current.toggleAttribute('open')
    let mobileMenuOpen = burgerMenu.current.getAttribute('open') === ''
    let navListHeight = navList.current.scrollHeight + 60;
    if (!mobileMenuOpen) {
      navList.current.style.height = `0px`;
      mobileMenuOpen = false
    } else {
      navList.current.style.height = `${navListHeight}px`;
      mobileMenuOpen = true
    }
  }

  const burgerMenu = useRef(null)
  const navList = useRef(null)
  
  return (
  <nav className="sticky z-20 top-0 px-6 py-6 bg-[#F8F3F3]">
    <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-5">
      <a className="hidden md:block w-full max-w-[250px] lg:max-w-[300px]">
        <object type="image/svg+xml" data="assets/images/logo-main.svg" alt="Logo main" className="w-full h-auto object-contain">
          svg-animation
        </object>
      </a>
      <ul className="md:hidden flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
      {children}
      </ul>
      <div 
        className="nav-list"
        ref={navList}
      >
        <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
          <li>
            <Link href="https://humandao.org" target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium">
              <a className="text-[15px] font-medium text-black hover:underline">
                HDAO
              </a>
            </Link>
          </li>
          <li>
            <a href="/" className="text-[15px] font-medium text-black hover:underline">
              PANFT
            </a>
          </li>
          <li>
            <Link href="/#faqs" className="text-[15px] font-medium">
              <a className="text-black hover:underline">FAQs</a>
            </Link>
          </li>
          <li>
            <Link href="mailto:hdao.helpdesk@gmail.com?subject=PANFT Reservation" className="text-[15px] font-medium">
              <a className="text-black hover:underline">Contact</a>
            </Link>
          </li>
          <span className="hidden md:block">
          {children}
          </span>
        </ul>
      </div>

      <button 
        ref={burgerMenu}
        className="btn-nav group md:hidden cursor:pointer"
        onClick={toggleMobileMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-7 w-7 fill-current group-open:hidden">
          <path d="M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="hidden h-7 w-7 fill-current group-open:block">
          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
        </svg>
      </button>
    </div>
  </nav>
  )
}