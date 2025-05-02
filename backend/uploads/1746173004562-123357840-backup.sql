--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'KEPSEK'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: SifatSurat; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SifatSurat" AS ENUM (
    'SangatSegera',
    'Segera',
    'Biasa'
);


ALTER TYPE public."SifatSurat" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SuratKeluar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuratKeluar" (
    id integer NOT NULL,
    "noSurat" text NOT NULL,
    "noBerkas" text NOT NULL,
    "alamatPenerima" text NOT NULL,
    "tanggalKeluar" text NOT NULL,
    perihal text NOT NULL,
    "noPetunjuk" text NOT NULL,
    "noPaket" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SuratKeluar" OWNER TO postgres;

--
-- Name: SuratKeluar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SuratKeluar_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SuratKeluar_id_seq" OWNER TO postgres;

--
-- Name: SuratKeluar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SuratKeluar_id_seq" OWNED BY public."SuratKeluar".id;


--
-- Name: SuratMasuk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuratMasuk" (
    id integer NOT NULL,
    "noSurat" text NOT NULL,
    perihal text NOT NULL,
    "alamatPengirim" text NOT NULL,
    "tanggalTerima" text NOT NULL,
    "sifatSurat" public."SifatSurat" NOT NULL,
    "fileUrl" text,
    disposisi text,
    "isiDisposisi" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SuratMasuk" OWNER TO postgres;

--
-- Name: SuratMasuk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SuratMasuk_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SuratMasuk_id_seq" OWNER TO postgres;

--
-- Name: SuratMasuk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SuratMasuk_id_seq" OWNED BY public."SuratMasuk".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'ADMIN'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: SuratKeluar id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuratKeluar" ALTER COLUMN id SET DEFAULT nextval('public."SuratKeluar_id_seq"'::regclass);


--
-- Name: SuratMasuk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuratMasuk" ALTER COLUMN id SET DEFAULT nextval('public."SuratMasuk_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: SuratKeluar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SuratKeluar" (id, "noSurat", "noBerkas", "alamatPenerima", "tanggalKeluar", perihal, "noPetunjuk", "noPaket", "createdAt", "updatedAt") FROM stdin;
2	001/MAN1/IV/2025	BERKAS-0010	Kementerian Agama RI	2025-04-29	Undangan Rapat Evaluasi	PET-2025	PKT-2025	2025-04-29 15:58:07.999	2025-04-29 15:58:07.999
4	sk1231	no-1	sambas kali ye	2024-12-12	perihal nya adalah	gatau juga	ahaha	2025-04-29 17:41:25.935	2025-04-29 17:47:47.588
\.


--
-- Data for Name: SuratMasuk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SuratMasuk" (id, "noSurat", perihal, "alamatPengirim", "tanggalTerima", "sifatSurat", "fileUrl", disposisi, "isiDisposisi", "createdAt", "updatedAt") FROM stdin;
1	123/SM/2025a	Surat Pemberitahuan	Jl. Example No. 1	2025-04-29	Segera	/uploads/1745927217804-290336933-eye.png	Disposisi penting	Segera ditindaklanjuti	2025-04-28 17:28:32.001	2025-04-29 11:46:57.807
4	adfsaf	asdsadf	asdfasfsd	2005-02-02	Segera	/uploads/1745927234535-814745985-surat masuk.pdf	221	asdf	2025-04-29 11:43:00.585	2025-04-29 11:47:14.538
5	sm1231	asdfasdf	gatu	2024-11-14	Biasa	/uploads/1745947845247-485824417-search-interface-symbol.png	hehe	asdfda	2025-04-29 17:30:45.305	2025-04-29 17:31:12.099
6	SM123	AOSDJFOIASJF	OIAJFOASIJFSAOP	2005-28-02	SangatSegera	uploads/1746167555333-659788393-Sistem-Informasi-Manajemen-Pengarsipan-Surat-Masuk-dan-Keluar.pdf	asdf	asddf	2025-05-02 06:32:35.391	2025-05-02 06:32:35.391
7	SM123	AOSDJFOIASJF	OIAJFOASIJFSAOP	2005-28-02	SangatSegera	uploads/1746167556227-119527024-Sistem-Informasi-Manajemen-Pengarsipan-Surat-Masuk-dan-Keluar.pdf	asdf	asddf	2025-05-02 06:32:36.231	2025-05-02 06:32:36.231
8	SM123	AOSDJFOIASJF	OIAJFOASIJFSAOP	2005-28-02	SangatSegera	uploads/1746167561771-102218112-Sistem-Informasi-Manajemen-Pengarsipan-Surat-Masuk-dan-Keluar.pdf	asdf	asddf	2025-05-02 06:32:41.775	2025-05-02 06:32:41.775
9	SM123	AOSDJFOIASJF	OIAJFOASIJFSAOP	2005-28-02	SangatSegera	uploads/1746167562400-276102097-Sistem-Informasi-Manajemen-Pengarsipan-Surat-Masuk-dan-Keluar.pdf	asdf	asddf	2025-05-02 06:32:42.403	2025-05-02 06:32:42.403
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, password, role, "createdAt", "updatedAt") FROM stdin;
1	kepsek	$2b$10$DwhJE/3rzTnPBmr4csnnye24DutHKRIZfNPUe5cdkQbZDMxDuIjde	KEPSEK	2025-04-28 17:19:23.474	2025-04-28 17:19:23.474
2	admin_tu	$2b$10$/25JT4gYiwypXcoVhbo/uuUJbCB4SiEJVvsWKo9wK8Y8IfH4zCmjm	ADMIN	2025-04-28 17:19:36.957	2025-04-28 17:19:36.957
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8c84651f-91d3-4b5b-adff-757d0d0caf23	7ad6e4742daed7c09886f7d4822ebca5b34d49edf695f713dc479cae48fd4b9e	2025-04-29 00:18:07.917029+07	20250428171807_add_file_url_to_surat_masuk	\N	\N	2025-04-29 00:18:07.900602+07	1
\.


--
-- Name: SuratKeluar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SuratKeluar_id_seq"', 4, true);


--
-- Name: SuratMasuk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SuratMasuk_id_seq"', 9, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: SuratKeluar SuratKeluar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuratKeluar"
    ADD CONSTRAINT "SuratKeluar_pkey" PRIMARY KEY (id);


--
-- Name: SuratMasuk SuratMasuk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuratMasuk"
    ADD CONSTRAINT "SuratMasuk_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

