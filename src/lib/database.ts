import "server-only";

import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";

const EXPECTED_SITE_KEY = "sinwa";

type SqlClient = NeonQueryFunction<false, false>;

let client: SqlClient | undefined;
let identityCheck: Promise<void> | undefined;

function getClient(): SqlClient {
  if (client) {
    return client;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  client = neon(connectionString);
  return client;
}

async function verifySiteIdentity(sql: SqlClient): Promise<void> {
  const rows = await sql`
    SELECT site_key
    FROM site_public.site_identity
  `;

  if (rows.length !== 1 || rows[0]?.site_key !== EXPECTED_SITE_KEY) {
    throw new Error("The database target does not match the Shinwa site.");
  }
}

async function getVerifiedClient(): Promise<SqlClient> {
  const sql = getClient();
  identityCheck ??= verifySiteIdentity(sql);

  try {
    await identityCheck;
  } catch (error) {
    identityCheck = undefined;
    throw error;
  }

  return sql;
}

export async function querySitePublic<
  Row extends Record<string, unknown>,
>(queryText: string, parameters: readonly unknown[] = []): Promise<Row[]> {
  const sql = await getVerifiedClient();
  const rows = await sql.query(queryText, [...parameters]);
  return rows as Row[];
}
