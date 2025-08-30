import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
  };
  web_app_data?: {
    data: string;
    button_text: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN not configured')
    }

    if (req.method === 'POST') {
      // Handle webhook from Telegram
      const update: TelegramUpdate = await req.json()
      
      console.log('Received Telegram update:', update)

      // Handle different types of updates
      if (update.message) {
        const { message } = update
        const chatId = message.chat.id
        
        // Handle /start command
        if (message.text === '/start') {
          await sendWelcomeMessage(chatId, TELEGRAM_BOT_TOKEN)
        }
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Handle GET requests for webhook setup
    if (req.method === 'GET') {
      const url = new URL(req.url)
      const action = url.searchParams.get('action')
      
      if (action === 'setWebhook') {
        const webhookUrl = `${url.origin}/functions/v1/telegram-webhook`
        const result = await setWebhook(TELEGRAM_BOT_TOKEN, webhookUrl)
        
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      if (action === 'getWebhookInfo') {
        const result = await getWebhookInfo(TELEGRAM_BOT_TOKEN)
        
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in telegram-webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function sendWelcomeMessage(chatId: number, botToken: string) {
  const message = `🚀 Welcome to Teejaro Crypto Card Hub!

Manage your crypto cards, bank accounts, and transactions directly in Telegram.

Tap the button below to launch the app:`

  const keyboard = {
    inline_keyboard: [[
      {
        text: "🏦 Open Teejaro App",
        web_app: {
          url: `${new URL(req.url).origin}?forceHideBadge=true`
        }
      }
    ]]
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      reply_markup: keyboard,
    }),
  })

  return await response.json()
}

async function setWebhook(botToken: string, webhookUrl: string) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ['message', 'web_app_data'],
    }),
  })

  return await response.json()
}

async function getWebhookInfo(botToken: string) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`)
  return await response.json()
}