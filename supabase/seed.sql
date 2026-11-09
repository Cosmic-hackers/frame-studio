-- Generated from lib/content. Re-run: node scripts/emit-seed.mjs

-- Run after supabase/migrations/001_init.sql.

begin;

insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  $frame$branding$frame$,
  $frame$Brand identity$frame$,
  $frame$Naming, marks, type, color, and the rules that keep a brand recognizable when the work leaves the studio.$frame$,
  $frame$Identity work at FRAME starts with the idea that has to survive a crowded feed, a product interface, and a quiet document. We build systems, not a single logo locked in a presentation. Every identity on this site is a fictional concept, invented so the thinking can be shown in full.$frame$,
  array[$frame$Naming territories and verbal identity$frame$, $frame$Marks, monograms, and responsive logos$frame$, $frame$Type and color systems$frame$, $frame$Brand guidelines that a team can actually use$frame$, $frame$Art direction for launch campaigns$frame$]::text[],
  $frame$[{"title":"Signal","text":"We define what the brand must be recognized for, and what it should refuse to become."},{"title":"Territory","text":"We explore distinct directions, then pressure-test them against packaging, product UI, and motion."},{"title":"System","text":"The chosen direction becomes type, color, layout, and language rules with examples, not slogans."},{"title":"Handoff","text":"Guidelines, assets, and a short working session so the people using the brand can extend it."}]$frame$::jsonb,
  array[$frame$Strategic narrative$frame$, $frame$Logo suite and clear-space rules$frame$, $frame$Color, type, and layout system$frame$, $frame$Verbal guidelines$frame$, $frame$Launch applications$frame$]::text[]
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;

insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  $frame$ui-ux$frame$,
  $frame$UI/UX design$frame$,
  $frame$Product interfaces with a point of view: clear structure, sharp typography, and interaction that explains itself.$frame$,
  $frame$We design digital products as editorial objects. Hierarchy does the talking. Flows are short. States are designed, including empty, loading, and error. The interface should feel inevitable once you have used it, and distinctive before you have.$frame$,
  array[$frame$Product framing and information architecture$frame$, $frame$User flows and wireframes$frame$, $frame$High-fidelity interface design$frame$, $frame$Design systems and component specs$frame$, $frame$Prototype reviews with engineering$frame$]::text[],
  $frame$[{"title":"Frame","text":"We map the job of the product, the people using it, and the decisions the interface must support."},{"title":"Structure","text":"Flows and wireframes settle the sequence before visual design spends attention in the wrong place."},{"title":"Surface","text":"Typography, color, and motion give the structure a voice without hiding the task."},{"title":"Spec","text":"Components, states, and redlines go to engineering with the edge cases written down."}]$frame$::jsonb,
  array[$frame$Flow maps$frame$, $frame$Wireframes$frame$, $frame$Interface design$frame$, $frame$Component library$frame$, $frame$Prototype$frame$]::text[]
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;

insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
  $frame$development$frame$,
  $frame$Web development$frame$,
  $frame$Front-end engineering for sites and products that need to feel as considered as they look.$frame$,
  $frame$We build with Next.js, typed components, and a performance budget. Animation is progressive. Pages work with a keyboard. Content is structured so it can be edited without breaking the layout. The studio site you are reading is the working example.$frame$,
  array[$frame$Next.js and TypeScript builds$frame$, $frame$Design-system implementation$frame$, $frame$Accessible interaction$frame$, $frame$CMS and database integration$frame$, $frame$Performance and SEO pass$frame$]::text[],
  $frame$[{"title":"Foundation","text":"We agree the stack, the content model, and the pages that must exist before decoration begins."},{"title":"Build","text":"Components land in the order the story needs them, with real content rather than placeholder blocks."},{"title":"Harden","text":"We test routes, forms, keyboard paths, reduced motion, and the production build."},{"title":"Release","text":"Deployment notes, environment variables, and a short handover for whoever operates the site."}]$frame$::jsonb,
  array[$frame$Production codebase$frame$, $frame$Component library$frame$, $frame$Content model$frame$, $frame$Documentation$frame$, $frame$Deployment setup$frame$]::text[]
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;

insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
  $frame$motion$frame$,
  $frame$Motion design$frame$,
  $frame$Movement that explains hierarchy, change, and timing. If a transition has no job, it does not ship.$frame$,
  $frame$Motion at FRAME is a narrative tool. Type arrives with intent. Images reveal through masks. Page changes stay short enough to respect a person who just wants the next page. Reduced-motion preferences are part of the design, not a patch at the end.$frame$,
  array[$frame$Title and editorial motion$frame$, $frame$Interface micro-interaction$frame$, $frame$Scroll-linked sequences$frame$, $frame$Campaign loops and idents$frame$, $frame$Motion guidelines$frame$]::text[],
  $frame$[{"title":"Intent","text":"Each movement gets a reason: orientation, emphasis, feedback, or continuity."},{"title":"Timing","text":"We set duration and easing against the pace of the page, then cut anything that delays the task."},{"title":"System","text":"Repeated interactions share timing so the product feels like one instrument."},{"title":"Fallback","text":"Reduced motion gets a still composition that carries the same hierarchy."}]$frame$::jsonb,
  array[$frame$Motion principles$frame$, $frame$Interface transitions$frame$, $frame$Hero sequences$frame$, $frame$Exported assets$frame$, $frame$Implementation notes$frame$]::text[]
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;

insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5',
  $frame$creative$frame$,
  $frame$Creative direction$frame$,
  $frame$The through-line for identity, product, and campaign so the work feels authored rather than assembled.$frame$,
  $frame$Creative direction is how FRAME decides what not to make. We set the concept, the references worth keeping, the tone of voice, and the sequence of releases. The rest of the studio builds inside that frame.$frame$,
  array[$frame$Concept and narrative$frame$, $frame$Art direction$frame$, $frame$Campaign structure$frame$, $frame$Cross-discipline reviews$frame$, $frame$Launch sequencing$frame$]::text[],
  $frame$[{"title":"Listen","text":"We learn the ambition, the constraint, and the audience that must feel the difference."},{"title":"Position","text":"A short creative platform names the idea, the tension, and the proof we will show."},{"title":"Direct","text":"Design, motion, and engineering reviews stay tied to that platform."},{"title":"Edit","text":"We remove the work that is competent but does not serve the idea."}]$frame$::jsonb,
  array[$frame$Creative platform$frame$, $frame$Art direction boards$frame$, $frame$Tone of voice$frame$, $frame$Review cadence$frame$, $frame$Launch narrative$frame$]::text[]
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;

insert into public.article_categories (id, slug, name)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', $frame$perspective$frame$, $frame$Perspective$frame$)
on conflict (id) do update set slug = excluded.slug, name = excluded.name;

insert into public.article_categories (id, slug, name)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', $frame$process$frame$, $frame$Process$frame$)
on conflict (id) do update set slug = excluded.slug, name = excluded.name;

insert into public.article_categories (id, slug, name)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3', $frame$craft$frame$, $frame$Craft$frame$)
on conflict (id) do update set slug = excluded.slug, name = excluded.name;

insert into public.team_members (id, name, role, bio, is_demo, sort_order)
values (
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd1',
  $frame$Mira Ellison$frame$,
  $frame$Creative direction$frame$,
  $frame$Demo profile. Mira is an invented creative director used to show how FRAME would introduce a studio lead. She is not a real person and does not represent a working studio.$frame$,
  true,
  1
) on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  bio = excluded.bio,
  is_demo = excluded.is_demo,
  sort_order = excluded.sort_order;

insert into public.team_members (id, name, role, bio, is_demo, sort_order)
values (
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd2',
  $frame$Jonah Adeyemi$frame$,
  $frame$Design$frame$,
  $frame$Demo profile. Jonah is a fictional design lead created for this concept site. The biography, portrait absence, and credit exist only to demonstrate a team layout.$frame$,
  true,
  2
) on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  bio = excluded.bio,
  is_demo = excluded.is_demo,
  sort_order = excluded.sort_order;

insert into public.team_members (id, name, role, bio, is_demo, sort_order)
values (
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd3',
  $frame$Sasha Petrov$frame$,
  $frame$Development$frame$,
  $frame$Demo profile. Sasha is an invented engineer in the FRAME story. No client history or employment claim should be inferred from this card.$frame$,
  true,
  3
) on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  bio = excluded.bio,
  is_demo = excluded.is_demo,
  sort_order = excluded.sort_order;

