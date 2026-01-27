-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Students Table (Enhanced for Gov Schools)
create table if not exists students (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Personal Info
  full_name text not null,
  national_id text not null unique, -- Critical for gov schools
  birth_date date, -- To calculate age on Oct 1st
  gender text check (gender in ('male', 'female')),
  religion text check (religion in ('muslim', 'christian')),
  nationality text default 'egyptian',
  birth_place text,
  
  -- Academic Info
  grade text not null, -- الصف (First Primary, etc.)
  class_group text, -- فصل (1/1, 1/2)
  enrollment_date date default current_date,
  status text default 'active' check (status in ('active', 'transferred', 'expelled', 'graduated')),
  seating_number integer, -- رقم الجلوس (Control)
  
  -- Parent/Guardian Info
  parent_name text,
  parent_job text,
  parent_phone text,
  address text,
  
  -- Files
  image_url text,
  documents jsonb default '{"birth_cert": false, "parent_id": false}'::jsonb -- Track submitted docs
);

-- 2. Teachers/Staff Table
create table if not exists staff (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  national_id text unique,
  job_title text not null, -- Teacher, Admin, Worker
  specialization text, -- Math, Arabic, etc. (for teachers)
  phone text,
  hiring_date date,
  is_active boolean default true
);

-- 3. Subjects (Maps Grade to Subjects)
create table if not exists subjects (
  id uuid default gen_random_uuid() primary key,
  name text not null, -- Arabic, Math, etc.
  grade text not null, -- Which grade takes this
  max_score integer default 100,
  passing_score integer default 50
);

-- 4. Attendance (Daily)
create table if not exists attendance (
  id uuid default gen_random_uuid() primary key,
  date date default current_date not null,
  student_id uuid references students(id) on delete cascade,
  status text check (status in ('present', 'absent', 'late', 'excused')) default 'absent',
  created_at timestamp with time zone default now()
);

-- 5. Exams & Grades (Control)
create table if not exists exam_results (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references students(id) on delete cascade,
  subject_id uuid references subjects(id),
  exam_type text check (exam_type in ('month_1', 'month_2', 'mid_year', 'final_year')),
  score numeric not null,
  term text check (term in ('first', 'second')),
  created_at timestamp with time zone default now()
);

-- 6. Fees (Masrofat)
create table if not exists fees (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references students(id) on delete cascade,
  amount numeric not null,
  type text not null, -- Books, Activities, etc.
  paid_date date default current_date,
  receipt_number text,
  remarks text
);

-- 7. System Logs (Audit Trail)
create table if not exists logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  action text not null, -- "Added Student", "Entered Grades"
  details text,
  user_id text -- Links to Auth User
);

-- 8. Notifications
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  message text not null,
  type text default 'info',
  is_read boolean default false,
  recipient_id text -- Optional: specific user
);
