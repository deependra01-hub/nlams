import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { parcelService } from "../services/parcel.service";
import type { Parcel, ParcelStatus } from "../types/parcel.types";

interface ParcelContextValue {
  parcels: Parcel[];
  activeParcelId: string | null;
  activeParcel: Parcel | null;
  setActiveParcelId: (parcelId: string | null) => void;
  getParcelById: (parcelId: string) => Parcel | null;
  getParcelsByStatus: (status?: ParcelStatus) => Parcel[];
  stats: ReturnType<typeof parcelService.getStats>;
}

const ParcelContext = createContext<ParcelContextValue | undefined>(undefined);

export function ParcelProvider({ children }: PropsWithChildren) {
  const [activeParcelId, setActiveParcelId] = useState<string | null>(null);
  const parcels = parcelService.getParcels();
  const stats = parcelService.getStats();
  const activeParcel = parcels.find((parcel) => parcel.id === activeParcelId) ?? null;

  const value = useMemo<ParcelContextValue>(
    () => ({
      parcels,
      activeParcelId,
      activeParcel,
      setActiveParcelId,
      getParcelById: parcelService.getParcelById,
      getParcelsByStatus: parcelService.listParcels,
      stats,
    }),
    [activeParcel, activeParcelId, parcels, stats],
  );

  return <ParcelContext.Provider value={value}>{children}</ParcelContext.Provider>;
}

export function useParcels() {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error("useParcels must be used within ParcelProvider");
  }
  return context;
}
