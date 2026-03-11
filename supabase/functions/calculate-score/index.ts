import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { onboardingData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const filledFields = Object.values(onboardingData).filter((v: unknown) => typeof v === "string" && (v as string).trim().length > 0).length;
    if (filledFields === 0) {
      return new Response(JSON.stringify({ score: 0, strengths: [], risks: ["No profile data provided yet. Complete onboarding to get your score."] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a funding readiness evaluator for small businesses and entrepreneurs. Given business profile data, calculate a funding readiness score from 0-100 and provide strengths and areas to improve.

Score guidelines:
- 0-20: Very early stage, minimal information
- 21-40: Some info but key gaps
- 41-60: Decent foundation, needs more detail
- 61-80: Strong profile, minor improvements needed  
- 81-100: Excellent, very fundable

You MUST respond using the calculate_score tool.`,
          },
          {
            role: "user",
            content: `Evaluate this business profile for funding readiness:
Business Name: ${onboardingData.business_name || "Not provided"}
Industry: ${onboardingData.industry || "Not provided"}
Location: ${onboardingData.location || "Not provided"}
Years in Operation: ${onboardingData.years_in_operation || "Not provided"}
Team Size: ${onboardingData.team_size || "Not provided"}
Current Revenue: ${onboardingData.current_revenue || "Not provided"}
Funding Needed: ${onboardingData.funding_needed || "Not provided"}
Market Demand: ${onboardingData.market_demand || "Not provided"}
Business Description: ${onboardingData.business_description || "Not provided"}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "calculate_score",
              description: "Return the funding readiness score with strengths and risks",
              parameters: {
                type: "object",
                properties: {
                  score: { type: "number", description: "Funding readiness score 0-100" },
                  strengths: { type: "array", items: { type: "string" }, description: "2-4 strengths of the business profile" },
                  risks: { type: "array", items: { type: "string" }, description: "2-4 areas that need improvement" },
                },
                required: ["score", "strengths", "risks"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "calculate_score" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const parsed = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("calculate-score error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
