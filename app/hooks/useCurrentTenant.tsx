import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { destroyCookie, setCookie } from "nookies";

interface TenantId {
  tenantId: string | undefined;
  setTenantId: (tenantId: string) => void;
  removeTenantId: () => void;
}

const useTenantId = create(
  persist<TenantId>(
    (set) => ({
      tenantId: undefined,
      setTenantId: (tenantId) => {
        setCookie(undefined, "/landing", tenantId);
        set({ tenantId });
      },
      removeTenantId: () => {
        set({ tenantId: undefined });
      },
    }),
    {
      name: "tenantId-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTenantId;
