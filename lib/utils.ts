import { useCurrentCinema } from "@/app/hooks/useCurrentCinema";
import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIsRootTenant(idCinema: string) {
  return idCinema === process.env.NEXT_APP_ROOT_TENANT_ID;
}

export function GetIsRootCinema() {
  const currentCinema = useCurrentCinema();
  return currentCinema.info.id === process.env.NEXT_APP_ROOT_TENANT_ID;
}

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function maskCurrency(
  valor: number,
  locale = "pt-BR",
  currency = "BRL"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(valor);
}

export const handleInputCurrencyChange = (
  event: ChangeEvent<HTMLInputElement>
) => {
  const onlyDigits = (event?.target?.value || "")
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(3, "0");

  const digitsFloat = `${onlyDigits.slice(0, -2)}.${onlyDigits.slice(-2)}`;
  event.target.value = maskCurrency(Number(digitsFloat));
};

export const currencyParser = (val: string | number | undefined): number => {
  try {
    const locale = "pt-br";
    if (typeof val === "string" && !val.length) {
      val = "";
    }

    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    let reversedVal = val
      ? val.toString().replace(new RegExp(`\\${group}`, "g"), "")
      : "";
    reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, "g"), ".");

    reversedVal = reversedVal.replace(/[^0-9.]/g, "");

    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = (
        parseFloat(reversedVal) *
        10 ** (digitsAfterDecimalCount - 2)
      ).toString();
    }

    return Number.isNaN(parseFloat(reversedVal)) ? 0 : parseFloat(reversedVal);
  } catch (error) {
    return 0;
  }
};

export function CPFParser(cpf: string) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return "CPF inválido. O CPF deve conter 11 dígitos.";
  }
  return cpf;
}
