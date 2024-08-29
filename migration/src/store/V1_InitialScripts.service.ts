import { Injectable, Logger } from '@nestjs/common';
import { Transaction as CommonTransaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';
import { CommonStore } from './CommonStore';

@Injectable()
export class V1_InitialScripts extends CommonStore {
  private readonly logger = new Logger(V1_InitialScripts.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    const transaction = await this.connection.transaction({
      autocommit: false,
      type: CommonTransaction.TYPES.IMMEDIATE,
      isolationLevel: CommonTransaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    try {
      await this.connection.query(
        `
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

CREATE OR REPLACE PROCEDURE "public".create_foreign_key_if_not_exists(IN s_name text, IN t_1_name text, IN t_2_name text, IN k_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    b_name_l1 varchar := replace(k_name, ',', '_');
    b_name_l2 varchar := replace(b_name_l1, '"', '');
    b_name    varchar := replace(b_name_l2, ' ', '');
    cmd text := 'alter table "' || s_name || '"."' || t_1_name || '" add constraint "' || t_1_name || '_' || b_name || '_fk"' || ' foreign key ("' || k_name || '") references "' || s_name || '"."' || t_2_name || '" on delete cascade;';
begin
    RAISE INFO '%', cmd;
    if not exists(select constraint_name from information_schema.constraint_column_usage where table_name = t_2_name and constraint_name = (t_1_name || '_' || b_name || '_fk')) then
        execute cmd;
    end if;
end ;
$$;

CREATE OR REPLACE PROCEDURE "public".create_index_key(IN s_name text, IN t_name text, IN k_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    b_name_l1 varchar := replace(k_name, ',', '_');
    b_name_l2   varchar := replace(b_name_l1, '"', '');
    b_name   varchar := replace(b_name_l2, ' ', '');
    cmd text := 'create index if not exists "' || t_name || '_' || b_name || '_index" on "' || s_name || '"."' || t_name || '" (' || k_name || ')';
begin
    RAISE INFO '%', cmd;
    execute cmd;
end
$$;

CREATE OR REPLACE PROCEDURE "public".create_primary_key_if_not_exists(IN s_name text, IN t_name text, IN k_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    b_name_l1 varchar := replace(k_name, ',', '_');
    b_name_l2 varchar := replace(b_name_l1, '"', '');
    b_name    varchar := replace(b_name_l2, ' ', '');
    cmd text := 'alter table "' || s_name || '"."' || t_name || '" add constraint "' || t_name || '_' || b_name || '_pk"' || ' primary key (' || k_name || ');';
begin
    RAISE INFO '%', cmd;
    if not exists(select constraint_name
                  from information_schema.constraint_column_usage
                  where table_name = t_name
                    and constraint_name = (t_name || '_' || b_name || '_pk')) then
        execute cmd;
    end if;
end ;
$$;

CREATE OR REPLACE PROCEDURE "public".create_unique_index_key(IN s_name text, IN t_name text, IN k_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    b_name_l1 varchar := replace(k_name, ',', '_');
    b_name_l2   varchar := replace(b_name_l1, '"', '');
    b_name   varchar := replace(b_name_l2, ' ', '');
    cmd text := 'create unique index if not exists "' || t_name || '_' || b_name || '_uindex" on "'  || s_name || '"."' || t_name || '" (' || k_name || ')';
begin
    RAISE INFO '%', cmd;
    execute cmd;
end
$$;

CREATE OR REPLACE PROCEDURE "public".create_unique_key_if_not_exists(IN s_name text, IN t_name text, IN k_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    b_name_l1 varchar := replace(k_name, ',', '_');
    b_name_l2 varchar := replace(b_name_l1, '"', '');
    b_name    varchar := replace(b_name_l2, ' ', '');
    cmd text := 'alter table "' || s_name || '"."' || t_name || '" add constraint "' || t_name || '_' || b_name || '_uk"' || ' unique (' || k_name || ');';
begin
    RAISE INFO '%', cmd;
    if not exists(select constraint_name
                  from information_schema.constraint_column_usage
                  where table_name = t_name
                    and constraint_name = t_name || '_' || k_name || '_uk') then
        execute cmd;
    end if;
end ;
$$;

CREATE FUNCTION "public".random_between(low integer, high integer) RETURNS integer
    LANGUAGE plpgsql STRICT
    AS $$
    BEGIN
       RETURN floor(random()* (high-low + 1) + low);
    END;
    $$;


SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE "public"."configurations" (
    "uuid" uuid DEFAULT "public".uuid_generate_v4() NOT NULL,
    "module" text NOT NULL,
    "name" text NOT NULL,
    "value" jsonb DEFAULT '{}'::jsonb,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "deletedAt" timestamp without time zone,
    "audience" jsonb DEFAULT '[]'::jsonb
);
COMMENT ON TABLE "public"."configurations" IS 'Global configuration list for project';

CREATE TABLE "public"."users" (
    "uuid" uuid DEFAULT "public".uuid_generate_v4() NOT NULL,
    "userId" integer DEFAULT "public".random_between(1000000, 1999999) NOT NULL,
    "email" text NOT NULL,
    "requestCount" INTEGER DEFAULT 0,
    "requestLimit" INTEGER DEFAULT 100,
    "password" text NOT NULL,
    "secret" text NOT NULL,
    "roles" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "deletedAt" timestamp without time zone
);
COMMENT ON TABLE "public"."users" IS 'Global user list for product';

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pk" PRIMARY KEY ("uuid");

CREATE TABLE "public"."contacts" (
    "uuid" uuid DEFAULT "public".uuid_generate_v4() NOT NULL,
    "value" text NOT NULL,
    "info" jsonb NOT NULL,
    "type" text,
    "status" text NOT NULL,  
    "code" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "deletedAt" timestamp without time zone
);

ALTER TABLE ONLY "public"."configurations"
ADD CONSTRAINT "configurations_pk" PRIMARY KEY ("uuid");

ALTER TABLE ONLY "public"."contacts"
ADD CONSTRAINT "contacts_pk" PRIMARY KEY ("uuid");

CREATE INDEX "configurations_audience_platform_index" ON "public"."configurations" USING btree ((((audience ->> 'platform'::text))::character varying)) WHERE ((audience ->> 'platform'::text) IS NOT NULL);

CREATE INDEX "configurations_createdAt_index" ON "public"."configurations" USING btree ("createdAt");

CREATE INDEX "configurations_deletedAt_index" ON "public"."configurations" USING btree ("deletedAt");

CREATE INDEX "configurations_module_name_index" ON "public"."configurations" USING btree ("module", "name");

CREATE INDEX "configurations_updatedAt_index" ON "public"."configurations" USING btree ("updatedAt");

CREATE INDEX "configurations_value_access_index" ON "public"."configurations" USING btree (((("value" ->> 'access'::text))::character varying)) WHERE (("value" ->> 'access'::text) IS NOT NULL);

CREATE INDEX "configurations_value_operation_index" ON "public"."configurations" USING btree (((("value" ->> 'operation'::text))::character varying)) WHERE (("value" ->> 'operation'::text) IS NOT NULL);

CREATE INDEX "users_createdAt" ON "public"."users" USING btree ("createdAt");

CREATE INDEX "users_deletedAt" ON "public"."users" USING btree ("deletedAt");

CREATE UNIQUE INDEX users_email_uindex ON "public"."users" USING btree ("email");

CREATE INDEX "users_updatedAt" ON "public"."users" USING btree ("updatedAt");

CREATE UNIQUE INDEX "users_userId_index" ON "public"."users" USING btree ("userId");

INSERT INTO "public"."configurations" ("module", "name", "value") 
VALUES
('user', 'role', '{"access": ["any"], "operation": "PATCH:/api/v1/auth/verify"}'),
('user', 'role', '{"access": ["any"], "operation": "PATCH:/api/v1/auth/checkEmail"}'),
('auth', 'role', '["admin", "manager", "user", "internal"]'),
('lib', 'nodemailer.service', '{"defaults": {"from": "Weather Wise"}, "transport": {"auth": {"pass": "kmcptlkdnbhmcymo", "user": "mher.melqonyan.mher123@gmail.com"}, "service": "gmail"}}'),
('user', 'role', '{"access": ["admin", "manager", "user"], "operation": "GET:/api/v1/user/:uuid"}'),
('user', 'role', '{"access": ["admin"], "operation": "GET:/api/v1/user"}'),
('user', 'role', '{"access": ["admin"], "operation": "DELETE:/api/v1/user/:uuid"}'),
('user', 'role', '{"access": ["admin"], "operation": "PATCH:/api/v1/user/:uuid"}'),
('user', 'role', '{"access": ["any"], "operation": "POST:/api/v1/auth/register"}'),
('user', 'role', '{"access": ["any"], "operation": "POST:/api/v1/auth/login"}'),
('user', 'role', '{"access": ["user"], "operation": "GET:/api/v1/weather"}');
    `,
        { transaction },
      );
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }
}
