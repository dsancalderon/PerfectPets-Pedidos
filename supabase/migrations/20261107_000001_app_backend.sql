create table if not exists public.app_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id text primary key,
  name text not null check (length(name) between 1 and 100),
  type text not null default '',
  phone text not null,
  contact text not null default '',
  address text not null default '',
  email text not null default '',
  social text not null default '',
  extra text not null default '',
  logo text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key,
  client_id text not null references public.clients(id) on delete restrict,
  purchase_date date not null,
  notes text not null default '',
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_client_purchase_date_idx on public.orders (client_id, purchase_date desc);

create or replace function public.is_app_member() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.app_members where user_id = (select auth.uid())) $$;

alter table public.app_members enable row level security;
alter table public.clients enable row level security;
alter table public.orders enable row level security;

create policy "Members can see their membership" on public.app_members
for select to authenticated using (user_id = (select auth.uid()));
create policy "Members manage clients" on public.clients
for all to authenticated using ((select public.is_app_member())) with check ((select public.is_app_member()));
create policy "Members manage orders" on public.orders
for all to authenticated using ((select public.is_app_member())) with check ((select public.is_app_member()));

revoke all on public.app_members, public.clients, public.orders from anon;
grant select on public.app_members to authenticated;
grant select, insert, update, delete on public.clients, public.orders to authenticated;
revoke all on function public.is_app_member() from public, anon;
grant execute on function public.is_app_member() to authenticated;

insert into public.clients (id, name, type, phone, contact, address, email, social, extra) values
('matius', 'Matius', 'Peluquería canina y felina', '3015651510', 'Sede Ciudadela Colsubsidio', 'Cra. 111ª #88-26 · Ciudadela Colsubsidio', '', '@Matius_peluqueriacanina', 'Sede Tabora: Cll. 75 #78-94 · 320 389 1147'),
('patas', 'Patas al Agua', 'Petshop & Grooming spa', '3248906122', '', 'Calle 86C #110C-33', '', '@patasalagua_pet', ''),
('peluditos', 'Peluditos & Vanidosos', 'Estética canina y guardería', '3160425821', '', 'Calle 88 #113-06, local 2 · Ciudadela Colsubsidio', '', '@peluditosyvanidosos', ''),
('spa', 'Spa Tu Gato', 'Spa y cuidado de mascotas', '3133182208', 'CVA Nancy', 'Calle 81 #109-04 · Barrio Bolivia, Bogotá', 'spatuperrospatugato@gmail.com', '', 'Atención con cita previa · 9 a. m. a 6 p. m.'),
('vet', 'Vet Health', 'Veterinaria, guardería y grooming', '3212559492', 'Dra. Yamile Mancipe', 'Cll. 86 #103D-62', '', '', '')
on conflict (id) do nothing;