insert into public.team_members (id, name, role, bio, is_demo, sort_order)
values (
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd4',
  $frame$Noor Rahman$frame$,
  $frame$Motion$frame$,
  $frame$Demo profile. Noor is a fictional motion designer used to complete the studio page. The role is illustrative, not a real appointment.$frame$,
  true,
  4
) on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  bio = excluded.bio,
  is_demo = excluded.is_demo,
  sort_order = excluded.sort_order;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '11111111-1111-4111-8111-111111111111',
  $frame$novara$frame$,
  $frame$Novara$frame$,
  $frame$Novara$frame$,
  $frame$Technology branding$frame$,
  2026,
  $frame$A signal system for an invented hardware company that needed to feel precise without turning cold.$frame$,
  $frame$Novara is a fictional technology brand created for this case study. The concept imagines a company that builds compact sensing tools for studios and labs. The identity had to read as engineered, but the product story was about attention, not machinery. We designed a mark that behaves like a calibration tick, a type system with one loud grotesque and one quiet mono, and a lime signal reserved for the moment the product confirms a reading.$frame$,
  $frame$Novara is not a real company and has no relationship to any operating business with a similar name. In the fiction, it is a small hardware studio selling precise instruments to people who already care about their tools. The audience is technical, impatient with startup decoration, and loyal to brands that look like they were drawn by the people who built the object.$frame$,
  $frame$Technology branding often borrows the same blue gradient and friendly blob. Novara had to be recognizable in a product render, a dense specification sheet, and a one-word nav. The system also had to survive being printed in one color on a metal enclosure.$frame$,
  $frame$We treated the brand as a measurement, not a mascot. The wordmark is set tight. The symbol is a broken circle that closes when the product is 'in frame.' Color is mostly ink and paper. Electric lime appears only as confirmation: a status, a link, a recorded value. That scarcity is the personality.$frame$,
  $frame$[{"title":"Language","text":"We wrote a six-line brand story and banned words the fiction would never say: seamless, disrupt, next-gen."},{"title":"Mark","text":"Three symbol directions were reduced to the calibration ring after it stayed legible at 16 pixels and engraved at 8 millimetres."},{"title":"Rules","text":"Guidelines show the mark on product, packaging, and a software screen, including the one-color metal version."},{"title":"Proof","text":"A short interface prototype uses the type and color rules so the identity is judged in use, not on a board."}]$frame$::jsonb,
  $frame$The concept resolves to a system a hardware team could actually extend: a mark, four colors, two type roles, and a verbal rule. It is presented here as a study, not as a launched product. The outcome we are claiming is the clarity of the system, which you can read on this page.$frame$,
  array[$frame$Anton$frame$, $frame$Manrope$frame$, $frame$IBM Plex Mono$frame$]::text[],
  $frame$[{"name":"Ink","hex":"#111111"},{"name":"Paper","hex":"#F5F5F0"},{"name":"Signal","hex":"#C8FF00"},{"name":"Graphite","hex":"#5C5C5C"}]$frame$::jsonb,
  array[$frame$Identity system$frame$, $frame$Design tokens$frame$, $frame$Next.js prototype$frame$, $frame$SVG mark$frame$]::text[],
  true,
  true,
  1,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '11111111-1111-4111-8111-111111111111' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '11111111-1111-4111-8111-111111111111', null, $frame$Novara wordmark on a black field with a lime calibration ring$frame$, $frame$The mark closes when a reading is confirmed.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '11111111-1111-4111-8111-111111111111' and alt = $frame$Novara wordmark on a black field with a lime calibration ring$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '11111111-1111-4111-8111-111111111111', null, $frame$Specification sheet using mono labels and a single lime value$frame$, $frame$Lime is reserved for the number that matters.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '11111111-1111-4111-8111-111111111111' and alt = $frame$Specification sheet using mono labels and a single lime value$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '11111111-1111-4111-8111-111111111111', null, $frame$Metal enclosure study in one-color engraving$frame$, $frame$The one-color version is the real test.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '11111111-1111-4111-8111-111111111111' and alt = $frame$Metal enclosure study in one-color engraving$frame$
);

insert into public.project_services (project_id, service_id)
values ('11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5')
on conflict do nothing;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '22222222-2222-4222-8222-222222222222',
  $frame$velora$frame$,
  $frame$Velora$frame$,
  $frame$Velora$frame$,
  $frame$Fashion e-commerce$frame$,
  2026,
  $frame$An editorial storefront for a fictional clothing label that sells fewer pieces and describes them properly.$frame$,
  $frame$Velora is an invented fashion label. The concept store refuses the infinite grid. Each garment gets a page with material, cut, and a short note from the fictional design room. The shop is a sequence: issue, garment, detail, size. Checkout is quiet. The interface borrows from a magazine contents page more than from a marketplace.$frame$,
  $frame$In the story, Velora releases two collections a year and keeps archive pieces available until they are gone. The shopper is someone who reads the fabric note before the price. Velora is a concept brand created for this website. It is not a store you can buy from, and it is not based on a real label.$frame$,
  $frame$Fashion commerce templates optimize for density. Velora needed enough structure to choose a size without turning the garment into a thumbnail. Product photography in the concept is represented by composed frames, because this study does not use another brand's campaign imagery.$frame$,
  $frame$We designed the shop as an issue. The index is typographic. A product opens into a long page: image, name, price, essay, specifications, sizes. Filters are few: cut, material, availability. Motion is limited to the image mask and the size selector.$frame$,
  $frame$[{"title":"Catalog model","text":"We defined the fields a garment must have before drawing a single product card."},{"title":"Index","text":"The listing page was prototyped as a contents list, then as an image index, and the list won for clarity."},{"title":"Product page","text":"Hierarchy puts the garment name and the material note above the add-to-bag action."},{"title":"States","text":"Sold out, waitlist, and size guidance were designed as part of the page, not as alerts."}]$frame$::jsonb,
  $frame$The study produces a storefront structure that keeps editorial tone without hiding the purchase. Sample products in the prototype are fictional garments with invented prices. No transaction runs on this site.$frame$,
  array[$frame$Anton$frame$, $frame$Manrope$frame$]::text[],
  $frame$[{"name":"Cocoa","hex":"#1A1210"},{"name":"Blush","hex":"#F3D6C8"},{"name":"Seal","hex":"#E24B4B"},{"name":"Ivory","hex":"#F7F1EA"}]$frame$::jsonb,
  array[$frame$Information architecture$frame$, $frame$Interface design$frame$, $frame$Next.js prototype$frame$, $frame$Content model$frame$]::text[],
  true,
  true,
  2,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '22222222-2222-4222-8222-222222222222' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '22222222-2222-4222-8222-222222222222', null, $frame$Typographic contents page listing fictional Velora garments$frame$, $frame$The index reads like a contents page.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '22222222-2222-4222-8222-222222222222' and alt = $frame$Typographic contents page listing fictional Velora garments$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '22222222-2222-4222-8222-222222222222', null, $frame$Product page with material note beside a blush color field$frame$, $frame$The fabric note sits above the price.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '22222222-2222-4222-8222-222222222222' and alt = $frame$Product page with material note beside a blush color field$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '22222222-2222-4222-8222-222222222222', null, $frame$Size selector with a quiet sold-out state$frame$, $frame$Unavailable sizes stay visible and explained.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '22222222-2222-4222-8222-222222222222' and alt = $frame$Size selector with a quiet sold-out state$frame$
);

