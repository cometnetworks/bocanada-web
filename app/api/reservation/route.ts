import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage } from "@/lib/bot-telegram";

// Inicialización segura para build time
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, date, time, guests, phone, occasion } = data;

    // 📩 Email para el cliente
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>¡Gracias por reservar, ${name}!</h2>
        <p>Tu reservación ha sido confirmada:</p>
        <ul>
          <li><strong>Fecha:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
          <li><strong>Comensales:</strong> ${guests}</li>
          <li><strong>Teléfono:</strong> ${phone}</li>
          ${occasion ? `<li><strong>Ocasión:</strong> ${occasion}</li>` : ""}
        </ul>
        <p>Te esperamos en <strong>Bocanada Cocina de Brassa</strong>.</p>
        <p>📍 Calle Bahía de Sta. Bárbara 64, Verónica Anzúres, CDMX</p>
        <p>📞 55 9316 3674</p>
        <p style="margin-top: 20px;">Si necesitas modificar tu reserva, responde a este correo.</p>
        <hr/>
        <p style="font-size: 12px; color: #888;">Bocanada Cocina de Brassa © 2025</p>
      </div>
    `;

    // 📩 Email interno para el restaurante
    const adminHtml = `
      <h3>Detalles de la reserva:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
        <li><strong>Fecha:</strong> ${date}</li>
        <li><strong>Hora:</strong> ${time}</li>
        <li><strong>Comensales:</strong> ${guests}</li>
        ${occasion ? `<li><strong>Ocasión:</strong> ${occasion}</li>` : ""}
      </ul>
    `;

    // 📩 Enviar correos usando Resend
    // Usamos Promise.allSettled para asegurar que un fallo no detenga el otro envío
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: process.env.EMAIL_FROM || "Bocanada <reservas@bocanada.mx>",
        to: email,
        subject: `Confirmación de tu reserva en Bocanada Cocina de Brassa`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: process.env.EMAIL_FROM || "Bocanada <reservas@bocanada.mx>",
        to: process.env.EMAIL_USER as string, // Asegúrate de que esta variable tenga el email del admin
        subject: `🆕 Nueva reservación - ${name}`,
        html: adminHtml,
      }),
    ]);

    // Loguear errores de email si los hubo
    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`❌ Error enviando email ${index === 0 ? "al cliente" : "admin"}:`, result.reason);
      } else if (result.value.error) {
        console.error(`❌ Error de API Resend ${index === 0 ? "al cliente" : "admin"}:`, result.value.error);
      }
    });

    // Enviar notificación a Telegram
    await sendTelegramMessage(`
      📅 <b>Nueva reserva en Bocanada</b>
      👤 <b>Nombre:</b> ${name}
      📞 <b>Teléfono:</b> ${phone}
      📧 <b>Email:</b> ${email}
      👥 <b>Comensales:</b> ${guests}
      ⏰ <b>Hora:</b> ${time}
      📆 <b>Fecha:</b> ${date}
      🎉 <b>Ocasión:</b> ${occasion || "No especificada"}
    `);

    return NextResponse.json({ success: true, message: "Reserva procesada." });
  } catch (error) {
    console.error("Error procesando reserva:", error);
    return NextResponse.json({ success: false, error: "Error al crear la reserva." }, { status: 500 });
  }
}