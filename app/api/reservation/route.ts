import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendTelegramMessage } from "@/lib/bot-telegram";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, date, time, guests, phone, occasion } = data;

    // Configurar transporte SMTP con Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true para 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Email para el cliente
    const mailToCustomer = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Confirmación de tu reserva en Bocanada Cocina de Brassa`,
      html: `
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
      `,
    };

    // 📩 Email interno para el restaurante
    const mailToAdmin = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `🆕 Nueva reservación - ${name}`,
      html: `
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
      `,
    };

    // Enviar correos
    await transporter.sendMail(mailToCustomer);
    await transporter.sendMail(mailToAdmin);

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

    return NextResponse.json({ success: true, message: "Correo enviado correctamente." });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ success: false, error: "Error al enviar el correo." }, { status: 500 });
  }
}