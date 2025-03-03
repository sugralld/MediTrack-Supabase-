"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 bg-white transition-transform duration-300 shadow-lg shadow-indigo-100 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <header className="border-b flex items-center justify-center rounded-bl-lg rounded-br-lg p-0">
        <Link href={"/"}>
          <Image
            src={"/im"}
            alt="MediTrack logo"
            width={180}
            height={30}
          />
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
