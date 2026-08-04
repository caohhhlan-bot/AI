# 学习目标管理台

个人学习目标管理工具，纯前端 + 云端同步。

## 部署步骤

### 1. 创建 Supabase 数据库（免费）

1. 打开 [supabase.com](https://supabase.com) → 注册/登录
2. 点击 **New project**，填项目名（如 `study-goal`），密码随便设
3. 创建完成后，左侧菜单找到 **SQL Editor**
4. 复制 `supabase-setup.sql` 的内容粘贴进去，点 **Run**
5. 左侧菜单 **Project Settings → API**，复制：
   - **Project URL**（就是 API 地址）
   - **anon public key**（匿名密钥）

### 2. 部署到 Vercel（免费）

1. 打开 [vercel.com](https://vercel.com) → 用 GitHub 登录
2. 点 **Add New → Project**
3. 选择仓库 `caohhhlan-bot/AI`
4. Framework Preset 选 **Other**
5. 在 **Environment Variables** 里添加：
   - `SUPABASE_URL` → 填刚才复制的 Project URL
   - `SUPABASE_ANON_KEY` → 填刚才复制的 anon key
6. 点 **Deploy**，等一分钟
7. 部署完成后会得到一个域名，如 `https://study-goal.vercel.app`

### 3. 配置页面

1. 打开部署后的网址
2. 点底部导航 **我的** → 往下翻到 **云端同步**
3. 填：
   - **API 地址**：`https://你的域名.vercel.app`
   - **Supabase Key**：你复制的 anon key
4. 点 **手动同步**，测试是否能连通
5. 以后每次保存数据都会自动同步到云端

## 本地开发

直接打开 `study-goal-workbench.html` 即可使用，无需任何服务器。