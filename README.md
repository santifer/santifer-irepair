# Santifer iRepair — Programmatic SEO Website

**[:gb: English](#how-it-works)** | **[:es: Español](#es-versión-en-español)**

> Astro-based programmatic SEO website that generated **15,500+ unique pages** from an Airtable ERP, reaching **2,000 monthly clicks** and ranking for **1,800+ keywords** in Google Spain — ultimately leading to a successful business exit in September 2025.

This is the source code behind [santiferirepair.es](https://santiferirepair.es), a phone/tablet/smartwatch repair business in Seville, Spain. The site demonstrates how a single developer can build a data-driven SEO machine using off-the-shelf tools.

**Read the full case study:** [santifer.io/seo-programatico](https://santifer.io/seo-programatico) (ES) | [santifer.io/programmatic-seo](https://santifer.io/programmatic-seo) (EN)

## How It Works

```
Airtable (ERP)  →  Node.js Scripts  →  Astro SSG  →  Vercel/Cloudflare
   300+ models       image pipeline      15,500+         CDN + Edge
   50+ brands        EXIF injection       pages
   reviews           sitemaps
```

Every device model, brand, and repair type stored in Airtable flows through a pipeline of Node.js scripts that generate optimized images with SEO metadata, then Astro builds parametric pages using dynamic routes like:

- `/reparar-movil/samsung/galaxy-s24/` (model page)
- `/reparar-movil/samsung/sevilla` (brand + city)
- `/reparar-movil/cambiar-pantalla/sevilla` (repair type + city)
- `/reparar-apple-watch/apple/se-40mm/` (Apple product families)

## Tech Stack

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=airtable&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=flat&logo=sharp&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel&logoColor=white)

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
│   │   ├── metadatos/            #   JSON-LD (LocalBusiness, BreadcrumbList, Organization)
│   │   ├── FAQs.astro            #   Auto-generated FAQ sections
│   │   └── Buscador.astro        #   Client-side device search
│   ├── lib/                      # Airtable client + data caching
│   └── content/blog/             # 16 markdown blog posts
├── scripts/                      # Image generation pipeline (see below)
│   ├── plantillas/               # Base templates for image compositing
│   └── src/                      # Script-specific type definitions
├── public/
│   ├── marcas/                   # Brand logos
│   ├── blogimg/                  # Blog images
│   ├── scripts/                  # Client-side JS (search, modals, reviews)
│   └── fonts/                    # Graphik typeface
└── vercel.json                   # 700+ redirect rules + headers
```

## The Pipeline Scripts

The core of the pSEO approach — 9 Node.js scripts that transform Airtable data into optimized web assets:

| Script | What it does |
|--------|-------------|
| `generarImagenesReparacionesModelos.mjs` | Generates device-specific images with model overlays from Airtable records |
| `generarImagenesReparacionesMarcas.mjs` | Creates brand-level repair guide images and thumbnails |
| `generarImagenesReparacionesTipos.cjs` | Converts device type templates (mobile/tablet/watch) to optimized WebP |
| `generarImagenesBackgroundPasosReparacion.mjs` | Generates repair step illustrations with branding |
| `generarImagenesReseñas.mjs` | Creates review/testimonial profile images from Airtable |
| `CasosExito.mjs` | Downloads and optimizes before/after repair case study images |
| `ExifLocal.mjs` | Injects EXIF metadata (description, GPS coordinates) into images for Google Images SEO |
| `scriptImagenesGoogle.mjs` | Fetches and processes external device images |
| `sitemaps.mjs` | Generates XML sitemaps organized by device type and category |

All scripts read from Airtable and output to `public/`. The generated images (~15,000 files) are not included in this repo — they're pipeline output, not source code.

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Add your Airtable API key and base ID

# 3. Run image pipeline (requires Airtable data)
node scripts/generarImagenesReparacionesModelos.mjs
node scripts/ExifLocal.mjs
node scripts/sitemaps.mjs

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build
```

## Results

| Metric | Value |
|--------|-------|
| Pages generated | 15,500+ |
| Google-indexed keywords | 1,800+ |
| Monthly organic clicks (peak) | 2,000 |
| Google Search Console growth | 0 → 2K clicks in 12 months |
| Business outcome | Successful exit (Sep 2025) |

## License

This project is shared as a portfolio piece and educational reference. The code structure and automation patterns are freely available for learning. Brand assets and business-specific content remain property of their respective owners.

---

# :es: Version en Español

> Web de SEO programatico construida con Astro que genero **15.500+ paginas unicas** desde un ERP en Airtable, alcanzando **2.000 clics mensuales** y posicionando **1.800+ keywords** en Google España — culminando en la venta exitosa del negocio en septiembre 2025.

Este es el codigo fuente de [santiferirepair.es](https://santiferirepair.es), un negocio de reparacion de moviles, tablets y smartwatches en Sevilla. Demuestra como un solo desarrollador puede construir una maquina de SEO basada en datos usando herramientas accesibles.

**Lee el caso de estudio completo:** [santifer.io/seo-programatico](https://santifer.io/seo-programatico)

## Como Funciona

```
Airtable (ERP)  →  Scripts Node.js  →  Astro SSG  →  Vercel/Cloudflare
   300+ modelos      pipeline de         15.500+        CDN + Edge
   50+ marcas        imagenes             paginas
   reseñas           EXIF + sitemaps
```

Cada modelo de dispositivo, marca y tipo de reparacion almacenado en Airtable pasa por un pipeline de scripts Node.js que generan imagenes optimizadas con metadatos SEO. Despues, Astro construye paginas parametricas con rutas dinamicas como:

- `/reparar-movil/samsung/galaxy-s24/` (pagina de modelo)
- `/reparar-movil/samsung/sevilla` (marca + ciudad)
- `/reparar-movil/cambiar-pantalla/sevilla` (tipo de reparacion + ciudad)
- `/reparar-apple-watch/apple/se-40mm/` (familias de productos Apple)

## Stack Tecnico

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=flat&logo=airtable&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=flat&logo=sharp&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel&logoColor=white)

## Los Scripts del Pipeline

El nucleo del enfoque pSEO — 9 scripts Node.js que transforman datos de Airtable en assets web optimizados:

| Script | Que hace |
|--------|----------|
| `generarImagenesReparacionesModelos.mjs` | Genera imagenes por modelo de dispositivo con overlays desde Airtable |
| `generarImagenesReparacionesMarcas.mjs` | Crea imagenes de guia de reparacion por marca |
| `generarImagenesReparacionesTipos.cjs` | Convierte plantillas por tipo de dispositivo a WebP optimizado |
| `generarImagenesBackgroundPasosReparacion.mjs` | Genera ilustraciones de pasos de reparacion con branding |
| `generarImagenesReseñas.mjs` | Crea imagenes de perfil para reseñas/testimonios desde Airtable |
| `CasosExito.mjs` | Descarga y optimiza imagenes antes/despues de casos de exito |
| `ExifLocal.mjs` | Inyecta metadatos EXIF (descripcion, coordenadas GPS) para SEO en Google Images |
| `scriptImagenesGoogle.mjs` | Obtiene y procesa imagenes externas de dispositivos |
| `sitemaps.mjs` | Genera sitemaps XML organizados por tipo de dispositivo y categoria |

Las ~15.000 imagenes generadas no estan en este repo — son output del pipeline, no codigo fuente.

## Configuracion Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar entorno
cp .env.example .env
# Añade tu API key de Airtable y base ID

# 3. Ejecutar pipeline de imagenes (requiere datos en Airtable)
node scripts/generarImagenesReparacionesModelos.mjs
node scripts/ExifLocal.mjs
node scripts/sitemaps.mjs

# 4. Servidor de desarrollo
npm run dev

# 5. Build de produccion
npm run build
```

## Resultados

| Metrica | Valor |
|---------|-------|
| Paginas generadas | 15.500+ |
| Keywords indexadas en Google | 1.800+ |
| Clics organicos mensuales (pico) | 2.000 |
| Crecimiento en Google Search Console | 0 → 2K clics en 12 meses |
| Resultado de negocio | Venta exitosa (sep 2025) |

## Licencia

Este proyecto se comparte como pieza de portfolio y referencia educativa. La estructura del codigo y los patrones de automatizacion estan disponibles para aprendizaje. Los activos de marca y contenido especifico del negocio pertenecen a sus respectivos propietarios.

## Let's Connect

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santifer)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hola@santifer.io)
