# Bar Book

A bar book of 21 popular party cocktails (Hungarian UI). It's a static React site with a list-and-detail layout, instant search (press `/`, step with ↑/↓), style and spirit filters, step-by-step recipes, a 1×/2×/4×/8× batch multiplier, metric measures (cl, switching to dl for larger amounts), and one-click recipe copying.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · [Radix Primitives](https://www.radix-ui.com/primitives) (Dialog, ToggleGroup, Tooltip) · lucide-react icons

## Local development

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + static bundle in dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  data/
    types.ts         # Cocktail, Ingredient, Category, BaseSpirit… types
    cocktails.ts     # all recipes, spirit profiles, and bar tips (edit here)
  lib/
    recipe.ts        # scaling, cl/dl formatting, search, copy-as-text
  hooks/
    useHashRoute.ts  # tiny hash router (#/recipe/<id>)
  components/
    ui/              # Button, IconButton, TogglePills + ChipGroup (Radix ToggleGroup), Tooltip (Radix)
    Header, FilterBar, CocktailCard (list row), RecipeDetail, BarGuide (Radix Dialog), Footer
```

### Adding a cocktail

The UI and all recipe text are in Hungarian. Method steps are structured `{ action, detail }` objects: each `action` (see `StepAction` in `src/data/types.ts`) renders as a pictogram from `src/components/StepIcon.tsx` with its caption from `src/data/steps.ts`; `detail` is a few words of specifics.

Append an object to `cocktails` in [`src/data/cocktails.ts`](src/data/cocktails.ts). TypeScript checks every field. Store liquid amounts in `cl`; the UI handles scaling and shows anything from 10 cl up in dl. Count units (`dash`, `leaf`, `barspoon`…) scale but are never converted. The `id` becomes the recipe's shareable URL: `#/recipe/<id>`.

```ts
{
  id: 'tommys-margarita',
  name: "Tommy's Margarita",
  category: 'Sour',
  baseSpirit: 'Tequila és mezcal',
  glassware: 'Tumbler',
  ingredients: [
    { amount: 6, unit: 'cl', name: 'Blanco tequila' },
    { amount: 3, unit: 'cl', name: 'Lime-lé', note: 'frissen facsart' },
    { amount: 1.5, unit: 'cl', name: 'Agávészirup' },
  ],
  instructions: [
    { action: 'shake', detail: 'jéggel, 10 mp' },
    { action: 'strain', detail: 'friss jégre' },
  ],
  // …tagline, ice, garnish, strength, abv, tastingNotes, flavorTags, bartenderTip, color
}
```

## Deploying to GitHub Pages

The site works under any subpath (e.g. `https://<user>.github.io/bar/`) without configuration:

- **Relative asset paths.** `vite.config.ts` sets `base: './'`, so the built `index.html` references `./assets/…`.
- **Hash routing.** Recipe deep links look like `/bar/#/recipe/negroni`. The server only ever sees `/bar/`, so refreshing or sharing a link never 404s.
- **`.nojekyll`** in `public/` stops GitHub's Jekyll step from touching the bundle.

If you ever need an absolute base, build with `BASE_PATH=/bar/ npm run build`.

### Option A: GitHub Actions (recommended)

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on every push to `main`.

1. Push this repo to GitHub.
2. Open **Settings → Pages**, and under **Build and deployment → Source** choose **GitHub Actions**.
3. Push to `main`, or run the workflow manually from the **Actions** tab.
4. The site goes live at `https://<user>.github.io/<repo>/`.

### Option B: `gh-pages` branch (manual)

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist --dotfiles    # --dotfiles keeps .nojekyll
```

Then set **Settings → Pages → Source** to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.

## Notes

- Fonts (Fraunces and Inter) load from Google Fonts; the site falls back to system serif and sans-serif fonts offline.
- ABV figures are rough estimates for the finished, diluted drink. Please drink responsibly.

## License

See [LICENSE](LICENSE).
