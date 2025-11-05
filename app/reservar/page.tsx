import Reservation from "@/components/Reservation";
import { Suspense } from "react";

export default function ReservarPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Reservation />
    </Suspense>
  );
}