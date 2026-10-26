# UniEats

UniEats is a mobile app prototype for university students who want company for a meal. You post a status such as "Looking to Eat" or "Eating Now" with a campus location, and friends see it in a feed.

The repo holds two apps: the Expo / React Native client at the root, and a small Next.js site in `webapp/` with the landing, support, and privacy pages. The web site is deployed at https://unieats-admin-five.vercel.app.

## Status

The mobile app is a UI prototype with no backend. Login and signup accept any input and store a local user in AsyncStorage. The feed, friend suggestions, universities, and campus locations are hard-coded mock data in the screen files. A new status is logged to the console and not saved, and "Add friend" only logs the user ID.

## Features

- Email login and signup screens, with the session kept in AsyncStorage across restarts
- Profile setup: pick a university from a list and choose a profile photo from the photo library
- Feed of "Looking to Eat" and "Eating Now" statuses with location, photo, description, and a Campus Mode badge, with pull to refresh
- Status creation with a location picker, optional meal photo, description, and a Campus Mode toggle; it asks for location permission on open
- Friend search that filters suggestions by name or username
- Bottom tab navigation between Feed, Friends, and Profile

## Tech stack

- Mobile: Expo SDK 53, React Native 0.79, React 19, TypeScript
- Navigation: React Navigation 7 (stack and bottom tabs)
- Device APIs: `expo-location`, `expo-image-picker`, AsyncStorage
- Web site: Next.js 15, React 19, Tailwind CSS 4

## Getting started

Prerequisites: Node.js 20 (the version CI uses) and npm. To run on a phone, install Expo Go; otherwise use an iOS simulator or Android emulator.

Mobile app, from the repo root:

```bash
npm install
npm start          # Expo dev server; scan the QR code with Expo Go
npm run ios        # or open directly in the iOS simulator
npm run android    # or in an Android emulator
```

Web site:

```bash
cd webapp
npm install
npm run dev        # http://localhost:3000
```

No environment variables are needed.

## Checks

There are no automated tests. CI (`.github/workflows/ci.yml`) runs these, and you can run them locally:

```bash
npx tsc --noEmit                              # type-check the mobile app
cd webapp && npm run lint && npm run build    # lint and build the web site
```

## How it works

- `index.ts` registers `App.tsx`, which reads `currentUser` from AsyncStorage. It shows the Login and Signup stack when there is no user and the main tabs when there is one.
- `src/screens/` has one file per screen. Mock data (`mockStatuses`, `mockUsers`, `mockFriendSuggestions`, `mockUniversities`, `mockLocations`) is declared at the top of the screen that uses it.
- `src/types/index.ts` defines `User`, `EatingStatus`, `Location`, and `University`. These shapes are where a real backend would plug in.
- `webapp/app/` uses the Next.js App Router, with `page.tsx`, `support/page.tsx`, and `privacy/page.tsx`.

## Project structure

```
App.tsx, index.ts     Expo entry point and navigation
app.json              Expo config (bundle IDs, permission strings)
src/screens/          Login, Signup, ProfileSetup, MainFeed, StatusCreate, FriendSearch, Profile
src/types/            Shared TypeScript types
assets/               App icon, adaptive icon, splash, favicon
webapp/               Next.js site: landing, support, privacy
```

## Contributing

Issues and pull requests are welcome. Before you open a PR, run the type-check, lint, and build commands under Checks.

## License

MIT. See [LICENSE](LICENSE).
