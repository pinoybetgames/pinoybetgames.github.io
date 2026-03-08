# AGENTS.md - AI Agent Guidelines

Guidelines for AI coding agents working in this Astro 5.x + Tailwind CSS static website.

## Quick Reference

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Production build to ./dist/
npm run check    # Run all checks (astro + eslint + prettier)
npm run fix      # Auto-fix all issues
```

## Commands

| Command                  | Description                            |
| ------------------------ | -------------------------------------- |
| `npm run dev`            | Start development server               |
| `npm run build`          | Production build to ./dist/            |
| `npm run preview`        | Preview production build               |
| `npm run check`          | Run all checks (astro+eslint+prettier) |
| `npm run check:astro`    | TypeScript/Astro type checking         |
| `npm run check:eslint`   | ESLint only                            |
| `npm run check:prettier` | Prettier format check                  |
| `npm run fix`            | Auto-fix eslint + prettier             |

**Testing:** No test framework configured. If added (likely Vitest): `npx vitest run path/to/file.test.ts`

**Node versions:** ^18.17.1 || ^20.3.0 || >= 21.0.0

## Project Structure

```
src/
├── components/
│   ├── ui/           # Primitives (Button, Form, Headline, ItemGrid)
│   ├── widgets/      # Page sections (Hero, Features, FAQs, Stats)
│   ├── common/       # Shared utilities (Image, Metadata, Analytics)
│   └── blog/         # Blog-specific (List, Grid, SinglePost)
├── data/post/        # Blog posts (.md/.mdx files)
├── layouts/          # PageLayout, Layout, LandingLayout, MarkdownLayout
├── pages/            # Route pages (file-based routing)
├── utils/            # Utility functions (permalinks.ts, blog.ts)
├── config.yaml       # Site configuration
└── types.d.ts        # Shared TypeScript types
vendor/integration/   # Custom Astro integration (astrowind:config)
```

## Code Style

### Formatting (Prettier)

Print width: 120 | Semicolons: Required | Quotes: Single | Indentation: 2 spaces | Trailing commas: ES5

### Import Order

```typescript
// 1. External packages
import slugify from 'limax';
// 2. Virtual modules
import { SITE, APP_BLOG } from 'astrowind:config';
// 3. Internal imports (use ~/ alias)
import type { Hero as Props } from '~/types';
import Image from '~/components/common/Image.astro';
```

### TypeScript

- Strict null checks enabled | Path alias: `~/` maps to `src/`
- Shared types in `src/types.d.ts`
- Unused vars: Prefix with `_` (e.g., `_unusedParam`) | Non-null assertions allowed

### Naming Conventions

| Type             | Convention       | Example             |
| ---------------- | ---------------- | ------------------- |
| Components       | PascalCase       | `Hero.astro`        |
| Utility files    | camelCase        | `permalinks.ts`     |
| Functions        | camelCase        | `getPermalink()`    |
| Types/Interfaces | PascalCase       | `Post`, `MetaData`  |
| Config constants | UPPER_SNAKE_CASE | `SITE`, `BLOG_BASE` |

### Astro Component Pattern

```astro
---
import Image from '~/components/common/Image.astro';
import type { Hero as Props } from '~/types';

const {
  title = await Astro.slots.render('title'),
  subtitle = await Astro.slots.render('subtitle'),
  id,
  bg = await Astro.slots.render('bg'),
} = Astro.props;
---

<section class="relative" {...id ? { id } : {}}>
  {title && <h1 class="text-5xl font-bold" set:html={title} />}
</section>
```

### Widget Props

Widgets extend `Omit<Headline, 'classes'>, Widget` from `~/types`. Common props: `id`, `isDark`, `bg`, `classes`

### Error Handling

- Use optional chaining (`?.`) for potentially undefined values
- Provide default values in destructuring
- Prefer nullish coalescing (`??`) over logical OR (`||`)

### Tailwind CSS

- Use `twMerge()` from `tailwind-merge` when combining classes dynamically
- Dark mode: `class` strategy (`dark:` prefix)
- Button variants: `btn-primary`, `btn-secondary`, `btn-tertiary`

### Icons

Use `<Icon name="tabler:icon-name" class="w-5 h-5" />` from `astro-icon/components`.
Sets: `@iconify-json/tabler`, `@iconify-json/flat-color-icons`

### Blog Posts

Store in `src/data/post/` with frontmatter. Required: `title`, `publishDate`. Optional: `image`, `excerpt`, `tags`, `category`, `draft`, `author`

## ESLint Rules

- `no-mixed-spaces-and-tabs`: smart-tabs allowed
- `@typescript-eslint/no-unused-vars`: `_` prefix ignored, destructured arrays ignored
- `@typescript-eslint/no-non-null-assertion`: off (allowed)
- **Ignored:** `dist`, `node_modules`, `.github`, `types.generated.d.ts`, `.astro`

## Key Files

| File                      | Purpose                             |
| ------------------------- | ----------------------------------- |
| `astro.config.ts`         | Astro configuration + integrations  |
| `src/config.yaml`         | Site settings (name, SEO, blog)     |
| `src/types.d.ts`          | Shared TypeScript interfaces        |
| `src/utils/permalinks.ts` | URL generation utilities            |
| `vendor/integration/`     | Custom astrowind:config integration |

## URL Generation

```typescript
import { getPermalink, getBlogPermalink } from '~/utils/permalinks';

getPermalink('/about'); // Page link
getPermalink('my-post', 'post'); // Blog post link
getPermalink('tech', 'category'); // Category link
getBlogPermalink(); // Blog index
```

## Before Committing

```bash
npm run fix     # Auto-fix formatting/linting
npm run check   # Verify all checks pass
npm run build   # Ensure production build works
```

Always run these commands before committing to ensure code quality.
