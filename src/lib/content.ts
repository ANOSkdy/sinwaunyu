import "server-only";

import { querySitePublic } from "@/lib/database";

export type ContentRecord<T> = {
  id: string;
  fields: T;
  createdTime: string;
};

export type MediaAttachment = {
  url: string;
  filename?: string;
  size?: number;
  type?: string;
};

export function getAttachmentUrl(
  field?: MediaAttachment[] | string | null,
): string | undefined {
  if (Array.isArray(field)) {
    return field[0]?.url;
  }
  if (typeof field === "string") {
    return field || undefined;
  }
  return undefined;
}

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
  representative?: string;
  capital?: string;
  employees?: string;
  business_content?: string;
  qualification?: string;
};

export type NewsFields = {
  slug?: string;
  title: string;
  category?: string;
  summary?: string;
  body?: string;
  published_at?: string;
  is_published?: boolean;
  hero_image_url?: MediaAttachment[] | string;
  meta_title?: string;
  meta_description?: string;
};

export type VehicleFields = {
  slug?: string;
  name: string;
  vehicle_type?: string;
  capacity_ton?: number;
  description?: string;
  image_url?: MediaAttachment[];
  is_published?: boolean;
  sort_order?: number;
};

export type RentalForkliftFields = {
  maker?: string;
  capacity?: string;
  power?: string;
  fork_length?: string;
  usage?: string;
  sort_order?: number;
  is_published?: boolean;
};

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

type CompanyRow = {
  id: string;
  name: string | null;
  name_kana: string | null;
  catch_phrase: string | null;
  description: string | null;
  postal_code: string | null;
  address_pref: string | null;
  address_city: string | null;
  address_line: string | null;
  tel: string | null;
  fax: string | null;
  email: string | null;
  service_area: string | null;
  geo_lat: number | null;
  geo_lng: number | null;
  established_on: string | null;
  license_info: string | null;
  representative: string | null;
  capital: string | null;
  employees: string | null;
  business_content: string | null;
  qualification: string | null;
};

type NewsRow = {
  id: string;
  slug: string | null;
  title: string;
  category: string | null;
  summary: string | null;
  body_markdown: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_date: string | null;
  media: MediaAttachment[];
};

type VehicleRow = {
  id: string;
  slug: string | null;
  name: string;
  vehicle_type: string | null;
  capacity_ton: number | null;
  description: string | null;
  sort_order: number;
  image_url: string | null;
  image_mime_type: string | null;
  image_alt_text: string | null;
};

type RentalRow = {
  id: string;
  maker: string | null;
  capacity: string | null;
  power: string | null;
  fork_length: string | null;
  usage: string | null;
  sort_order: number;
};

type RecruitRow = {
  id: string;
  slug: string | null;
  title: string;
  employment_type: string | null;
  location: string | null;
  description_text: string | null;
  requirements_text: string | null;
  work_time: string | null;
  holiday: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_unit: string | null;
  contact_email: string | null;
  published_date: string | null;
};

function optional<T>(value: T | null): T | undefined {
  return value ?? undefined;
}

function record<T>(
  id: string,
  fields: T,
  createdTime = "",
): ContentRecord<T> {
  return { id, fields, createdTime };
}

export async function getCompanyProfile(): Promise<
  ContentRecord<CompanyFields> | null
> {
  const rows = await querySitePublic<CompanyRow>(`
    SELECT
      id::text,
      name,
      name_kana,
      catch_phrase,
      description,
      postal_code,
      address_pref,
      address_city,
      address_line,
      tel,
      fax,
      email,
      service_area,
      geo_lat,
      geo_lng,
      to_char(established_on, 'YYYY-MM-DD') AS established_on,
      license_info,
      representative,
      capital,
      employees,
      business_content,
      qualification
    FROM site_public.company_profile
    LIMIT 1
  `);
  const company = rows[0];
  if (!company) {
    return null;
  }

  return record(company.id, {
    company_id: company.id,
    name: optional(company.name),
    name_kana: optional(company.name_kana),
    catch_phrase: optional(company.catch_phrase),
    description: optional(company.description),
    postal_code: optional(company.postal_code),
    address_pref: optional(company.address_pref),
    address_city: optional(company.address_city),
    address_line: optional(company.address_line),
    tel: optional(company.tel),
    fax: optional(company.fax),
    email: optional(company.email),
    service_area: optional(company.service_area),
    geo_lat: optional(company.geo_lat),
    geo_lng: optional(company.geo_lng),
    established_on: optional(company.established_on),
    license_info: optional(company.license_info),
    representative: optional(company.representative),
    capital: optional(company.capital),
    employees: optional(company.employees),
    business_content: optional(company.business_content),
    qualification: optional(company.qualification),
  });
}

const NEWS_COLUMNS = `
  n.id::text,
  n.slug,
  n.title,
  n.category,
  n.summary,
  n.body_markdown,
  n.meta_title,
  n.meta_description,
  to_char(
    n.published_at AT TIME ZONE 'Asia/Tokyo',
    'YYYY-MM-DD'
  ) AS published_date,
  COALESCE(
    (
      SELECT json_agg(
        json_build_object(
          'url', media.public_url,
          'type', media.mime_type
        )
        ORDER BY media.sort_order ASC, media.media_id ASC
      )
      FROM site_public.news_media AS media
      WHERE media.news_id = n.id
    ),
    '[]'::json
  ) AS media
`;

