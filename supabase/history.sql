-- Supabase SQL Editorで一度だけ実行してください。
create table public.abbreviation_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  input_word text not null,
  result_word text not null,
  created_at timestamptz not null default now()
);

alter table public.abbreviation_history enable row level security;

revoke all on table public.abbreviation_history from anon, authenticated;
grant select, insert, delete on table public.abbreviation_history to authenticated;
grant usage, select on sequence public.abbreviation_history_id_seq to authenticated;

create policy "Users can read their own abbreviation history"
on public.abbreviation_history
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can add their own abbreviation history"
on public.abbreviation_history
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own abbreviation history"
on public.abbreviation_history
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Keep only each user's 50 newest rows after a new abbreviation is saved.
create or replace function public.trim_abbreviation_history()
returns void
language sql
security invoker
set search_path = ''
as $$
  delete from public.abbreviation_history as history
  where history.user_id = (select auth.uid())
    and history.id not in (
      select newest.id
      from public.abbreviation_history as newest
      where newest.user_id = (select auth.uid())
      order by newest.created_at desc, newest.id desc
      limit 50
    );
$$;

revoke all on function public.trim_abbreviation_history() from public, anon;
grant execute on function public.trim_abbreviation_history() to authenticated;