insert into public.project_services (project_id, service_id)
values ('22222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('22222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3')
on conflict do nothing;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '33333333-3333-4333-8333-333333333333',
  $frame$aether$frame$,
  $frame$Aether$frame$,
  $frame$Aether$frame$,
  $frame$Digital experience$frame$,
  2026,
  $frame$A narrative site for a fictional spatial-audio lab, built as a sequence of listening rooms.$frame$,
  $frame$Aether is an invented lab studying how sound occupies a room. The concept site is not a brochure. It is a series of rooms: arrival, method, instrument, and an open note. Each room has one idea, one visual instrument, and one paragraph that can be read without the animation. Scroll reveals the instrument. The copy still works if motion is reduced.$frame$,
  $frame$The fictional lab publishes tools for composers and exhibition designers. Visitors in the concept are curious practitioners, not investors. Aether does not exist as a company, a product, or a research group outside this case study.$frame$,
  $frame$Experiential sites often hide the content inside the effect. Aether had to feel spatial and still be a document you can quote, share, and finish on a phone in two minutes.$frame$,
  $frame$We split every scene into a stable text column and a visual instrument. The instrument can be a ring, a field of points, or a held tone represented as type. Nothing necessary lives only in the animation. Navigation is a simple room index.$frame$,
  $frame$[{"title":"Script","text":"The experience was written as four rooms before any visual was drawn."},{"title":"Instrument","text":"Each room received one interactive device with a still fallback of equal hierarchy."},{"title":"Type","text":"Oversized numerals mark the room. Body copy stays in a measure narrow enough to read."},{"title":"Pass","text":"We walked the sequence with a keyboard and with reduced motion, then removed a parallax layer that failed both."}]$frame$::jsonb,
  $frame$The concept demonstrates a digital experience that is authored like an essay. It is a prototype narrative, not a deployed installation. The lesson we keep is the split between reading and instrument.$frame$,
  array[$frame$Anton$frame$, $frame$IBM Plex Mono$frame$]::text[],
  $frame$[{"name":"Night","hex":"#0B1020"},{"name":"Violet","hex":"#7C5CFF"},{"name":"Tide","hex":"#3EE0C5"},{"name":"Mist","hex":"#F4F1FF"}]$frame$::jsonb,
  array[$frame$Next.js$frame$, $frame$Motion$frame$, $frame$SVG instruments$frame$, $frame$Accessible fallbacks$frame$]::text[],
  true,
  true,
  3,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '33333333-3333-4333-8333-333333333333' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '33333333-3333-4333-8333-333333333333', null, $frame$Room index with oversized numerals on a night field$frame$, $frame$Four rooms, one idea each.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '33333333-3333-4333-8333-333333333333' and alt = $frame$Room index with oversized numerals on a night field$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '33333333-3333-4333-8333-333333333333', null, $frame$Listening ring drawn in violet and tide on black$frame$, $frame$The instrument sits beside the paragraph, not instead of it.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '33333333-3333-4333-8333-333333333333' and alt = $frame$Listening ring drawn in violet and tide on black$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '33333333-3333-4333-8333-333333333333', null, $frame$Reduced-motion still of the same listening room$frame$, $frame$The still composition keeps the hierarchy.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '33333333-3333-4333-8333-333333333333' and alt = $frame$Reduced-motion still of the same listening room$frame$
);

