"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}
export default function ModalDefault(props: ModalProps) {
  const { title, description, isOpen, onClose, children } = props;

  const onChange = (open: boolean) => {
    if (open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => onChange(isOpen)}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
