"use client";

import { AvaliacoesActions } from "@/actions/tenant/avaliacoes/api";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RatingProps {
  idFilme: string;
  initialNota: number;
  readonly: boolean;
}

export default function Rating(props: RatingProps) {
  const { idFilme, initialNota, readonly } = props;

  const [visualFillArray, setVisualFillArray] = useState(
    fillArrayFn(initialNota)
  );

  useEffect(() => {
    if (initialNota) {
      setVisualFillArray(fillArrayFn(initialNota));
    }
  }, [initialNota]);

  const handleRatingOnClick = async (nota: number) => {
    if (readonly) {
      return null;
    }
    const newAvaliacao = {
      idFilme,
      valor: nota,
    };
    const response = await AvaliacoesActions.createAvaliacao(
      newAvaliacao,
      process.env.NEXT_APP_ROOT_TENANT_ID
    );

    if (response.id) {
      toast.success("Avaliação enviada!");

      const newAvaliacao = await AvaliacoesActions.getAvaliacaoByFilme(
        idFilme,
        undefined,
        process.env.NEXT_APP_ROOT_TENANT_ID
      );

      setVisualFillArray(fillArrayFn(newAvaliacao));
    } else {
      toast.error("Houve um problema ao avaliar o filme!");
    }
  };

  const onMouseEnter = (nota: number) => {
    if (readonly) {
      return null;
    }
    setVisualFillArray(fillArrayFn(nota));
  };

  const onMouseLeave = (nota: number) => {
    if (readonly) {
      return null;
    }
    setVisualFillArray(fillArrayFn(nota));
  };

  return (
    <ul className="flex justify-center">
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={visualFillArray[0]}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn(
            "mr-1 h-5 w-5 text-[#E4A11B]",
            !readonly && "cursor-pointer"
          )}
          onMouseEnter={() => onMouseEnter(1)}
          onMouseLeave={() => onMouseLeave(1)}
          onClick={() => handleRatingOnClick(1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={visualFillArray[1]}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn(
            "mr-1 h-5 w-5 text-[#E4A11B]",
            !readonly && "cursor-pointer"
          )}
          onMouseEnter={() => onMouseEnter(2)}
          onMouseLeave={() => onMouseLeave(2)}
          onClick={() => handleRatingOnClick(2)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={visualFillArray[2]}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn(
            "mr-1 h-5 w-5 text-[#E4A11B]",
            !readonly && "cursor-pointer"
          )}
          onMouseEnter={() => onMouseEnter(3)}
          onMouseLeave={() => onMouseLeave(3)}
          onClick={() => handleRatingOnClick(3)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={visualFillArray[3]}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn(
            "mr-1 h-5 w-5 text-[#E4A11B]",
            !readonly && "cursor-pointer"
          )}
          onMouseEnter={() => onMouseEnter(4)}
          onMouseLeave={() => onMouseLeave(4)}
          onClick={() => handleRatingOnClick(4)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={visualFillArray[4]}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn(
            "mr-1 h-5 w-5 text-[#E4A11B]",
            !readonly && "cursor-pointer"
          )}
          onMouseEnter={() => onMouseEnter(5)}
          onMouseLeave={() => onMouseLeave(5)}
          onClick={() => handleRatingOnClick(5)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </li>
    </ul>
  );
}

const fillArrayFn = (nota: number): string[] => {
  const result = Array.from({ length: 5 }, (_, index) =>
    index < nota ? "currentColor" : "none"
  );
  return result;
};
