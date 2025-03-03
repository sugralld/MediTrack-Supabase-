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
import { User, LogOut, Bookmark } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUserRole } from "../actions";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [role, setRole] = useState<string | null>(null);
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

  useEffect(() => {
    async function fetchRole() {
      const userRole = await getUserRole();
      setRole(userRole);
    }
    fetchRole();
  });

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

  const handleBookmark = async () => {
    router.push("/bookmarks");
  };

  return (
    
    <div
      className={`w-full fixed top-0 left-0 bg-white transition-transform duration-300 shadow-lg shadow-indigo-100 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <header className="border-b flex items-center justify-between rounded-bl-lg rounded-br-lg p-0 mx-4">
        {/* Burger Icon */}
        <IconButton onClick={handleMenuOpen} aria-label="menu">
          <MenuIcon />
        </IconButton>
        {/* Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem disabled sx={{ color: "black" }}>
            <User className="w-5 h-5 stroke-gray-950 mr-2" />
            {role || "Memuat..."}
          </MenuItem>
          {role === "Guest" && (
            <MenuItem onClick={handleBookmark} className="text-gray-400">
              <Bookmark className="w-5 h-5 mr-2 stroke-gray-400" />
              Bookmark
            </MenuItem>
          )}
          <MenuItem onClick={handleSignOut} sx={{ color: "red" }}>
            <LogOut className="w-4 h-4 mr-2 ml-1" />
            Logout
          </MenuItem>
        </Menu>
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            alt="MediTrack logo"
            width={180}
            height={30}
          />
        </Link>
        <Typography className="mr-10"> </Typography>
      </header>
    </div>
  );
};

export default Navbar;
