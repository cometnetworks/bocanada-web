// /lib/bot-telegram.ts
import TelegramBot from "node-telegram-bot-api";

// Asegúrate de tener TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en tu .env.local
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  console.warn("⚠️ Telegram no está configurado: falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID");
}

let bot: TelegramBot | null = null;

export function initTelegramBot() {
  if (!token) return null;
  bot = new TelegramBot(token, { polling: false });
  return bot;
}

export async function sendTelegramMessage(message: string) {
  try {
    if (!bot) bot = initTelegramBot();
    if (!bot || !chatId) {
      console.warn("⚠️ No se pudo enviar mensaje a Telegram: faltan credenciales.");
      return;
    }

    await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    console.log("✅ Mensaje enviado a Telegram correctamente");
  } catch (error) {
    console.error("❌ Error al enviar mensaje a Telegram:", error);
  }
}