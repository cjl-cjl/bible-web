# Testing bible-web

## Dev Server Setup

The app requires three environment variables to start:
```bash
VERSES_API=http://localhost:8080 USERS_API=http://localhost:8081 JWT_SECRET=<any-string-32chars+> bun run dev
```

The dev server runs on port 3000 by default (Next.js).

## Backend Dependencies

The app depends on two backend services:
- **verses-api** (Rust) — serves Bible verse data
- **users-api** (Go) — handles authentication and user profiles

Without these services running, most pages will return 500 errors.

## Pages Testable Without Backend

These pages render static UI and do not require API calls:
- `/login` — login form with labels, inputs, buttons, links
- `/signup` — signup form with 5 fields (name, username, email, password, confirm password)
- `/about` — placeholder page
- `/faq` — placeholder page  
- `/tips` — placeholder page

## Pages Requiring Backend

These pages include Header, Footer, and dynamic content that need the backend APIs:
- `/` (home) — lists available translations, includes Header + Footer
- `/[translation]` — lists books for a translation
- `/[translation]/[book]` — lists chapters for a book
- `/[translation]/[book]/[chapter]` — displays verses, copy drawer
- `/search` — search interface with results
- `/settings` — user profile settings form

## Key UI Components

- **Header** — includes LeftNavSheet (book navigation), SearchButton, ParallelButton, SettingsButton/AvatarButton. Only rendered on backend-dependent pages.
- **Footer** — navigation links (About, Blog, Resources, FAQ, Tips, Source). Only rendered on backend-dependent pages.
- **SettingsButton** — dropdown with theme toggle, login/signup links. Shown for unauthenticated users.
- **AvatarButton** — dropdown with theme toggle, font size, profile, settings, logout. Shown for authenticated users.

## Font Configuration

The app uses `Noto_Sans_SC` from Google Fonts with `subsets: ['latin', 'chinese-simplified']` for CJK character support. If localizing to another CJK language, the font and subsets would need to be updated accordingly.

## Lint & Build

```bash
bun run lint    # biome check
bun run test    # vitest
bun run build   # next build
```

## Chrome Setup on Devin VM

The `google-chrome` command is a CDP wrapper that requires Chrome to already be running. To start Chrome:
```bash
DISPLAY=:0 /opt/.devin/chrome/chrome/linux-133.0.6943.126/chrome-linux64/chrome --remote-debugging-port=29229 --no-first-run --disable-gpu --user-data-dir=/tmp/chrome-profile <URL>
```

After Chrome is running, `google-chrome <URL>` will open new tabs via CDP.
