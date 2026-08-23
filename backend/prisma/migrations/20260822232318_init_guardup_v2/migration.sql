-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "skill_level" TEXT NOT NULL DEFAULT 'NOT_ASSIGNED',
    "has_taken_assessment" BOOLEAN NOT NULL DEFAULT false,
    "assessment_score" INTEGER,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "total_simulations" INTEGER NOT NULL DEFAULT 0,
    "phishing_accuracy" INTEGER NOT NULL DEFAULT 0,
    "ransomware_accuracy" INTEGER NOT NULL DEFAULT 0,
    "highest_accuracy" INTEGER NOT NULL DEFAULT 0,
    "fastest_completion" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "breaches_contained" INTEGER NOT NULL DEFAULT 0,
    "perfect_scores" INTEGER NOT NULL DEFAULT 0,
    "zero_breach_sims" INTEGER NOT NULL DEFAULT 0,
    "speed_master" INTEGER NOT NULL DEFAULT 0,
    "avatar_id" TEXT NOT NULL DEFAULT 'defender',
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "simulations_completed" JSONB NOT NULL DEFAULT '{}',
    "last_simulation_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "badge_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "source" TEXT,
    "icon" TEXT,
    "tier" TEXT,
    "context" JSONB,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_runs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "simulation_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "xp_earned" INTEGER NOT NULL DEFAULT 0,
    "accuracy" INTEGER,
    "breaches" INTEGER,
    "total_time" INTEGER,
    "hints_used" INTEGER,
    "behavior_data" JSONB,
    "results" JSONB,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulation_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "certification_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certification_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_activity_completions" (
    "id" TEXT NOT NULL,
    "progress_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certification_activity_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_completions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "certification_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certification_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "correct" INTEGER,
    "incorrect" INTEGER,
    "total" INTEGER,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "answers" JSONB,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actor_type" TEXT NOT NULL,
    "user_id" TEXT,
    "user_email" TEXT,
    "summary" TEXT,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_skill_level_idx" ON "users"("skill_level");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "user_badges_user_id_idx" ON "user_badges"("user_id");

-- CreateIndex
CREATE INDEX "user_badges_badge_id_idx" ON "user_badges"("badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_user_id_badge_id_key" ON "user_badges"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "simulation_runs_user_id_completed_at_idx" ON "simulation_runs"("user_id", "completed_at" DESC);

-- CreateIndex
CREATE INDEX "simulation_runs_simulation_id_idx" ON "simulation_runs"("simulation_id");

-- CreateIndex
CREATE INDEX "certification_progress_user_id_idx" ON "certification_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "certification_progress_user_id_certification_id_key" ON "certification_progress"("user_id", "certification_id");

-- CreateIndex
CREATE INDEX "certification_activity_completions_activity_id_idx" ON "certification_activity_completions"("activity_id");

-- CreateIndex
CREATE UNIQUE INDEX "certification_activity_completions_progress_id_activity_id_key" ON "certification_activity_completions"("progress_id", "activity_id");

-- CreateIndex
CREATE INDEX "certification_completions_user_id_idx" ON "certification_completions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "certification_completions_user_id_certification_id_key" ON "certification_completions"("user_id", "certification_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_user_id_idx" ON "quiz_attempts"("user_id");

-- CreateIndex
CREATE INDEX "quiz_attempts_quiz_id_idx" ON "quiz_attempts"("quiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempts_user_id_quiz_id_key" ON "quiz_attempts"("user_id", "quiz_id");

-- CreateIndex
CREATE INDEX "audit_events_type_idx" ON "audit_events"("type");

-- CreateIndex
CREATE INDEX "audit_events_created_at_idx" ON "audit_events"("created_at" DESC);

-- CreateIndex
CREATE INDEX "audit_events_user_id_idx" ON "audit_events"("user_id");

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_runs" ADD CONSTRAINT "simulation_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_progress" ADD CONSTRAINT "certification_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_activity_completions" ADD CONSTRAINT "certification_activity_completions_progress_id_fkey" FOREIGN KEY ("progress_id") REFERENCES "certification_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_completions" ADD CONSTRAINT "certification_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
