/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  CheckIcon,
  ChevronsUpDown,
  LayoutDashboard,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandSeparator,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CinemaModel } from "@/actions/root/cinema/api";
import { useCinemaModal } from "@/app/hooks/useCinemaModal";
import { Button } from "../ui/button";
import { useCurrentCinema } from "@/app/hooks/useCurrentCinema";
import useTenantId from "@/app/hooks/useCurrentTenant";
import usePreventHydration from "@/app/hooks/usePreventHidration";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

export type UserCinemaModel = CinemaModel & { isAdmin: boolean };

interface CinemaSwitcherProps extends PopOverTriggerProps {
  items: UserCinemaModel[];
}

export default function CinemaSwitcher({
  className,
  items = [],
}: CinemaSwitcherProps) {
  const params = useParams();
  const router = useRouter();
  const cinemaModal = useCinemaModal();
  const currentCinemaState = useCurrentCinema();
  const currentTenant = useTenantId();
  const [open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.nome,
    value: item.id,
    isAdmin: item.isAdmin,
  }));

  const currentCinema = useMemo(
    () => formattedItems.find((item) => item.value === params.idCinema),
    [formattedItems, params.idCinema]
  );

  const onCinemaSelect = (cinema: {
    label: string;
    value: string;
    isAdmin: boolean;
  }) => {
    setOpen(false);

    router.push(`/${cinema.value}`);

    currentTenant.setTenantId(cinema.value);

    currentCinemaState.setCurrentCinema({
      id: cinema.value,
      nome: cinema.label,
      isAdmin: cinema.isAdmin,
    });
  };

  useEffect(() => {
    if (currentCinemaState.info.id === "" && currentCinema) {
      currentCinemaState.setCurrentCinema({
        id: currentCinema.value,
        nome: currentCinema.label,
        isAdmin: currentCinema.isAdmin,
      });
    }
  }, [currentCinema, currentCinemaState]);

  const canCreateCinemas =
    formattedItems.find(
      (item) => item.value === process.env.NEXT_APP_ROOT_TENANT_ID
    )?.isAdmin === true;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione um cinema"
          className={cn("w-full justify-between rounded-lg", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentCinema?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Procure um cinema..."
              className="text-sm"
            />
            <CommandEmpty>Nenhum cinema encontrada.</CommandEmpty>
            <CommandGroup heading="Cinemas">
              {formattedItems.map((cinema) => (
                <CommandItem
                  key={cinema.value}
                  onSelect={() => onCinemaSelect(cinema)}
                  className={cn("text-sm cursor-pointer")}
                >
                  {cinema.value === process.env.NEXT_APP_ROOT_TENANT_ID ? (
                    <LayoutDashboard className={"mr-2 h-4 w-4"} />
                  ) : (
                    <StoreIcon className="mr-2 h-4 w-4" />
                  )}
                  {cinema.label}

                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCinema?.value === cinema.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {canCreateCinemas && (
            <>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      cinemaModal.onOpen();
                    }}
                    className="flex cursor-pointer"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Cadastrar Cinema
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
