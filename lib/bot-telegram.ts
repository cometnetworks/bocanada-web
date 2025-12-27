// /lib/bot-telegram.ts

// Asegúrate de tener TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en tu .env.local
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// La validación se hace al intentar enviar el mensaje para evitar logs innecesarios durante el build.

export async function sendTelegramMessage(message: string) {
  if (!token || !chatId) {
    console.warn("⚠️ No se pudo enviar mensaje a Telegram: faltan credenciales.");
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Telegram API Error:", errorData);
    } else {
      console.log("✅ Mensaje enviado a Telegram correctamente");
    }
  } catch (error) {
    console.error("❌ Error al enviar mensaje a Telegram:", error);
  }
}