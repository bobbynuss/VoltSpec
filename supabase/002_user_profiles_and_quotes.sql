-- VoltSpec Phase 2: User profiles (sales rep) + quote requests
-- Run this in the Supabase SQL Editor

-- User profiles (stores sales rep preference)
create table if not exists public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  elliott_store text,
  elliott_rep_name text,
  company_name text,
  phone text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.user_profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.user_profiles for update using (auth.uid() = id);

-- Quote requests log
create table if not exists public.quote_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_name text not null,
  job_id text not null,
  city text not null,
  zip text not null,
  elliott_store text,
  elliott_rep text,
  bom_data jsonb not null,
  notes text,
  status text default 'sent' not null,
  created_at timestamptz default now() not null
);

create index if not exists idx_quote_requests_user on public.quote_requests(user_id);
alter table public.quote_requests enable row level security;

create policy "Users can view own quotes"
  on public.quote_requests for select using (auth.uid() = user_id);
create policy "Users can insert own quotes"
  on public.quote_requests for insert with check (auth.uid() = user_id);
