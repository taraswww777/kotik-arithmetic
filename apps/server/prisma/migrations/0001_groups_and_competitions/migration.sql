-- Миграция: добавление таблиц Group, GroupMember, Competition, CompetitionEntry
-- Группа пользователей и соревнования (архитектурный задел)

-- Таблица Group — объединения пользователей (класс, семья)
CREATE TYPE "public"."member_role" AS ENUM ('MEMBER_ROLE_MEMBER', 'MEMBER_ROLE_ORGANIZER');

CREATE TABLE IF NOT EXISTS "Group" (
    "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"          TEXT NOT NULL,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL
);

-- Таблица Competition — соревнования с заданными правилами сравнения
CREATE TYPE "public"."user_role_enum" AS ENUM ('USER_ROLE_CHILD', 'USER_ROLE_PARENT');

CREATE TABLE IF NOT EXISTS "Competition" (
    "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"          TEXT NOT NULL,
    "description"   TEXT,
    "startDate"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate"       TIMESTAMP(3),
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL
);

-- Таблица GroupMember — связь User ↔ Group (many-to-many с ролью)
CREATE TABLE IF NOT EXISTS "GroupMember" (
    "groupId"      uuid NOT NULL,
    "userId"       TEXT NOT NULL,
    "role"         "public"."member_role" NOT NULL DEFAULT 'MEMBER_ROLE_MEMBER',
    PRIMARY KEY ("groupId", "userId")
);

-- Таблица CompetitionEntry — записи участников соревнований
CREATE TABLE IF NOT EXISTS "CompetitionEntry" (
    "competitionId" uuid NOT NULL,
    "userId"        TEXT NOT NULL,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("competitionId", "userId")
);

-- Индексы для ускорения запросов
CREATE INDEX IF NOT EXISTS "group_organizer_id_idx" ON "Group"("updatedAt");
CREATE INDEX IF NOT EXISTS "group_member_group_id_idx" ON "GroupMember"("groupId");
CREATE INDEX IF NOT EXISTS "competition_entries_competition_id_idx" ON "CompetitionEntry"("competitionId");
CREATE INDEX IF NOT EXISTS "competition_start_end_idx" ON "Competition"("startDate", "endDate");

-- Комментарии к таблицам (для инструментов типа Prisma Studio)
COMMENT ON TABLE "Group" IS 'Унионы пользователей: классы, семьи и другие группы';
COMMENT ON TABLE "Competition" IS 'Соревнования с заданными правилами сравнения';
COMMENT ON TABLE "GroupMember" IS 'Связь User ↔ Group (многие-ко-многим с ролью)';
COMMENT ON TABLE "CompetitionEntry" IS 'Записи участников соревнований';

-- Комментарии к полям
COMMENT ON COLUMN "Group"."name" IS 'Название группы (класс, семья)';
COMMENT ON COLUMN "Group"."organizerId" IS 'ID организатора группы (учителя/родителя)';
COMMENT ON COLUMN "Competition"."name" IS 'Название соревнования';
COMMENT ON COLUMN "Competition"."description" IS 'Описание соревнований';
COMMENT ON COLUMN "Competition"."startDate" IS 'Дата начала соревнования';
COMMENT ON COLUMN "Competition"."endDate" IS 'Дата окончания соревнования';