--
-- PostgreSQL database dump
--

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

SET default_tablespace = '';
SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE
--

DROP TABLE IF EXISTS public.sessions;
CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id uuid NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: todos; Type: TABLE
--

DROP TABLE IF EXISTS public.todos;
CREATE TABLE public.todos (
    id integer NOT NULL,
    title text NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL
);

--
-- Name: todos_id_seq; Type: SEQUENCE
--

CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;

--
-- Name: users; Type: TABLE
--

DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    role text DEFAULT 'user'::text NOT NULL
);

--
-- Name: todos id; Type: DEFAULT
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);

--
-- Data for Name: users
--

INSERT INTO public.users (id, email, password, created_at, updated_at, role) VALUES
('bd51e9d3-9cd6-4614-b29b-c33878b04533', '12@qq.com', '$2b$10$nkTqXcQgsQlExfQotRJbyequJbOIHAlMWB4lsPBlwU5mH7zfzQQBu', '2026-05-20 07:29:14.874124', '2026-05-20 07:29:14.874124', 'user'),
('6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', 'admin@qq.com', '$2b$10$.n77zAKLPVHb2lqtZlM.dun3sg.dVuB6a9.mpm8wLv1jeLdQXX216', '2026-05-20 08:56:39.389991', '2026-05-20 08:56:39.389991', 'admin'),
('8263db48-6fdd-4a82-8298-6a68f6070f43', 'test@qq.com', '$2b$10$qtMHcZrYGt7D0twRWV5XB.QcHv2sPuck7ZclhJqHoxl43p2fcmTW.', '2026-05-23 05:34:05.480631', '2026-05-23 05:34:05.480631', 'user');

--
-- Data for Name: todos
--

INSERT INTO public.todos (id, title, completed, created_at, updated_at, user_id) VALUES
(2, '123', false, '2026-05-20 02:29:01.585153', '2026-05-20 02:29:01.585153', 'bd51e9d3-9cd6-4614-b29b-c33878b04533'),
(3, '1234142', false, '2026-05-20 02:29:04.112297', '2026-05-20 02:29:04.112297', 'bd51e9d3-9cd6-4614-b29b-c33878b04533'),
(9, '3421', false, '2026-05-21 07:49:13.027768', '2026-05-21 07:49:13.027768', 'bd51e9d3-9cd6-4614-b29b-c33878b04533'),
(10, 'haha', false, '2026-05-21 07:49:15.528126', '2026-05-23 05:34:15.081', 'bd51e9d3-9cd6-4614-b29b-c33878b04533'),
(12, 'hi test', false, '2026-05-23 05:57:44.956414', '2026-05-23 05:57:44.956414', '8263db48-6fdd-4a82-8298-6a68f6070f43');

--
-- Data for Name: sessions
--

INSERT INTO public.sessions (id, user_id, expires_at, created_at) VALUES
('20692978-4ec9-49aa-b72e-563db83d57af', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:03:58.61', '2026-05-20 14:03:59.522358'),
('0b420d3c-5366-4f13-9a03-5b856f858680', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:03:58.724', '2026-05-20 14:03:59.637708'),
('d507ba97-5a74-46c5-9905-310f56207aee', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:05:44.895', '2026-05-20 14:05:45.810365'),
('8edcf33c-3fa7-4ad7-9964-c8ee8f262ff0', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:08:29.85', '2026-05-20 14:08:30.771648'),
('62f70086-195b-4d18-ae8d-14077cda6df6', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:00.522', '2026-05-20 14:10:01.439083'),
('2009b588-d6b2-4c94-a8ed-7f5c524e682e', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:06.733', '2026-05-20 14:10:07.650756'),
('a9e9ad44-4b9e-4931-8400-f33d942b987a', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:10.163', '2026-05-20 14:10:11.08005'),
('110f8ebd-fc10-4256-8507-42b03ab53acb', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:28.799', '2026-05-20 14:10:29.717691'),
('77976b9a-efab-47cb-addf-b47a245db451', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:29.082', '2026-05-20 14:10:30.000081'),
('a7782044-faf4-4128-b00a-c7215b884b56', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:10:31.166', '2026-05-20 14:10:32.085528'),
('4b9f29be-b8b0-48a2-8af2-e3259c3e2f6c', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:11:31.499', '2026-05-20 14:11:32.420192'),
('7884c023-5649-4fab-98ac-66763f333b3a', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-20 15:18:08.943', '2026-05-20 14:18:09.86955'),
('0e937f8f-8543-4e3e-880c-33b55a7e3559', 'bd51e9d3-9cd6-4614-b29b-c33878b04533', '2026-05-21 08:45:37.32', '2026-05-21 07:45:38.301952'),
('2451afd3-a34a-48a6-989c-7053d580f4d6', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-21 09:29:56.038', '2026-05-21 08:29:56.072581'),
('35630769-abf8-4d76-a7d0-8719e0688d7e', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-21 09:45:40.438', '2026-05-21 08:45:40.471225'),
('a39b6da1-c4e3-4eb3-a409-159f5de0ea17', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-21 09:48:14.387', '2026-05-21 08:48:14.414754'),
('3266c0af-22b0-4e74-8c87-7b0f3539e51e', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-21 10:03:58.752', '2026-05-21 09:03:59.818802'),
('48de59d5-bef1-44d8-a9ad-b058ece6e12d', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-21 10:05:13.501', '2026-05-21 09:05:14.569505'),
('40461f0c-6daf-45ac-96e2-1d87e3461387', 'bd51e9d3-9cd6-4614-b29b-c33878b04533', '2026-05-21 10:08:49.216', '2026-05-21 09:08:50.284428'),
('c9394f53-12e0-47a3-9910-4e1ca24f27b6', 'bd51e9d3-9cd6-4614-b29b-c33878b04533', '2026-05-23 05:24:49.923', '2026-05-23 04:24:49.752076'),
('7d7cf749-8baa-4370-90c1-dd73a0770c73', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-23 05:34:30.715', '2026-05-23 04:34:30.559901'),
('716df269-643e-42e5-9ec9-a12b34acbce7', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-23 05:34:32.023', '2026-05-23 04:34:31.861959'),
('0ca32c95-762a-4e3c-92aa-f248211fed21', '8263db48-6fdd-4a82-8298-6a68f6070f43', '2026-05-23 06:40:56.075', '2026-05-23 05:40:55.998219'),
('52689455-2e0a-491e-b99c-cecf32555821', '8263db48-6fdd-4a82-8298-6a68f6070f43', '2026-05-23 06:45:11.683', '2026-05-23 05:45:11.619249'),
('8406b656-3dbc-4c0d-aa9e-b644e8b63c1b', 'bd51e9d3-9cd6-4614-b29b-c33878b04533', '2026-05-23 06:45:36.235', '2026-05-23 05:45:36.167279'),
('601d161f-ea9a-44fd-8b2c-df7cf2324e96', '8263db48-6fdd-4a82-8298-6a68f6070f43', '2026-05-23 06:57:56.309697', '2026-05-23 05:57:56.309697'),
('414fada6-f752-4687-8758-3e57ca40663e', '6f4bdbf3-b1c9-4578-a29d-cff14d9a7c3e', '2026-05-23 07:34:51.65', '2026-05-23 06:34:51.635446');

--
-- Set sequence value
--

SELECT pg_catalog.setval('public.todos_id_seq', 21, true);

--
-- Constraints
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Foreign keys
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

--
-- PostgreSQL database dump complete
--
