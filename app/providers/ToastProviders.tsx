import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          background: theme === "light" ? "#fff" : "#323232",
          color: theme === "light" ? "#3f3f46" : "#fff",
        },
      }}
      containerClassName="text-center"
    />
  );
}
