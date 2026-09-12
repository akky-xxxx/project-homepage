import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accounts" ADD COLUMN "issuer" varchar NOT NULL;
  CREATE UNIQUE INDEX "issuer_accountId_idx" ON "accounts" USING btree ("issuer","account_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "issuer_accountId_idx";
  ALTER TABLE "accounts" DROP COLUMN "issuer";`)
}
