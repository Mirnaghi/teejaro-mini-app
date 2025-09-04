import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
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
      const authData: TelegramAuthData = await req.json()
      
      // Verify Telegram authentication data
      const isValid = await verifyTelegramAuth(authData, TELEGRAM_BOT_TOKEN)
      
      if (!isValid) {
        return new Response(JSON.stringify({ error: 'Invalid authentication data' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Create or get user from Supabase
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Check if user exists
      const { data: existingUser } = await supabase
        .from('telegram_users')
        .select('*')
        .eq('telegram_id', authData.id)
        .single()

      let userData
      if (existingUser) {
        // Update existing user
        const { data } = await supabase
          .from('telegram_users')
          .update({
            first_name: authData.first_name,
            last_name: authData.last_name,
            username: authData.username,
            photo_url: authData.photo_url,
            last_login: new Date().toISOString(),
          })
          .eq('telegram_id', authData.id)
          .select()
          .single()
        
        userData = data
      } else {
        // Create new user
        const { data } = await supabase
          .from('telegram_users')
          .insert({
            telegram_id: authData.id,
            first_name: authData.first_name,
            last_name: authData.last_name,
            username: authData.username,
            photo_url: authData.photo_url,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
          })
          .select()
          .single()
        
        userData = data
      }

      return new Response(JSON.stringify({ 
        success: true, 
        user: userData 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in telegram-auth:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function verifyTelegramAuth(authData: TelegramAuthData, botToken: string): Promise<boolean> {
  const { hash, ...dataWithoutHash } = authData
  
  // Create data check string
  const dataCheckString = Object.keys(dataWithoutHash)
    .sort()
    .map(key => `${key}=${dataWithoutHash[key as keyof typeof dataWithoutHash]}`)
    .join('\n')
  
  // Create secret key
  const encoder = new TextEncoder()
  const secretKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(botToken),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  // Calculate hash
  const signature = await crypto.subtle.sign('HMAC', secretKey, encoder.encode(dataCheckString))
  const calculatedHash = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  
  return calculatedHash === hash
}