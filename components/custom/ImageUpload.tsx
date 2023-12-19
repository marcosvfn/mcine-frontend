import { useState, useEffect } from "react";
import { PlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload(props: ImageUploadProps) {
  const { disabled, onChange, onRemove, value } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="pahqfrj3">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button type="button" disabled={disabled} onClick={onClick}>
              <PlusIcon className="h-4 w-4 mr-2 " />
              Carregar Imagem
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
