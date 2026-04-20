// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "younismohamed87643@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");

    const app = await req.json();

    const row = (label: string, value: any) =>
      value
        ? `<tr><td style="padding:8px 12px;background:#faf7f2;font-weight:600;color:#4D0B00;border-bottom:1px solid #eee;">${label}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${value}</td></tr>`
        : "";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden;">
        <div style="background:#4D0B00;color:#fff;padding:20px 24px;">
          <h1 style="margin:0;font-size:20px;">📩 طلب اشتراك جديد — Al Shatibi</h1>
          <p style="margin:6px 0 0;opacity:.85;font-size:13px;">New Enrollment Application</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("الاسم / Name", app.full_name)}
          ${row("الإيميل / Email", `<a href="mailto:${app.email}">${app.email}</a>`)}
          ${row("الموبايل / Phone", `<a href="https://wa.me/${String(app.phone).replace(/[^0-9]/g, "")}">${app.phone}</a>`)}
          ${row("البلد / Country", app.country)}
          ${row("اللغة / Language", app.language)}
          ${row("العمر / Age", app.age)}
          ${row("النوع / Gender", app.gender)}
          ${row("المستوى / Level", app.level)}
          ${row("الهدف / Goal", app.goal)}
          ${row("الأيام المتاحة", Array.isArray(app.available_days) ? app.available_days.join(", ") : "")}
          ${row("الأوقات المفضلة", app.available_times)}
          ${row("ملاحظات / Message", app.message)}
        </table>
        <div style="padding:16px 24px;background:#faf7f2;color:#666;font-size:12px;text-align:center;">
          تواصل مع الطالب خلال 24 ساعة • Al Shatibi Academy
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Al Shatibi <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        reply_to: app.email,
        subject: `📩 طلب جديد: ${app.full_name} — ${app.goal}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
