import { PulseLoader } from "react-spinners";

export default function LoadingComponent() {
  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center">
      <PulseLoader color="#9d1d2c" />
    </div>
  );
}
