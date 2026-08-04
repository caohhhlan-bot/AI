-- Supabase 建表脚本
-- 在 Supabase SQL Editor 中执行

CREATE TABLE IF NOT EXISTS study_goal_data (
  id TEXT PRIMARY KEY,
  json JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 允许匿名用户读写（需与 RLS 配合）
ALTER TABLE study_goal_data ENABLE ROW LEVEL SECURITY;

-- 允许所有用户插入/更新
CREATE POLICY "允许所有操作" ON study_goal_data
  FOR ALL USING (true) WITH CHECK (true);