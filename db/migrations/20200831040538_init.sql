-- migrate:up
create table public.users (
  "id" serial primary key,
  "firstName" text not null,
  "lastName" text not null,
  "email" text not null,
  "password" text not null,
  "isAdmin" boolean default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "deletedAt" timestamptz default null
);

create table public.auth (
  "id" serial primary key,
  "userId" int references public.users,
  "accessToken" text not null unique,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "deletedAt" timestamptz default null
);

create table public.categories (
  "id" serial primary key,
  "name" text not null,
  "description" text not null,
  "published" boolean default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "deletedAt" timestamptz default null
);

create table public.products (
  "id" serial primary key,
  "name" text not null,
  "description" text not null,
  "image" text not null,
  "categoryId" int references public.categories,
  "published" boolean default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "deletedAt" timestamptz default null
);

-- migrate:down
drop table public.auth;
drop table public.users;
drop table public.products;
drop table public.categories;
