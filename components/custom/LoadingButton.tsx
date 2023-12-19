import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function LoadingButton(
  props: ButtonProps & { isLoading: boolean }
) {
  const { isLoading, children, ...rest } = props;
  return (
    <Button {...rest} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
