# Santifer iRepair — Programmatic SEO Website

**[:gb: English](#the-problem)** | **[:es: Español](#es-el-problema)**

> Astro-based programmatic SEO website that generated 15,500+ unique pages from an Airtable ERP, reaching 2.26M impressions and 2,000 monthly clicks in Google Spain.

[![Case Study](https://img.shields.io/badge/Case_Study-santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io/programmatic-seo)
[![Live Site](https://img.shields.io/badge/Live_Site-santiferirepair.es-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://santiferirepair.es)

---

![Santifer iRepair Homepage](docs/ss-homepage.webp)

---

## The Problem

Local repair shops have thousands of potential service pages (every brand x model x repair type), but creating them manually is impossible. Existing solutions either generate thin, duplicate content or require expensive CMS platforms.

## The Solution

A fully automated pipeline that reads device data from an Airtable ERP, uses DataForSEO to decide which pages deserve to exist based on real search volume, generates optimized images with Sharp, and builds 15,500+ unique Astro pages with structured data, breadcrumbs, and internal linking.

**Key Features:**
- **DataForSEO-powered indexability engine** — not every possible page gets indexed. A decision layer queries real search volume data to determine which combinations (model x repair x city) justify a page. Pages below threshold get `noindex`.
- **9 Node.js scripts** that generate images, sitemaps, and metadata from Airtable
- **Parametric Astro routes** — one layout generates thousands of unique pages
- **EXIF injection** for Google Images ranking (geo-coordinates, descriptions)
- **Crawl budget optimization** — selective `noindex`, filtered sitemaps (4,084 URLs from thousands possible), 700+ redirect rules for Squarespace migration, and strategic internal linking

---

## Tech Stack

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=airtable&logoColor=white)
![DataForSEO](https://img.shields.io/badge/DataForSEO-FF6B00?style=flat&logo=data:image/svg+xml;base64,&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=flat&logo=sharp&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel&logoColor=white)

---

## Architecture Decisions

### DataForSEO as Decision Engine

The pipeline doesn't blindly generate pages for every possible combination. Before a page is built, DataForSEO's keyword data API is queried to check real search volume for that specific `{brand} + {model} + {repair} + {city}` combination. Pages below the volume threshold are either not generated or marked `noindex`, concentrating crawl budget on pages that actually drive traffic.

This is visible in Airtable's `indexable` field and in `src/lib/airtable.ts` where the indexability logic lives.

### Crawl Budget Optimization

With 15,500+ possible pages, controlling what Google crawls is critical:

- **Selective noindex** — low-volume pages exist for UX completeness but don't waste crawl budget
- **Filtered sitemaps** — only 4,084 URLs submitted out of thousands possible (`public/sitemap-0.xml`)
- **700+ redirects** — bridge rules in `vercel.json` for the Squarespace-to-Astro migration, preserving link equity
- **JSON-LD structured data** — LocalBusiness, BreadcrumbList, Organization on every page

---

## How It Works

```
Airtable (ERP)  →  DataForSEO    →  Node.js Scripts  →  Astro SSG  →  Vercel/Cloudflare
   300+ models      search volume     image pipeline      15,500+         CDN + Edge
   50+ brands       indexability       EXIF injection       pages
   reviews          decisions          sitemaps
```

Every device model, brand, and repair type stored in Airtable flows through a decision layer (DataForSEO search volume data), then through a pipeline of Node.js scripts that generate optimized images with SEO metadata. Finally, Astro builds parametric pages using dynamic routes like:

- `/reparar-movil/samsung/galaxy-s24/` — model page
- `/reparar-movil/samsung/sevilla` — brand + city
- `/reparar-movil/cambiar-pantalla/sevilla` — repair type + city
- `/reparar-apple-watch/apple/se-40mm/` — Apple product families

![Generated repair page example](docs/ss-repair-page.webp)

---

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Add your Airtable API key and base ID
```

---

## Usage

```bash
# Run image pipeline (requires Airtable data)
node scripts/generarImagenesReparacionesModelos.mjs
node scripts/ExifLocal.mjs
node scripts/sitemaps.mjs

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `AIRTABLE_API_KEY` | Airtable personal access token | Yes |
| `AIRTABLE_BASE_ID` | Airtable base containing device data | Yes |

---

## The Pipeline Scripts

The core of the pSEO approach — 9 Node.js scripts that transform Airtable data into optimized web assets:

| Script | What it does |
|--------|-------------|
| `generarImagenesReparacionesModelos.mjs` | Generates device-specific images with model overlays |
| `generarImagenesReparacionesMarcas.mjs` | Creates brand-level repair guide images and thumbnails |
| `generarImagenesReparacionesTipos.cjs` | Converts device type templates to optimized WebP |
| `generarImagenesBackgroundPasosReparacion.mjs` | Generates repair step illustrations with branding |
| `generarImagenesReseñas.mjs` | Creates review/testimonial profile images |
| `CasosExito.mjs` | Downloads and optimizes before/after case study images |
| `ExifLocal.mjs` | Injects EXIF metadata (description, GPS) for Google Images SEO |
| `scriptImagenesGoogle.mjs` | Fetches and processes external device images |
| `sitemaps.mjs` | Generates XML sitemaps organized by device type and category |

The ~15,000 generated images are not included in this repo — they are pipeline output, not source code.

---

## Project Structure

```
├── src/
│   ├── pages/                    # Astro dynamic routes (parametric SEO pages)
│   │   ├── reparar-[paramTipo]/  # /reparar-movil, /reparar-tablet, /reparar-smartwatch
│   │   ├── [paramMarcaApple]/    # Apple-specific product family routes
│   │   ├── cambiar-[paramRep]/   # Repair type pages
│   │   └── blog/                 # Blog with markdown content
│   ├── layouts/                  # Page templates per hierarchy level
│   │   ├── TipoLayout.astro      #   Device type (mobile/tablet/watch)
│   │   ├── MarcaLayout.astro     #   Brand (Samsung, Apple, Xiaomi...)
│   │   ├── ModeloLayout.astro    #   Specific model
│   │   └── ReparacionLayout.astro#   Repair type (screen, battery...)
│   ├── components/               # 60+ Astro components
│   │   ├── metadatos/            #   JSON-LD structured data
│   │   ├── FAQs.astro            #   Auto-generated FAQ sections
│   │   └── Buscador.astro        #   Client-side device search
│   ├── lib/                      # Airtable client, data caching, indexability logic
│   └── content/blog/             # 16 markdown blog posts
├── scripts/                      # Image generation pipeline
│   ├── plantillas/               # Base templates for image compositing
│   └── src/                      # Script-specific type definitions
├── public/
│   ├── marcas/                   # Brand logos (50+)
│   ├── scripts/                  # Client-side JS (search, modals, reviews)
│   └── fonts/                    # Graphik typeface
└── vercel.json                   # 700+ redirect rules + headers
```

---

## Results

![Google Search Console growth — 0 to 2K clicks in 12 months](docs/ss-gsc-growth.webp)

| Metric | Value |
|--------|-------|
| Pages generated | 15,500+ |
| Impressions (total) | 2,260,000+ |
| Google-indexed keywords | 1,800+ |
| Monthly organic clicks (peak) | 2,000 |
| Sitemap URLs (curated) | 4,084 of thousands possible |
| Google Search Console growth | 0 → 2K clicks in 12 months |
| Business outcome | Successful exit (Sep 2025) |

---

## License

This project is shared as a portfolio piece and educational reference. The code structure and automation patterns are freely available for learning. Brand assets and business-specific content remain property of their respective owners.

---

---

# :es: Version en Español

> Web de SEO programatico construida con Astro que genero 15.500+ paginas unicas desde un ERP en Airtable, alcanzando 2,26M impresiones y 2.000 clics mensuales en Google España.

[![Caso de Estudio](https://img.shields.io/badge/Caso_de_Estudio-santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io/seo-programatico)
[![Sitio en Vivo](https://img.shields.io/badge/Sitio_en_Vivo-santiferirepair.es-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://santiferirepair.es)

---

## El Problema

Las tiendas de reparacion locales tienen miles de paginas de servicio potenciales (cada marca x modelo x tipo de reparacion), pero crearlas manualmente es imposible. Las soluciones existentes generan contenido duplicado o requieren plataformas CMS caras.

## La Solucion

Un pipeline completamente automatizado que lee datos de dispositivos desde un ERP en Airtable, usa DataForSEO para decidir que paginas merecen existir basandose en volumen de busqueda real, genera imagenes optimizadas con Sharp, y construye 15.500+ paginas unicas con Astro, incluyendo structured data, breadcrumbs y enlazado interno.

**Funcionalidades:**
- **Motor de indexabilidad con DataForSEO** — no todas las paginas posibles se indexan. Una capa de decision consulta datos reales de volumen de busqueda para determinar que combinaciones (modelo x reparacion x ciudad) justifican una pagina. Las que no alcanzan el umbral reciben `noindex`.
- **9 scripts Node.js** que generan imagenes, sitemaps y metadatos desde Airtable
- **Rutas parametricas en Astro** — un layout genera miles de paginas unicas
- **Inyeccion EXIF** para posicionar en Google Images (coordenadas, descripciones)
- **Optimizacion de crawl budget** — `noindex` selectivo, sitemaps filtrados (4.084 URLs de miles posibles), 700+ reglas de redireccion para la migracion desde Squarespace, y enlazado interno estrategico

---

## Stack Tecnico

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=airtable&logoColor=white)
![DataForSEO](https://img.shields.io/badge/DataForSEO-FF6B00?style=flat&logo=data:image/svg+xml;base64,&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=flat&logo=sharp&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel&logoColor=white)

---

## Decisiones de Arquitectura

### DataForSEO como Motor de Decision

El pipeline no genera paginas a ciegas para cada combinacion posible. Antes de construir una pagina, se consulta la API de keyword data de DataForSEO para verificar el volumen de busqueda real de esa combinacion `{marca} + {modelo} + {reparacion} + {ciudad}`. Las paginas por debajo del umbral no se generan o se marcan como `noindex`, concentrando el crawl budget en las paginas que realmente generan trafico.

Esto es visible en el campo `indexable` de Airtable y en `src/lib/airtable.ts` donde vive la logica de indexabilidad.

### Optimizacion de Crawl Budget

Con 15.500+ paginas posibles, controlar lo que Google rastrea es critico:

- **Noindex selectivo** — las paginas de bajo volumen existen para completitud de UX pero no desperdician crawl budget
- **Sitemaps filtrados** — solo 4.084 URLs enviadas de miles posibles (`public/sitemap-0.xml`)
- **700+ redirecciones** — reglas puente en `vercel.json` para la migracion de Squarespace a Astro, preservando link equity
- **JSON-LD structured data** — LocalBusiness, BreadcrumbList, Organization en cada pagina

---

## Como Funciona

```
Airtable (ERP)  →  DataForSEO    →  Scripts Node.js  →  Astro SSG  →  Vercel/Cloudflare
   300+ modelos      volumen de        pipeline de         15.500+        CDN + Edge
   50+ marcas        busqueda          imagenes             paginas
   reseñas           indexabilidad      EXIF + sitemaps
```

Cada modelo de dispositivo, marca y tipo de reparacion almacenado en Airtable pasa por una capa de decision (datos de volumen de busqueda de DataForSEO), luego por un pipeline de scripts Node.js que generan imagenes optimizadas con metadatos SEO. Finalmente, Astro construye paginas parametricas con rutas dinamicas como:

- `/reparar-movil/samsung/galaxy-s24/` — pagina de modelo
- `/reparar-movil/samsung/sevilla` — marca + ciudad
- `/reparar-movil/cambiar-pantalla/sevilla` — tipo de reparacion + ciudad
- `/reparar-apple-watch/apple/se-40mm/` — familias de productos Apple

![Ejemplo de pagina de reparacion generada](docs/ss-repair-page.webp)

---

## Instalacion

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar entorno
cp .env.example .env
# Añade tu API key de Airtable y base ID
```

---

## Uso

```bash
# Ejecutar pipeline de imagenes (requiere datos en Airtable)
node scripts/generarImagenesReparacionesModelos.mjs
node scripts/ExifLocal.mjs
node scripts/sitemaps.mjs

# Servidor de desarrollo
npm run dev

# Build de produccion
npm run build
```

---

## Configuracion

| Variable | Descripcion | Requerida |
|----------|-------------|-----------|
| `AIRTABLE_API_KEY` | Token de acceso personal de Airtable | Si |
| `AIRTABLE_BASE_ID` | Base de Airtable con datos de dispositivos | Si |

---

## Los Scripts del Pipeline

| Script | Que hace |
|--------|----------|
| `generarImagenesReparacionesModelos.mjs` | Genera imagenes por modelo de dispositivo con overlays |
| `generarImagenesReparacionesMarcas.mjs` | Crea imagenes de guia de reparacion por marca |
| `generarImagenesReparacionesTipos.cjs` | Convierte plantillas por tipo de dispositivo a WebP |
| `generarImagenesBackgroundPasosReparacion.mjs` | Genera ilustraciones de pasos de reparacion |
| `generarImagenesReseñas.mjs` | Crea imagenes de perfil para reseñas desde Airtable |
| `CasosExito.mjs` | Descarga y optimiza imagenes antes/despues |
| `ExifLocal.mjs` | Inyecta metadatos EXIF para SEO en Google Images |
| `scriptImagenesGoogle.mjs` | Obtiene y procesa imagenes externas de dispositivos |
| `sitemaps.mjs` | Genera sitemaps XML por tipo de dispositivo y categoria |

---

## Estructura del Proyecto

```
├── src/
│   ├── pages/                    # Rutas dinamicas Astro (paginas SEO parametricas)
│   │   ├── reparar-[paramTipo]/  # /reparar-movil, /reparar-tablet, /reparar-smartwatch
│   │   ├── [paramMarcaApple]/    # Rutas de familias de productos Apple
│   │   ├── cambiar-[paramRep]/   # Paginas por tipo de reparacion
│   │   └── blog/                 # Blog con contenido markdown
│   ├── layouts/                  # Templates de pagina por nivel de jerarquia
│   │   ├── TipoLayout.astro      #   Tipo de dispositivo (movil/tablet/watch)
│   │   ├── MarcaLayout.astro     #   Marca (Samsung, Apple, Xiaomi...)
│   │   ├── ModeloLayout.astro    #   Modelo especifico
│   │   └── ReparacionLayout.astro#   Tipo de reparacion (pantalla, bateria...)
│   ├── components/               # 60+ componentes Astro
│   │   ├── metadatos/            #   JSON-LD structured data
│   │   ├── FAQs.astro            #   Secciones FAQ auto-generadas
│   │   └── Buscador.astro        #   Buscador de dispositivos del lado cliente
│   ├── lib/                      # Cliente Airtable, cache, logica de indexabilidad
│   └── content/blog/             # 16 posts de blog en markdown
├── scripts/                      # Pipeline de generacion de imagenes
│   ├── plantillas/               # Templates base para composicion de imagenes
│   └── src/                      # Tipos TypeScript de los scripts
├── public/
│   ├── marcas/                   # Logos de marcas (50+)
│   ├── scripts/                  # JS del lado cliente (buscador, modales, reseñas)
│   └── fonts/                    # Tipografia Graphik
└── vercel.json                   # 700+ reglas de redireccion + headers
```

---

## Resultados

![Crecimiento en Google Search Console — de 0 a 2K clics en 12 meses](docs/ss-gsc-growth.webp)

| Metrica | Valor |
|---------|-------|
| Paginas generadas | 15.500+ |
| Impresiones (total) | 2.260.000+ |
| Keywords indexadas en Google | 1.800+ |
| Clics organicos mensuales (pico) | 2.000 |
| URLs en sitemap (curadas) | 4.084 de miles posibles |
| Crecimiento en GSC | 0 → 2K clics en 12 meses |
| Resultado de negocio | Venta exitosa (sep 2025) |

---

## Licencia

Este proyecto se comparte como pieza de portfolio y referencia educativa. La estructura del codigo y los patrones de automatizacion estan disponibles para aprendizaje. Los activos de marca y contenido especifico del negocio pertenecen a sus respectivos propietarios.

---

## Let's Connect

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santifer)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hola@santifer.io)
