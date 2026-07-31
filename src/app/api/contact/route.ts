import { NextResponse } from "next/server";

import { submitContact } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 64 * 1024;

function textField(
  body: Record<string, unknown>,
  name: string,
  maxLength: number,
): string | null {
  const value = body[name];
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, error: "リクエストが大きすぎます。" },
      { status: 413 },
    );
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, error: "リクエストが大きすぎます。" },
      { status: 413 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json(
      { ok: false, error: "入力内容を確認してください。" },
      { status: 400 },
    );
  }

  const body = parsed as Record<string, unknown>;
  const name = textField(body, "name", 200);
  const companyName = textField(body, "companyName", 200);
  const email = textField(body, "email", 320);
  const phone = textField(body, "tel", 50);
  const category = textField(body, "category", 200);
  const subject = textField(body, "subject", 300);
  const message = textField(body, "message", 10_000);

  if (
    name === null ||
    companyName === null ||
    email === null ||
    phone === null ||
    category === null ||
    subject === null ||
    message === null ||
    !name ||
    !email ||
    !message
  ) {
    return NextResponse.json(
      { ok: false, error: "必須項目が入力されていません。" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "メールアドレスを確認してください。" },
      { status: 400 },
    );
  }

  try {
    await submitContact({
      name,
      companyName,
      email,
      phone,
      category: category || "other",
      subject,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[api/contact] Contact submission failed.");
    return NextResponse.json(
      { ok: false, error: "お問い合わせの送信に失敗しました。" },
      { status: 500 },
    );
  }
}