insert into public.project_services (project_id, service_id)
values ('33333333-3333-4333-8333-333333333333', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('33333333-3333-4333-8333-333333333333', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4')
on conflict do nothing;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '44444444-4444-4444-8444-444444444444',
  $frame$mono$frame$,
  $frame$Mono$frame$,
  $frame$Mono$frame$,
  $frame$Lifestyle identity$frame$,
  2026,
  $frame$A near-monochrome identity for a fictional homeware line that wanted warmth without pastel.$frame$,
  $frame$Mono is an invented homeware brand. Objects in the fiction are heavy, repairable, and few. The identity uses almost no color. Warmth comes from paper stock, a slightly irregular wordmark, and photography direction described as 'daylight on a material, not a lifestyle scene.' The guidelines spend more pages on what not to show than on filters.$frame$,
  $frame$In the concept, Mono sells tables, vessels, and lamps through a short seasonal note rather than a discount calendar. The customer is someone furnishing one good room. Mono is a fictional brand built for this study. It is not a manufacturer, and the objects are not for sale.$frame$,
  $frame$Lifestyle identities slide into the same beige editorial. Mono needed to feel human while staying severe, and the system had to tell a photographer what to exclude.$frame$,
  $frame$We reduced the palette to ink, paper, and a single grey, then put the personality in cropping and language. Product names are plain: Lamp 02, Vessel 04. Captions talk about weight, edge, and repair. People appear only as hands using an object.$frame$,
  $frame$[{"title":"Refusal list","text":"The first artifact was a list of images the brand would not publish."},{"title":"Wordmark","text":"The name is set in the display grotesque with slightly open tracking so it feels carved, not shouted."},{"title":"Catalog","text":"A sixteen-page seasonal note shows object, material, and a repair note."},{"title":"Voice","text":"Sentences stay under twenty words. Adjectives have to name a material fact."}]$frame$::jsonb,
  $frame$The identity is a restraint system: palette, crop, naming, and a voice guide. Shown as a concept catalog, not a launched shop. The useful result is a brand that can add an object without adding a campaign.$frame$,
  array[$frame$Anton$frame$, $frame$Manrope$frame$]::text[],
  $frame$[{"name":"Ink","hex":"#111111"},{"name":"Paper","hex":"#F5F5F0"},{"name":"Ash","hex":"#858585"},{"name":"White","hex":"#FFFFFF"}]$frame$::jsonb,
  array[$frame$Identity system$frame$, $frame$Editorial layout$frame$, $frame$Verbal guidelines$frame$]::text[],
  false,
  true,
  4,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '44444444-4444-4444-8444-444444444444' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '44444444-4444-4444-8444-444444444444', null, $frame$Mono wordmark in ink on warm paper$frame$, $frame$Tracking is open so the name feels carved.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '44444444-4444-4444-8444-444444444444' and alt = $frame$Mono wordmark in ink on warm paper$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '44444444-4444-4444-8444-444444444444', null, $frame$Catalog spread naming Lamp 02 with a material caption$frame$, $frame$Objects use numbers, not nicknames.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '44444444-4444-4444-8444-444444444444' and alt = $frame$Catalog spread naming Lamp 02 with a material caption$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '44444444-4444-4444-8444-444444444444', null, $frame$Crop study showing an edge and a hand, not a styled room$frame$, $frame$The crop guide bans the lifestyle scene.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '44444444-4444-4444-8444-444444444444' and alt = $frame$Crop study showing an edge and a hand, not a styled room$frame$
);

insert into public.project_services (project_id, service_id)
values ('44444444-4444-4444-8444-444444444444', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('44444444-4444-4444-8444-444444444444', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5')
on conflict do nothing;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '55555555-5555-4555-8555-555555555555',
  $frame$orbit$frame$,
  $frame$Orbit$frame$,
  $frame$Orbit$frame$,
  $frame$Creative campaign$frame$,
  2026,
  $frame$A launch campaign for a fictional cultural festival that unfolds as a sequence of announcements, not a single poster.$frame$,
  $frame$Orbit is an invented one-week festival of talks, screenings, and night performances. The campaign concept releases the lineup as orbits: an outer ring of dates, a middle ring of themes, an inner ring of names. Each week before the fiction festival, one ring is completed. Motion is a slow rotation, always interruptible, never a loader.$frame$,
  $frame$The festival in the story takes place in a city that is deliberately unnamed so the concept cannot be mistaken for a real event. Speakers and films are invented. Orbit is a campaign study. It is not an invitation, a ticket sale, or a real program.$frame$,
  $frame$Festival campaigns collapse into a crowded poster. Orbit needed suspense across several weeks and a system that still made sense when someone saw only the third announcement.$frame$,
  $frame$Every asset is a partial orbit. A single post always shows the full ring structure with unknown slots marked, so a late viewer understands the shape. Color is limited to lime for confirmed names and a hot accent for the night program. Type does the shouting. Imagery is typographic.$frame$,
  $frame$[{"title":"Calendar","text":"We wrote the six-week release order before designing a frame."},{"title":"Ring","text":"The orbit diagram was tested at story size and at poster size."},{"title":"Voice","text":"Announcements are one sentence plus the new names. No hype line repeated across weeks."},{"title":"Motion","text":"Rotation is slow and pauses on focus. Reduced motion shows the completed frame immediately."}]$frame$::jsonb,
  $frame$The study is a campaign system with a release logic, a diagram, and motion rules. It was not run in market. Its value is the decision to make every fragment explain the whole.$frame$,
  array[$frame$Anton$frame$, $frame$IBM Plex Mono$frame$]::text[],
  $frame$[{"name":"Field","hex":"#10140F"},{"name":"Lime","hex":"#C8FF00"},{"name":"Night accent","hex":"#FF5C1C"},{"name":"Dust","hex":"#E7E2D6"}]$frame$::jsonb,
  array[$frame$Campaign system$frame$, $frame$Motion study$frame$, $frame$SVG diagram$frame$]::text[],
  false,
  true,
  5,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '55555555-5555-4555-8555-555555555555' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '55555555-5555-4555-8555-555555555555', null, $frame$Orbit diagram with confirmed names in lime and open slots in grey$frame$, $frame$Open slots stay visible so the shape is learnable.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '55555555-5555-4555-8555-555555555555' and alt = $frame$Orbit diagram with confirmed names in lime and open slots in grey$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '55555555-5555-4555-8555-555555555555', null, $frame$Announcement card with one new sentence and three names$frame$, $frame$Each week adds names, not a new slogan.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '55555555-5555-4555-8555-555555555555' and alt = $frame$Announcement card with one new sentence and three names$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '55555555-5555-4555-8555-555555555555', null, $frame$Poster crop of the outer date ring$frame$, $frame$The poster is the same diagram, larger.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '55555555-5555-4555-8555-555555555555' and alt = $frame$Poster crop of the outer date ring$frame$
);

insert into public.project_services (project_id, service_id)
values ('55555555-5555-4555-8555-555555555555', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('55555555-5555-4555-8555-555555555555', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5')
on conflict do nothing;

insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '66666666-6666-4666-8666-666666666666',
  $frame$pulse$frame$,
  $frame$Pulse$frame$,
  $frame$Pulse$frame$,
  $frame$Digital product$frame$,
  2026,
  $frame$A focused writing tool for a fictional newsroom that measures attention without turning writers into a dashboard.$frame$,
  $frame$Pulse is an invented product for editors. The concept tracks which stories a reader finishes, then shows the writer one signal: where people leave. It does not show a wall of charts. The interface is a manuscript with a single margin note. The product study covers the editor's morning loop: open a story, read the leave-point, revise the section, mark it done.$frame$,
  $frame$In the fiction, Pulse is used by a small newsroom that publishes essays and reported features. It is not a real application, not a startup, and not affiliated with any analytics company. Sample stories inside the prototype are original text written for the study.$frame$,
  $frame$Analytics products bury the sentence that needs work under graphs. Pulse had to feel like a writing tool that happens to know something, and it had to be honest about what a leave-point cannot prove.$frame$,
  $frame$We designed the primary screen as the draft. The signal sits in the margin at the paragraph where readers leave, with a plain-language note: 'Many readers stop here. This does not say why.' Secondary screens exist for editors who want the trend, two clicks away, never on the writing surface.$frame$,
  $frame$[{"title":"Loop","text":"We scripted the morning task and refused any feature that did not serve that loop."},{"title":"Margin","text":"The signal was prototyped as a chart, a highlight, and a margin note. The note won."},{"title":"Honesty","text":"Every metric on screen includes the limit of what it means."},{"title":"Build","text":"A Next.js prototype uses original sample essays so the interface can be judged with real paragraphs."}]$frame$::jsonb,
  $frame$The concept product shows a narrower analytics surface that respects the draft. It is not shipping software. The outcome is a flow, a component set, and a rule for how metrics are allowed to speak.$frame$,
  array[$frame$Manrope$frame$, $frame$IBM Plex Mono$frame$]::text[],
  $frame$[{"name":"Plum","hex":"#140818"},{"name":"Hot","hex":"#FF2E88"},{"name":"Lime","hex":"#C8FF00"},{"name":"Paper","hex":"#F5F5F0"}]$frame$::jsonb,
  array[$frame$Product framing$frame$, $frame$Interface design$frame$, $frame$Next.js prototype$frame$, $frame$Sample content model$frame$]::text[],
  true,
  true,
  6,
  true
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;

delete from public.project_gallery where project_id = '66666666-6666-4666-8666-666666666666' and storage_path is null;

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '66666666-6666-4666-8666-666666666666', null, $frame$Manuscript screen with a single margin note at a paragraph$frame$, $frame$The signal lives in the margin of the draft.$frame$, 0
where not exists (
  select 1 from public.project_gallery
  where project_id = '66666666-6666-4666-8666-666666666666' and alt = $frame$Manuscript screen with a single margin note at a paragraph$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '66666666-6666-4666-8666-666666666666', null, $frame$Leave-point note explaining the limit of the metric$frame$, $frame$The interface says what the number cannot prove.$frame$, 1
where not exists (
  select 1 from public.project_gallery
  where project_id = '66666666-6666-4666-8666-666666666666' and alt = $frame$Leave-point note explaining the limit of the metric$frame$
);

insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '66666666-6666-4666-8666-666666666666', null, $frame$Secondary trend view two steps away from the writing surface$frame$, $frame$Charts are available, and they are not the home screen.$frame$, 2
where not exists (
  select 1 from public.project_gallery
  where project_id = '66666666-6666-4666-8666-666666666666' and alt = $frame$Secondary trend view two steps away from the writing surface$frame$
);

insert into public.project_services (project_id, service_id)
values ('66666666-6666-4666-8666-666666666666', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2')
on conflict do nothing;

insert into public.project_services (project_id, service_id)
values ('66666666-6666-4666-8666-666666666666', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3')
on conflict do nothing;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
  $frame$restraint-is-a-loud-decision$frame$,
  $frame$Restraint is a loud decision$frame$,
  $frame$Taking things away is not a lack of ideas. It is how a studio makes the remaining idea readable.$frame$,
  $frame$[{"type":"p","text":"Studios are often asked to add. Another color, another sequence, another panel that explains the panel above it. The work gets heavier and the idea gets quieter. Restraint is the decision to keep one signal strong enough that a person can repeat it after they leave the page."},{"type":"h2","text":"Scarcity needs a rule"},{"type":"p","text":"A palette of black and lime is not automatically disciplined. If lime appears on every edge, it becomes wallpaper. On the Novara concept we reserved the signal color for confirmation: a recorded value, a current link, a closed mark. The rule is what makes the color loud. Without the rule, the same hex code is decoration."},{"type":"quote","text":"If everything is emphasized, the page is whispering."},{"type":"p","text":"The same logic applies to motion. A mask that opens on the first image can be memorable. The same mask on every card becomes a delay. We write the job of a movement before we write the duration. Orientation, emphasis, feedback, or continuity. If we cannot name the job, the movement does not ship."},{"type":"h2","text":"What we keep"},{"type":"p","text":"Restraint is not emptiness. The page still needs a heading that can be read from across a room, a sentence that says what the work is, and a way to go further. Those three things get the contrast. Supporting detail can be quiet, grey, and small, as long as it is still readable. We test that last part. A grey that looks elegant in a screenshot and fails on a phone is not restraint. It is a contrast error."},{"type":"p","text":"This journal, like the projects it discusses, is a concept. The opinion is still one we would take into a real room: edit until the idea is unavoidable, then stop."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
  1,
  true,
  $frame$2026-09-12$frame$,
  $frame$Restraint is a loud decision — FRAME Studio Journal$frame$,
  $frame$Why FRAME treats editing as the loudest creative decision, and how restraint shows up in type, color, and interface.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc2',
  $frame$interfaces-that-feel-inevitable$frame$,
  $frame$Interfaces that feel inevitable$frame$,
  $frame$A product feels obvious after the structure is right. Visual style cannot rescue a confused sequence.$frame$,
  $frame$[{"type":"p","text":"People call an interface intuitive when they cannot see the decisions. Those decisions are mostly about order. What is on the first screen. What is a click away. What is absent on purpose. Style comes after that sequence feels fair."},{"type":"h2","text":"Start from the loop"},{"type":"p","text":"On Pulse, the fictional writing tool in our work section, the loop is short: open a draft, see where readers leave, revise that section, mark it done. Any feature that did not serve the loop was treated as a later screen or cut. The home surface is the manuscript. The metric sits in the margin. A chart exists, two steps away, for the editor who wants it."},{"type":"p","text":"That arrangement is the design. The plum field and the hot accent are how it looks. They are not why it feels obvious. If the chart had been the home screen, no typeface would have fixed the feeling that the tool was watching the writer instead of helping them."},{"type":"quote","text":"Inevitable is a structural compliment. It is not a visual one."},{"type":"h2","text":"Design the awkward states"},{"type":"p","text":"Empty, loading, error, and insufficient-data states are part of the loop. Pulse's margin note includes a limit: a leave-point does not explain why a reader stopped. Writing that sentence into the interface is a design task. It keeps the product from sounding more certain than the evidence."},{"type":"p","text":"We use the same test on marketing sites. If the first screen needs the animation in order to be understood, the structure is not finished. Motion can add tone. It should not be load-bearing for the meaning."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
  1,
  true,
  $frame$2026-08-28$frame$,
  $frame$Interfaces that feel inevitable — FRAME Studio Journal$frame$,
  $frame$How FRAME designs product interfaces by settling the sequence before the surface, using the fictional Pulse study as proof.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc3',
  $frame$motion-with-a-job$frame$,
  $frame$Motion with a job to do$frame$,
  $frame$Movement should orient, emphasize, confirm, or connect. Anything else is a cost the reader pays.$frame$,
  $frame$[{"type":"p","text":"Motion is the easiest way to make a page look expensive and feel slow. We start from the opposite end. A transition should be shorter than the decision it supports. If the mask takes longer than reading the label underneath it, the mask is wrong."},{"type":"h2","text":"Four jobs"},{"type":"p","text":"Orientation tells you where you are. The page fade on this site is orientation: a short confirmation that the route changed. Emphasis points at one thing, the way a headline settles into place. Feedback answers an action, the way a button acknowledges a hover without moving so far that the click misses. Continuity connects two states, the way a project image opens from a card into a case study."},{"type":"p","text":"Aether, our fictional listening-room site, uses continuity inside each room and almost none between rooms. The room change is a cut. The instrument inside the room is allowed to arrive. That split keeps the sequence feeling spatial without making the reader wait to read."},{"type":"h2","text":"Reduced motion is a composition"},{"type":"quote","text":"A fallback that looks broken is a design that was never finished."},{"type":"p","text":"When a person asks the system for less motion, they should get the same hierarchy, immediately. We do not leave empty boxes where an animation was supposed to reveal the content. The still frame is designed. On this website, reveals, the custom cursor, and magnetic shifts step aside when that preference is set. The type, the contrast, and the links stay."},{"type":"p","text":"If you are building your own system, write the four jobs down and force every storyboard to pick one. The work gets shorter. The pages get faster. The moments you keep are the ones people remember."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
  1,
  true,
  $frame$2026-08-02$frame$,
  $frame$Motion with a job to do — FRAME Studio Journal$frame$,
  $frame$FRAME's rules for motion design: name the job, respect reduced motion, and keep transitions shorter than the decision.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc4',
  $frame$brutal-clarity$frame$,
  $frame$The case for brutal clarity$frame$,
  $frame$Brutalist layout is not an excuse for harsh reading. It is a way to make structure visible.$frame$,
  $frame$[{"type":"p","text":"Brutalist editorial design shows the frame. Big type, hard edges, uneven grids, raw color. Used carelessly, it becomes a costume that makes text hard to read and buttons hard to find. Used carefully, it makes the structure of the page obvious, which is a kindness."},{"type":"h2","text":"Asymmetry still needs a line"},{"type":"p","text":"An uneven grid is not the absence of a grid. On this site the left edge of the headline, the label, and the body often share a line, while the right side is allowed to break. The eye gets a spine. The composition gets tension. If every element is offset, the page is just messy, and mess is not a style."},{"type":"p","text":"High contrast is the other kindness. Ink on paper, paper on ink, black on lime. We use the studio grey for labels and metadata, and we keep paragraphs in the light or the dark field where the contrast holds. A brutalist page that fails contrast is not committed. It is unfinished."},{"type":"quote","text":"The frame should be visible. The sentence should be easy."},{"type":"h2","text":"Texture is secondary"},{"type":"p","text":"Halftone, grain, and masks are texture. They sit behind the reading, at low opacity, and they never carry a label. If you remove them and the page collapses, they were doing a job that type should have done. We like them. We do not depend on them."},{"type":"p","text":"The reference point is a printed page that can be understood from the doorway and read comfortably in the chair. Scale and clarity are the whole argument. The rest is manners."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
  1,
  true,
  $frame$2026-07-18$frame$,
  $frame$The case for brutal clarity — FRAME Studio Journal$frame$,
  $frame$What brutalist editorial design means at FRAME: visible structure, high contrast, and type that can be read.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc5',
  $frame$inside-a-concept-sprint$frame$,
  $frame$Inside a concept sprint$frame$,
  $frame$How a fictional project still gets a real process: platform, system, prototype, and an edit that hurts a little.$frame$,
  $frame$[{"type":"p","text":"The projects in this site are fictional. The sequence we use to make them is not a sketch. A concept sprint is how we keep an invented brand from becoming a moodboard with a name."},{"type":"h2","text":"Day one is a platform"},{"type":"p","text":"We write a short platform: the idea, the audience inside the fiction, the tension, and the proof we will show. For Velora, the tension was editorial tone versus the need to choose a size. For Pulse, it was a metric that had to stay humble inside a writing tool. If the platform cannot be said in a few sentences, the sprint is not ready for pictures."},{"type":"h2","text":"Then a system, then a scene"},{"type":"p","text":"We design the rules before the hero. Type roles, color limits, content fields, the thing the interface refuses to do. Scenes come after: a product page, a poster, a room. Scenes are how we test the rules. They are not a substitute for them."},{"type":"p","text":"The prototype uses original copy. Placeholder text hides hierarchy problems, so we do not use it. A case study that cannot explain the challenge in plain language is sent back to the platform."},{"type":"quote","text":"A concept still has to survive contact with a real sentence."},{"type":"h2","text":"The edit"},{"type":"p","text":"At the end we remove the competent piece that does not serve the platform. This is the part that feels like a loss and reads as confidence. Orbit lost a photographic direction because the diagram was the campaign. Mono lost a warm accent color because warmth was supposed to come from the words and the crop."},{"type":"p","text":"When the sprint works, a stranger can open the case study and retell the decision. That retelling is the deliverable we care about, even when the brand itself is invented."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
  1,
  true,
  $frame$2026-06-30$frame$,
  $frame$Inside a concept sprint — FRAME Studio Journal$frame$,
  $frame$The four-part process FRAME uses on concept projects, from the creative platform to the final edit.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc6',
  $frame$color-that-survives-the-feed$frame$,
  $frame$Color that survives the feed$frame$,
  $frame$A color system has to work as a crop, a favicon, and a paragraph, not only as a palette slide.$frame$,
  $frame$[{"type":"p","text":"Most palettes are designed as a row of squares. They fail the moment they are cropped into a square on a phone, printed in one color, or placed behind a paragraph. A color system has to survive those three tests or it is only a slide."},{"type":"h2","text":"Name the roles"},{"type":"p","text":"We name roles before we fall in love with a hex. Field, paper, signal, support. Field is the ground. Paper is the reading color. Signal is the one accent that is allowed to mean 'this matters.' Support is for metadata and lines. Four roles are enough for almost every concept in this site. Extra colors have to audition for a job the first four cannot do."},{"type":"p","text":"Orbit uses a second accent because the fiction has two programs, day and night, and one signal color would have lied. That is a job. A favorite swatch is not a job."},{"type":"quote","text":"If the crop is unrecognizable without the wordmark, the color is not doing enough."},{"type":"h2","text":"Test the small sizes"},{"type":"p","text":"We look at the system as a favicon, a one-inch diagram, and a block of body text. Electric lime on black survives all three. Lime as small text on warm paper does not, so we do not use it that way. The brand color can be a ground for black type and still be the brand. It does not have to be the type."},{"type":"p","text":"Contrast is checked, not guessed. The studio grey is for labels that are large enough to hold it. Long reading stays in paper or ink. A system that looks severe and reads poorly has failed the only test that counts."}]$frame$::jsonb,
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
  1,
  true,
  $frame$2026-06-09$frame$,
  $frame$Color that survives the feed — FRAME Studio Journal$frame$,
  $frame$How FRAME builds small color systems that stay recognizable in a thumbnail, a product UI, and a long read.$frame$
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

commit;
