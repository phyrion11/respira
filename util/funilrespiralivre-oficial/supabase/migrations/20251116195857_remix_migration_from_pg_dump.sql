--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: addiction_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.addiction_type AS ENUM (
    'CIGARETTE',
    'MARIJUANA',
    'BOTH'
);


--
-- Name: badge_rarity; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.badge_rarity AS ENUM (
    'COMMON',
    'RARE',
    'EPIC',
    'LEGENDARY'
);


--
-- Name: checkin_mood; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.checkin_mood AS ENUM (
    'GREAT',
    'GOOD',
    'STRUGGLING',
    'CRISIS'
);


--
-- Name: league_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.league_type AS ENUM (
    'INICIANTE',
    'BRONZE',
    'PRATA',
    'OURO',
    'PLATINA',
    'DIAMANTE',
    'LIBERDADE'
);


--
-- Name: user_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_status AS ENUM (
    'ACTIVE',
    'PAUSED',
    'INACTIVE'
);


--
-- Name: increment_coins(uuid, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.increment_coins(user_id uuid, amount integer) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Only allow user to modify their own coins
  IF auth.uid() != user_id THEN
    RAISE EXCEPTION 'Unauthorized: can only modify own coins';
  END IF;
  
  -- Validate amount is reasonable (0-1000 for legitimate game mechanics)
  IF amount < 0 OR amount > 1000 THEN
    RAISE EXCEPTION 'Invalid amount: must be between 0 and 1000';
  END IF;
  
  -- Update profile with validated amount
  UPDATE profiles
  SET respir_coins = respir_coins + amount
  WHERE id = user_id;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: achievements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.achievements (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    coins_reward integer DEFAULT 0,
    xp_reward integer DEFAULT 0,
    achieved_at timestamp with time zone DEFAULT now()
);


--
-- Name: badges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.badges (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon_url text NOT NULL,
    rarity public.badge_rarity DEFAULT 'COMMON'::public.badge_rarity,
    requirement text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: check_ins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.check_ins (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    mood public.checkin_mood NOT NULL,
    craving_level integer NOT NULL,
    trigger_moment text,
    coping_strategy text,
    notes text,
    coins_earned integer DEFAULT 50,
    CONSTRAINT check_ins_craving_level_check CHECK (((craving_level >= 1) AND (craving_level <= 10)))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    username text NOT NULL,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    status public.user_status DEFAULT 'ACTIVE'::public.user_status,
    age integer,
    gender text,
    location text,
    addiction_type public.addiction_type NOT NULL,
    cigarettes_per_day integer DEFAULT 0,
    years_smoking integer,
    quit_attempts integer DEFAULT 0,
    league public.league_type DEFAULT 'INICIANTE'::public.league_type,
    respir_coins integer DEFAULT 0,
    total_xp integer DEFAULT 0,
    level integer DEFAULT 1,
    current_streak integer DEFAULT 0,
    longest_streak integer DEFAULT 0,
    last_smoke_date timestamp with time zone,
    quit_start_date timestamp with time zone DEFAULT now()
);


--
-- Name: squad_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.squad_members (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    squad_id uuid NOT NULL,
    joined_at timestamp with time zone DEFAULT now(),
    role text DEFAULT 'MEMBER'::text
);


--
-- Name: squads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.squads (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    max_members integer DEFAULT 8
);


--
-- Name: user_badges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_badges (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    badge_id uuid NOT NULL,
    earned_at timestamp with time zone DEFAULT now()
);


--
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (id);


--
-- Name: badges badges_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_name_key UNIQUE (name);


--
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id);


--
-- Name: check_ins check_ins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.check_ins
    ADD CONSTRAINT check_ins_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);


--
-- Name: squad_members squad_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.squad_members
    ADD CONSTRAINT squad_members_pkey PRIMARY KEY (id);


--
-- Name: squad_members squad_members_user_id_squad_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.squad_members
    ADD CONSTRAINT squad_members_user_id_squad_id_key UNIQUE (user_id, squad_id);


--
-- Name: squads squads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.squads
    ADD CONSTRAINT squads_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_user_id_badge_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_badge_id_key UNIQUE (user_id, badge_id);


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: achievements achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: check_ins check_ins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.check_ins
    ADD CONSTRAINT check_ins_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: squad_members squad_members_squad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.squad_members
    ADD CONSTRAINT squad_members_squad_id_fkey FOREIGN KEY (squad_id) REFERENCES public.squads(id) ON DELETE CASCADE;


--
-- Name: squad_members squad_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.squad_members
    ADD CONSTRAINT squad_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: user_badges user_badges_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.badges(id) ON DELETE CASCADE;


--
-- Name: user_badges user_badges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: badges Anyone can view badges; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT TO authenticated USING (true);


--
-- Name: squads Anyone can view squads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view squads" ON public.squads FOR SELECT TO authenticated USING (true);


--
-- Name: check_ins Deny all check-in deletes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny all check-in deletes" ON public.check_ins FOR DELETE USING (false);


--
-- Name: check_ins Deny all check-in updates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny all check-in updates" ON public.check_ins FOR UPDATE USING (false);


--
-- Name: check_ins Users can create their own check-ins; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own check-ins" ON public.check_ins FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: squad_members Users can join squads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can join squads" ON public.squad_members FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: squad_members Users can view squad members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view squad members" ON public.squad_members FOR SELECT TO authenticated USING (true);


--
-- Name: achievements Users can view their own achievements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own achievements" ON public.achievements FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_badges Users can view their own badges; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: check_ins Users can view their own check-ins; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own check-ins" ON public.check_ins FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: achievements; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

--
-- Name: badges; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

--
-- Name: check_ins; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: squad_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.squad_members ENABLE ROW LEVEL SECURITY;

--
-- Name: squads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;

--
-- Name: user_badges; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


