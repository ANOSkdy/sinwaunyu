const AIRTABLE_API_URL = "https://api.airtable.com/v0";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error(
    "Airtable env vars are missing. Check AIRTABLE_API_KEY and AIRTABLE_BASE_ID."
  );
}

const TABLE_COMPANY = process.env.AIRTABLE_TABLE_COMPANY ?? "company";
const TABLE_NEWS = process.env.AIRTABLE_TABLE_NEWS ?? "news";
const TABLE_VEHICLES = process.env.AIRTABLE_TABLE_VEHICLES ?? "vehicles";
const TABLE_RECRUIT = process.env.AIRTABLE_TABLE_RECRUIT ?? "recruit";
const TABLE_CONTACT = process.env.AIRTABLE_TABLE_CONTACT ?? "contact";

type AirtableListResponse<T> = {
  records: AirtableRecord<T>[];
};

export type AirtableRecord<T> = {
  id: string;
  fields: T;
  createdTime: string;
};

export type AirtableAttachment = {
  url: string;
  filename?: string;
  size?: number;
  type?: string;
};

/**
 * TEXT/Attachment 両対応で URL を安全に取り出すヘルパー
 */
export function getAttachmentUrl(
  field?: AirtableAttachment[] | string | null
): string | undefined {
  if (Array.isArray(field)) {
    return field?.[0]?.url;
  }
  if (typeof field === "string") {
    return field || undefined;
  }
  return undefined;
}

async function airtableFetch<T>(
  tableName: string,
  params: Record<string, string> = {}
): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    tableName
  )}?${searchParams.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Airtable error:", text);
    throw new Error(`Failed to fetch from Airtable: ${res.status}`);
  }

  return (await res.json()) as T;
}

/* ========== company テーブル ========== */
export type CompanyFields = {
  company_id?: string;
  name?: string;
  name_kana?: string;
  catch_phrase?: string;
  description?: string;
  postal_code?: string;
  address_pref?: string;
  address_city?: string;
  address_line?: string;
  tel?: string;
  fax?: string;
  email?: string;
  service_area?: string;
  geo_lat?: number;
  geo_lng?: number;
  established_on?: string;
  license_info?: string;
};

export async function getCompanyProfile() {
  const data = await airtableFetch<AirtableListResponse<CompanyFields>>(
    TABLE_COMPANY,
    {
      pageSize: "1",
    }
  );

  return data.records[0] ?? null;
}

/* ========== news テーブル ========== */
export type NewsFields = {
  slug?: string;
  title: string;
  category?: string;
  summary?: string;
  body?: string;
  published_at?: string;
  is_published?: boolean;
  hero_image_url?: AirtableAttachment[] | string;
  meta_title?: string;
  meta_description?: string;
};

/** TOP などで使う最新ニュース */
export async function getLatestNews(limit = 3) {
  const pageSize = Math.min(Math.max(limit, 1), 100);
  const params: Record<string, string> = {
    pageSize: String(pageSize),
    "sort[0][field]": "published_at",
    "sort[0][direction]": "desc",
  };

  const data = await airtableFetch<AirtableListResponse<NewsFields>>(
    TABLE_NEWS,
    params
  );

  return data.records.filter((r) => r.fields.is_published !== false);
}

/** 一覧ページ用：公開中ニュースを全件取得 */
export async function getAllNews(limit = 100) {
  const pageSize = Math.min(Math.max(limit, 1), 100);
  const params: Record<string, string> = {
    pageSize: String(pageSize),
    "sort[0][field]": "published_at",
    "sort[0][direction]": "desc",
  };

  const data = await airtableFetch<AirtableListResponse<NewsFields>>(
    TABLE_NEWS,
    params
  );

  return data.records.filter((r) => r.fields.is_published !== false);
}

/** 詳細ページ用：slug で 1件取得（Formula を使わず JS 側で絞りこむ） */
export async function getNewsBySlug(slug: string) {
  const records = await getAllNews(100);
  return records.find((r) => r.fields.slug === slug) ?? null;
}

/* ========== vehicles テーブル ========== */
export type VehicleFields = {
  slug?: string;
  name: string;
  vehicle_type?: string;
  capacity_ton?: number;
  description?: string;
  image_url?: AirtableAttachment[];
  is_published?: boolean;
  sort_order?: number;
};

export async function getVehicles(limit = 6) {
  const pageSize = Math.min(Math.max(limit, 1), 100);
  const params: Record<string, string> = {
    pageSize: String(pageSize),
    "sort[0][field]": "sort_order",
    "sort[0][direction]": "asc",
  };

  const data = await airtableFetch<AirtableListResponse<VehicleFields>>(
    TABLE_VEHICLES,
    params
  );

  return data.records.filter((r) => r.fields.is_published !== false);
}

/* ========== recruit テーブル ========== */
export type RecruitFields = {
  slug?: string;
  title: string;
  employment_type?: string;
  location?: string;
  description?: string;
  requirements?: string;
  work_time?: string;
  holiday?: string;
  salary_min?: number;
  salary_max?: number;
  salary_unit?: string;
  contact_email?: string;
  is_active?: boolean;
  published_at?: string;
};

export async function getActiveRecruitPositions(limit = 20) {
  const pageSize = Math.min(Math.max(limit, 1), 100);
  const params: Record<string, string> = {
    pageSize: String(pageSize),
    "sort[0][field]": "published_at",
    "sort[0][direction]": "desc",
  };

  const data = await airtableFetch<AirtableListResponse<RecruitFields>>(
    TABLE_RECRUIT,
    params
  );

  return data.records.filter((r) => r.fields.is_active !== false);
}

/** 採用詳細ページ用：slug で 1件取得 */
export async function getRecruitBySlug(slug: string) {
  const records = await getActiveRecruitPositions(100);
  return records.find((r) => r.fields.slug === slug) ?? null;
}

/* ========== contact テーブル ========== */
export type ContactFields = {
  name: string;
  company_name?: string;
  email: string;
  tel?: string;
  category?: string;
  subject?: string;
  message?: string;
  received_at?: string;
  status?: string;
};

export async function getContactMessages(limit = 20) {
  const pageSize = Math.min(Math.max(limit, 1), 100);
  const params: Record<string, string> = {
    pageSize: String(pageSize),
    "sort[0][field]": "received_at",
    "sort[0][direction]": "desc",
  };

  const data = await airtableFetch<AirtableListResponse<ContactFields>>(
    TABLE_CONTACT,
    params
  );

  return data.records;
}
