-- VoltSpec: Create projects table for cloud-saved jobs
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  job_id text not null,
  city text not null,
  zip text not null,
  job_data jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for fast user lookups
create index if not exists idx_projects_user_id on public.projects(user_id);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- RLS policies: users can only see/modify their own projects
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);
