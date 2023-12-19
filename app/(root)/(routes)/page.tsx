"use client";

import { useCinemaModal } from "@/app/hooks/useCinemaModal";
import { useEffect } from "react";

export default function RootPage() {
  const onOpen = useCinemaModal((state) => state.onOpen);
  const isOpen = useCinemaModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