function toNews(row: NewsRow): ContentRecord<NewsFields> {
  return record(
    row.id,
    {
      slug: optional(row.slug),
      title: row.title,
      category: optional(row.category),
      summary: optional(row.summary),
      body: optional(row.body_markdown),
      published_at: optional(row.published_date),
      is_published: true,
      hero_image_url: row.media,
      meta_title: optional(row.meta_title),
      meta_description: optional(row.meta_description),
    },
    row.published_date ?? "",
  );
}

async function getNews(limit: number): Promise<ContentRecord<NewsFields>[]> {
  const rows = await querySitePublic<NewsRow>(
    `
      SELECT ${NEWS_COLUMNS}
      FROM site_public.news AS n
      ORDER BY n.published_at DESC, n.sort_order ASC, n.id DESC
      LIMIT $1
    `,
    [Math.min(Math.max(limit, 1), 1_000)],
  );
  return rows.map(toNews);
}

export async function getLatestNews(
  limit = 5,
): Promise<ContentRecord<NewsFields>[]> {
  return getNews(limit);
}

export async function getAllNews(
  limit = 1_000,
): Promise<ContentRecord<NewsFields>[]> {
  return getNews(limit);
}

export async function getNewsBySlug(
  slug: string,
): Promise<ContentRecord<NewsFields> | null> {
  const rows = await querySitePublic<NewsRow>(
    `
      SELECT ${NEWS_COLUMNS}
      FROM site_public.news AS n
      WHERE n.slug = $1
      LIMIT 1
    `,
    [slug],
  );
  return rows[0] ? toNews(rows[0]) : null;
}

export async function getVehicles(
  limit = 6,
): Promise<ContentRecord<VehicleFields>[]> {
  const rows = await querySitePublic<VehicleRow>(
    `
      SELECT
        id::text,
        slug,
        name,
        vehicle_type,
        capacity_ton,
        description,
        sort_order,
        image_url,
        image_mime_type,
        image_alt_text
      FROM site_public.vehicles
      ORDER BY sort_order ASC, published_at DESC, id DESC
      LIMIT $1
    `,
    [Math.min(Math.max(limit, 1), 100)],
  );

  return rows.map((row) =>
    record(row.id, {
      slug: optional(row.slug),
      name: row.name,
      vehicle_type: optional(row.vehicle_type),
      capacity_ton: optional(row.capacity_ton),
      description: optional(row.description),
      image_url: row.image_url
        ? [
            {
              url: row.image_url,
              type: optional(row.image_mime_type),
              filename: optional(row.image_alt_text),
            },
          ]
        : undefined,
      is_published: true,
      sort_order: row.sort_order,
    }),
  );
}

export async function getRentalForklifts(
  limit = 20,
): Promise<ContentRecord<RentalForkliftFields>[]> {
  const rows = await querySitePublic<RentalRow>(
    `
      SELECT
        id::text,
        maker,
        capacity,
        power,
        fork_length,
        usage,
        sort_order
      FROM site_public.rental_forklifts
      ORDER BY sort_order ASC, published_at DESC, id DESC
      LIMIT $1
    `,
    [Math.min(Math.max(limit, 1), 100)],
  );

  return rows.map((row) =>
    record(row.id, {
      maker: optional(row.maker),
      capacity: optional(row.capacity),
      power: optional(row.power),
      fork_length: optional(row.fork_length),
      usage: optional(row.usage),
      sort_order: row.sort_order,
      is_published: true,
    }),
  );
}

function toRecruit(
  row: RecruitRow,
): ContentRecord<RecruitFields> {
  return record(
    row.id,
    {
      slug: optional(row.slug),
      title: row.title,
      employment_type: optional(row.employment_type),
      location: optional(row.location),
      description: optional(row.description_text),
      requirements: optional(row.requirements_text),
      work_time: optional(row.work_time),
      holiday: optional(row.holiday),
      salary_min: optional(row.salary_min),
      salary_max: optional(row.salary_max),
      salary_unit: optional(row.salary_unit),
      contact_email: optional(row.contact_email),
      is_active: true,
      published_at: optional(row.published_date),
    },
    row.published_date ?? "",
  );
}

const RECRUIT_COLUMNS = `
  id::text,
  slug,
  title,
  employment_type,
  location,
  description_text,
  requirements_text,
  work_time,
  holiday,
  salary_min,
  salary_max,
  salary_unit,
  contact_email,
  to_char(
    published_at AT TIME ZONE 'Asia/Tokyo',
    'YYYY-MM-DD'
  ) AS published_date
`;

export async function getActiveRecruitPositions(
  limit = 20,
): Promise<ContentRecord<RecruitFields>[]> {
  const rows = await querySitePublic<RecruitRow>(
    `
      SELECT ${RECRUIT_COLUMNS}
      FROM site_public.recruit_positions
      ORDER BY published_at DESC, sort_order ASC, id DESC
      LIMIT $1
    `,
    [Math.min(Math.max(limit, 1), 100)],
  );
  return rows.map(toRecruit);
}

export async function getRecruitBySlug(
  slug: string,
): Promise<ContentRecord<RecruitFields> | null> {
  const rows = await querySitePublic<RecruitRow>(
    `
      SELECT ${RECRUIT_COLUMNS}
      FROM site_public.recruit_positions
      WHERE slug = $1
      LIMIT 1
    `,
    [slug],
  );
  return rows[0] ? toRecruit(rows[0]) : null;
}

export async function submitContact(input: {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
}): Promise<void> {
  await querySitePublic<{ inquiry_id: string }>(
    `
      SELECT site_public.submit_contact(
        $1, $2, $3, $4, $5, $6, $7
      )::text AS inquiry_id
    `,
    [
      input.name,
      input.companyName,
      input.email,
      input.phone,
      input.category,
      input.subject,
      input.message,
    ],
  );
}
