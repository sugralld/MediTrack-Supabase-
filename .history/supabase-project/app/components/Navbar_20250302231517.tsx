"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const open = Boolean(anchorEl);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 bg-white transition-transform duration-300 shadow-lg shadow-indigo-100 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <header className="border-b flex items-center justify-between rounded-bl-lg rounded-br-lg p-0 mx-4">
        <Typography></Typography>
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            alt="MediTrack logo"
            width={180}
            height={30}
          />
        </Link>

        {/* Burger Icon */}
        <IconButton onClick={handleMenuOpen} aria-label="menu">
          <MenuIcon />
        </IconButton>

        {/* Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem disabled>Role: Admin</MenuItem>
          <MenuItem onClick={handleSignOut} sx={{ color: "red" }}>
            Logout
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default Navbar;
