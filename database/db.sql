--
-- PostgreSQL database dump
--

-- Dumped from database version 14.16 (Homebrew)
-- Dumped by pg_dump version 14.16 (Homebrew)

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

DROP DATABASE "sightingsDB";
--
-- Name: sightingsDB; Type: DATABASE; Schema: -; Owner: tpl622_6
--

CREATE DATABASE "sightingsDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE "sightingsDB" OWNER TO tpl622_6;

\connect "sightingsDB"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: individuals; Type: TABLE; Schema: public; Owner: tpl622_6
--

CREATE TABLE public.individuals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    individual_nickname character varying(255),
    species_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.individuals OWNER TO tpl622_6;

--
-- Name: sightings; Type: TABLE; Schema: public; Owner: tpl622_6
--

CREATE TABLE public.sightings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    sighting_date_time timestamp without time zone,
    sighted_animal_id uuid,
    animal_health boolean,
    sighter_email character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sightings OWNER TO tpl622_6;

--
-- Name: species; Type: TABLE; Schema: public; Owner: tpl622_6
--

CREATE TABLE public.species (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    species_population integer,
    conservation_code character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.species OWNER TO tpl622_6;

--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: tpl622_6
--

COPY public.individuals (id, individual_nickname, species_id, created_at) FROM stdin;
0108462f-2f6e-4848-aaff-841796dc51d9	Bear Bear	c90a85b3-e11d-4c2e-a39a-a7e2e379220a	2025-03-20 11:13:08.322819
dfd2c7da-5021-4e35-8432-cecd25c31a71	Dolphieeeee	c90a85b3-e11d-4c2e-a39a-a7e2e379220a	2025-03-20 11:13:08.322819
4b94d052-134d-4e94-a8d1-cf6f3b52834f	Floppy Dino	1f33ba2d-edc7-4316-9e7b-a6db48620902	2025-03-20 11:13:08.322819
aa39ebef-d213-463d-b061-7d4fb35d937c	Tweet Tweet	1f33ba2d-edc7-4316-9e7b-a6db48620902	2025-03-20 11:13:08.322819
92a3578b-b78b-41e9-b362-e3653dd9bf01	Camo Crawly	be56bf16-f714-4ed2-9f28-64c0f04e7f1a	2025-03-20 11:13:08.322819
34560c61-7aee-4a95-b69c-f2996febf30c	Frogity frog frog	be56bf16-f714-4ed2-9f28-64c0f04e7f1a	2025-03-20 11:13:08.322819
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: tpl622_6
--

COPY public.sightings (id, sighting_date_time, sighted_animal_id, animal_health, sighter_email, created_at) FROM stdin;
a7c09405-b229-4f82-bf0c-2e693c8a702f	2025-02-02 09:43:00	0108462f-2f6e-4848-aaff-841796dc51d9	t	scientist1@sightings.com	2025-03-20 11:13:08.325221
42040924-0e0c-4087-8fbe-4633c419353a	2025-02-19 12:36:00	4b94d052-134d-4e94-a8d1-cf6f3b52834f	t	scientist1@sightings.com	2025-03-20 11:13:08.325221
d4e0dbf0-cfbb-4913-9ac1-b214733faa5e	2025-03-02 18:12:00	92a3578b-b78b-41e9-b362-e3653dd9bf01	f	scientist2@sightings.com	2025-03-20 11:13:08.325221
2aab7a57-7908-4622-b0b9-1e75527065a7	2025-03-06 20:16:00	dfd2c7da-5021-4e35-8432-cecd25c31a71	t	scientist3@sightings.com	2025-03-20 11:13:08.325221
0fb67cac-ea2d-4e2b-aad8-5826a00479e2	2025-03-17 07:03:00	aa39ebef-d213-463d-b061-7d4fb35d937c	t	scientist4@sightings.com	2025-03-20 11:13:08.325221
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: tpl622_6
--

COPY public.species (id, common_name, scientific_name, species_population, conservation_code, created_at) FROM stdin;
c90a85b3-e11d-4c2e-a39a-a7e2e379220a	Mammals	Felis catus	6736	CR	2025-03-20 11:13:08.321855
1f33ba2d-edc7-4316-9e7b-a6db48620902	Birds	Turdus migratorius	11195	EN	2025-03-20 11:13:08.321855
be56bf16-f714-4ed2-9f28-64c0f04e7f1a	Amphibians	Lithobates catesbeianus	8776	CR	2025-03-20 11:13:08.321855
\.


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_6
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_6
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_6
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_6
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_sighted_animal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_6
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_sighted_animal_id_fkey FOREIGN KEY (sighted_animal_id) REFERENCES public.individuals(id);


--
-- PostgreSQL database dump complete
--

