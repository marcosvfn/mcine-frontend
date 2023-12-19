"use client";

import { UsuarioActions, UsuarioModel } from "@/actions/root/usuario/api";
import { useCinemaUserList } from "@/app/hooks/useCinemaUserList";
import ModalDefault from "@/components/modals/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircle, Search, UserIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LocalUserInfo = {
  nome: string;
  id: number;
  email: string;
};

export default function AddUserModal(props: AddUserModalProps) {
  const { isOpen, onClose } = props;
  const userCinemaList = useCinemaUserList();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const [allUserList, setAllUserList] = useState<UsuarioModel[]>([]);
  const [currentUser, setCurrentUser] = useState<
    LocalUserInfo & { isAdmin: boolean }
  >({
    email: "",
    id: 0,
    isAdmin: false,
    nome: "Busque aqui...",
  });

  useEffect(() => {
    if (isOpen) {
      UsuarioActions.getAll().then((response) => setAllUserList(response));
    }
  }, [isOpen]);

  const idsUsuariosVinculados = userCinemaList.currentList.map(
    (item) => item.id
  );

  const formattedItems: LocalUserInfo[] = allUserList
    .filter((item) => !idsUsuariosVinculados.includes(item.id))
    .map((item) => ({
      nome: item.nome,
      id: item.id,
      email: item.email,
    }));

  const onUsuarioSelect = (usuario: LocalUserInfo) => {
    setCurrentUser({
      ...usuario,
      isAdmin: false,
    });
    setOpen(false);
  };

  const onFinishAddUser = () => {
    if (currentUser) {
      userCinemaList.addUser(currentUser);
    }
    onClose();
    setCurrentUser({
      email: "",
      id: 0,
      isAdmin: false,
      nome: "Busque aqui...",
    });
    toast.success("Usuário adicionado! Salve as alterações para guardar.");
  };

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar novo usuário"
      description={`Vincule um novo usuário ao cinema`}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Selecione um cinema"
            className={cn("w-full justify-between")}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            {currentUser?.nome}
            <Search className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="Procure um usuário..."
                className="text-sm"
              />
              <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
              <CommandGroup heading="Usuários">
                {formattedItems?.map((usuario) => (
                  <CommandItem
                    key={usuario.id}
                    onSelect={() => onUsuarioSelect(usuario)}
                    className="text-sm cursor-pointer"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    {usuario.nome}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentUser?.id === usuario.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    router.push(`/${params.idCinema}/usuarios/new`);
                  }}
                  className="flex cursor-pointer"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Cadastrar Usuário
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="items-top flex space-x-2 mt-5">
        <Checkbox
          checked={currentUser?.isAdmin}
          onCheckedChange={() => {
            if (currentUser) {
              setCurrentUser({
                ...currentUser,
                isAdmin: !currentUser?.isAdmin,
              });
            }
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Administrador
          </label>
          <p className="text-sm text-muted-foreground">
            Essa opção permite que o usuário gerencie as funcionalidades do
            cinema.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end gap-x-3 mt-5">
        <Button variant={"outline"} onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onFinishAddUser}>Adicionar</Button>
      </div>
    </ModalDefault>
  );
}
