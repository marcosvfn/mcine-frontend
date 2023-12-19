"use client";
import AssentoModal from "@/components/modals/assentoModal";
import CinemaModal from "@/components/modals/cinemaModal";
import { useState, useEffect } from "react";

export default function ModalsProviders() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AssentoModal />
      <CinemaModal />
    </>
  );
}
