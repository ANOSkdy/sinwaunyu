import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const AIRTABLE_API_URL = "https://api.airtable.com/v0";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_CONTACT =
  process.env.AIRTABLE_TABLE_CONTACT ?? "contact";

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn(
    "[/api/contact] Missing env: AIRTABLE_API_KEY or AIRTABLE_BASE_ID"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name ?? "").toString().trim();
    const companyName = (body.companyName ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const tel = (body.tel ?? "").toString().trim();
    const category = (body.category ?? "other").toString().trim();
    const subject = (body.subject ?? "").toString().trim();
    const message = (body.message ?? "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "必須項目が入力されていません。" },
        { status: 400 }
      );
    }

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { ok: false, error: "サーバー設定が不足しています。" },
        { status: 500 }
      );
    }

    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_CONTACT
    )}`;

    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          name,
          company_name: companyName || undefined,
          email,
          tel: tel || undefined,
          category,
          subject: subject || undefined,
          message,
          received_at: new Date().toISOString(),
          status: "new",
        },
      }),
    });

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.error("[/api/contact] Airtable error:", text);
      return NextResponse.json(
        { ok: false, error: "お問い合わせの送信に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/contact] Unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "サーバー側でエラーが発生しました。" },
      { status: 500 }
    );
  }
}
