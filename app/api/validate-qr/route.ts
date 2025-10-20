import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { qr, secret } = await req.json();
    console.log(`[API /validate-qr] Received QR to validate: "${qr}"`);

    // 1. Validar el PIN secreto del staff
    if (secret !== process.env.STAFF_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!qr) {
      return NextResponse.json({ error: "QR code is missing" }, { status: 400 });
    }

    const admin = supabaseAdmin();

    // 2. Buscar al usuario por su código QR
    const { data: users, error: userError } = await admin
      .from("users")
      .select("id, points")
      .eq("qr_code", qr);

    if (userError || !users || users.length === 0) {
      return NextResponse.json({ error: "QR no encontrado o inválido" }, { status: 404 });
    }
    const user = users[0];
    const userId = user.id;

    // 3. Sumar puntos de forma segura
    const currentPoints = user.points || 0;
    const newPoints = currentPoints + 20;
    const { error: updateError } = await admin
      .from("users")
      .update({ points: newPoints })
      .eq("id", userId);

    if (updateError) {
      throw new Error(`Error actualizando puntos: ${updateError.message}`);
    }

    // 4. Registrar la transacción en el historial de puntos
    const { error: logError } = await admin.from("points_log").insert([
      { user_id: userId, source: "attendance", points: 20, meta: { via: "qr" } },
    ]);

    if (logError) {
      // No detenemos el flujo si el log falla, pero lo notificamos
      console.error("Failed to log points transaction:", logError.message);
    }

    // 5. Comprobar si el usuario alcanzó 100 puntos para un nuevo cupón
    if (newPoints >= 100) {
      const { data: existingCoupon } = await admin
        .from("coupons")
        .select("id")
        .eq("user_id", userId)
        .eq("type", "dinner")
        .eq("status", "active")
        .limit(1);

      if (!existingCoupon || existingCoupon.length === 0) {
        await admin.from("coupons").insert([
          { user_id: userId, type: "dinner", reward: "Cena para 2", status: "active" },
        ]);
      }
    }

    return NextResponse.json({ ok: true, userId, newPoints });

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
