import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactElement } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: ReactElement;
  className?: string;
}
export default function IconButton(props: IconButtonProps) {
  const { onClick, icon, className } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center border shadow-md hover:scale-110 transition p-2",
        className
      )}
    >
      {icon}
    </button>
  );
}
