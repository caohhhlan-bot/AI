// API 路由：/api/data
// 依赖 Supabase 数据库（环境变量 SUPABASE_URL + SUPABASE_ANON_KEY）
// 通过 Vercel 部署

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

const TABLE = 'study_goal_data'
const ROW_ID = 'main'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      // 加载数据
      const { data, error } = await supabase
        .from(TABLE)
        .select('json')
        .eq('id', ROW_ID)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = 未找到记录，首次使用返回空
        return res.status(500).json({ error: error.message })
      }

      if (!data) {
        return res.status(200).json({ data: null })
      }

      return res.status(200).json({ data: data.json })
    }

    if (req.method === 'POST') {
      // 保存数据
      const { json } = req.body
      if (!json) {
        return res.status(400).json({ error: '缺少 json 字段' })
      }

      // Upsert：存在则更新，不存在则插入
      const { error } = await supabase
        .from(TABLE)
        .upsert(
          { id: ROW_ID, json: json, updated_at: new Date().toISOString() },
          { onConflict: 'id' }
        )

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}