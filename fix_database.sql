-- Run this script in your Supabase SQL Editor to fix the database schema issues
-- This ensures all required columns exist for the "Add Student" feature to work

-- 1. Add missing columns to students table if they don't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'gender') then
        alter table students add column gender text check (gender in ('male', 'female'));
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'religion') then
        alter table students add column religion text check (religion in ('muslim', 'christian'));
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'parent_job') then
        alter table students add column parent_job text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'birth_date') then
        alter table students add column birth_date date;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'class_group') then
        alter table students add column class_group text;
    end if;
    
    if not exists (select 1 from information_schema.columns where table_name = 'students' and column_name = 'nationality') then
        alter table students add column nationality text default 'egyptian';
    end if;
end $$;

-- 2. Ensure phone column exists (or map parent_phone)
-- We'll add 'phone' generic column to match valid form data
alter table students add column if not exists phone text;

-- 3. Fix Logs table permissions just in case
grant all on table logs to anon;
grant all on table logs to authenticated;
grant all on table logs to service_role;

-- 4. Fix Students table permissions
grant all on table students to anon;
grant all on table students to authenticated;
grant all on table students to service_role;
