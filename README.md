# Things To Do in Provo, Utah

A high-performance, responsive directory website for exploring activities, attractions, restaurants, and entertainment in Provo, Utah.

## Features

- **Category Pages**: Browse activities by Nature, Culture, Entertainment, and Culinary
- **Detail Pages**: Comprehensive information for each activity
- **Winter Mode**: Filter to show only winter-accessible activities
- **Sunday Filter**: Show only activities open on Sundays
- **Dry Venue Badge**: Special indicator for alcohol-free venues
- **SEO Optimized**: JSON-LD schema markup and dynamic metadata
- **GitHub Pages Ready**: Configured for static site generation

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Data**: Local JSON file (`data/directory.json`)
- **Deployment**: Static Site Generation (SSG) for GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This will generate a static export in the `out/` directory, ready for GitHub Pages deployment.

## Data Structure

Activities are stored in `data/directory.json`. Each entry includes:

- `id`: Unique identifier (used in URLs)
- `name`: Activity name
- `category`: One of: `nature`, `culture`, `entertainment`, `culinary`
- `description`: Full description
- `location`: Address or location description
- `specs`: Object with activity-specific details (trail length, admission fees, hours, etc.)
- `seasonality`: Object with `best_seasons`, `winter_accessible`, and optional `winter_notes`
- `sunday_open`: Boolean indicating if open on Sundays
- `dry`: Boolean indicating if alcohol-free venue

## Deployment to GitHub Pages

1. Update the base URL in `app/sitemap.ts` and `app/robots.ts` with your GitHub Pages URL
2. Build the project: `npm run build`
3. The `out/` directory contains the static files
4. Configure GitHub Pages to serve from the `out/` directory

### GitHub Actions (Optional)

You can set up a GitHub Action to automatically build and deploy on push. The workflow would:
1. Checkout code
2. Install dependencies
3. Run `npm run build`
4. Deploy the `out/` directory to GitHub Pages

## Project Structure

```
├── app/
│   ├── [category]/
│   │   ├── [id]/
│   │   │   └── page.tsx      # Activity detail pages
│   │   └── page.tsx          # Category listing pages
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Home page
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ActivityCard.tsx
│   ├── FilterProvider.tsx
│   ├── Header.tsx
│   └── JsonLd.tsx
├── data/
│   └── directory.json        # Activity data
├── lib/
│   └── data.ts               # Data access functions
└── types/
    └── index.ts              # TypeScript types
```

## Customization

### Adding Activities

Edit `data/directory.json` and add new entries following the existing schema. The site will automatically generate pages for new activities.

### Updating Categories

Categories are defined in the TypeScript types. To add new categories:
1. Update the `Activity` type in `types/index.ts`
2. Add category display names in `lib/data.ts`
3. Update the home page category list

## License

MIT
