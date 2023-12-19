import { useAssentoModal } from "@/app/hooks/useAssentosModal";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import toast from "react-hot-toast";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PiArmchairFill } from "react-icons/pi";
import { GiTheater } from "react-icons/gi";

export default function AssentoModal() {
  const assentoModal = useAssentoModal();

  if (!assentoModal.data) return null;

  const isReadOnly = assentoModal.readonly;

  const modalTile = isReadOnly ? `Visualizar Assentos` : `Selecionar Assentos`;
  const modalDescription = isReadOnly
    ? `Visualize os assentos disponíveis e ocupados da sessão selecionada`
    : `Clique para selecionar entre os assentos disponíveis da sessão selecionada`;

  const onChange = (open: boolean) => {
    if (open) {
      assentoModal.onClose();
    }
  };

  const addAssento = (id: string) => {
    if (isReadOnly) {
      return null;
    }
    assentoModal.setSelectedAssentosId([
      ...assentoModal.selectedAssentosId,
      id,
    ]);
  };

  const removeAssento = (id: string) => {
    if (isReadOnly) {
      return null;
    }
    assentoModal.setSelectedAssentosId(
      assentoModal.selectedAssentosId.filter((item) => item !== id)
    );
  };

  const onFinish = () => {
    if (assentoModal.selectedAssentosId.length > 0) {
      assentoModal.setSelectedAssentosNumero(
        assentoModal.data?.assentos
          .filter((item) => assentoModal.selectedAssentosId.includes(item.id))
          .map((item) => Number(item.numero)) || []
      );
      assentoModal.onClose();
      toast.success("Assentos selecionados");
    } else {
      assentoModal.setSelectedAssentosId([]);
      assentoModal.setSelectedAssentosNumero([]);
      assentoModal.onClose();
    }
  };

  return (
    <Dialog
      open={assentoModal.isOpen}
      onOpenChange={() => onChange(assentoModal.isOpen)}
    >
      <DialogContent className="max-w-5xl max-h-screen overflow-auto flex flex-col">
        <DialogHeader className="flex space-x-2 flex-row items-center">
          <GiTheater size={35} className="hidden md:block" />
          <span className="flex-col items-start justify-start">
            <DialogTitle className="flex items-center">{modalTile}</DialogTitle>
            <DialogDescription>{modalDescription}</DialogDescription>
          </span>
        </DialogHeader>
        <Separator />
        <div className="flex justify-start w-full">
          <div className="flex h-full items-center justify-center">
            <div className="bg-primary w-1 h-96 my-auto" />
            <h5 className="text-primary tracking-tight mr-2 -rotate-90 font-semibold text-sm text-center">
              Tela
            </h5>
          </div>
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2 mx-auto">
            {assentoModal.data.assentos.map((assento) => (
              <span className="relative" key={assento.id}>
                <PiArmchairFill
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-75",
                    assento.reservado
                      ? "text-zinc-400 dark:text-zinc-700 cursor-not-allowed"
                      : "dark:text-white text-zinc-800",
                    assentoModal.selectedAssentosId.includes(assento.id) &&
                      "text-red-600 dark:text-red"
                  )}
                  onClick={() => {
                    if (isReadOnly) {
                      toast.error("Modo somente visualização está ativado");
                      return null;
                    }
                    if (assento.reservado) {
                      toast.error("Esse assento já encontra-se reservado");
                      return null;
                    }
                    if (assentoModal.selectedAssentosId.includes(assento.id)) {
                      removeAssento(assento.id);
                    } else {
                      addAssento(assento.id);
                    }
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 max-w-lg gap-5">
            <span className="flex space-x-2 items-center">
              <PiArmchairFill className="text-red-600 w-10 h-10" />
              <h5 className="text-muted-foreground font-sm font-medium">
                Selecionado
              </h5>
            </span>
            <span className="flex space-x-2 items-center">
              <PiArmchairFill className="text-zinc-800 dark:text-white w-10 h-10" />
              <h5 className="text-muted-foreground font-sm font-medium">
                Disponível
              </h5>
            </span>
            <span className="flex space-x-2 items-center">
              <PiArmchairFill className="text-zinc-400 dark:text-zinc-700 w-10 h-10" />
              <h5 className="text-muted-foreground font-sm font-medium">
                Ocupado
              </h5>
            </span>
          </div>
          {assentoModal.selectedAssentosId.length > 0 && (
            <>
              <p className="text-sm font-semibold text-muted-foreground my-2">
                Assentos Selecionados:
              </p>
              <span className="flex space-x-2">
                {assentoModal.selectedAssentosId.length > 0 &&
                  assentoModal.selectedAssentosId.map((assento, index) => {
                    if (assento) {
                      return (
                        <Badge
                          key={`${index}==${assento}`}
                          onClick={() => removeAssento(assento)}
                          className="cursor-pointer bg-primary"
                        >
                          {
                            assentoModal!.data!.assentos.find(
                              (item) => item.id === assento
                            )?.numero
                          }
                        </Badge>
                      );
                    }
                  })}
              </span>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-center gap-x-2 mt-5">
          <Button className="rounded-full" onClick={() => onFinish()}>
            {assentoModal.readonly ? "Sair" : "Concluir Seleção"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
