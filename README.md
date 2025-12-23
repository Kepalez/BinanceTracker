# Binance Tracker - Frontend Assessment

A high-performance, responsive cryptocurrency dashboard built to track real-time market data. This project demonstrates a modern frontend architecture using Next.js 16, Tailwind CSS 4, and TypeScript, focusing on code quality, user experience, and maintainability.

## Live Demo
https://binance-tracker-theta.vercel.app/

## Architecture & Tech Stack

This project leverages the latest features of the React ecosystem to ensure speed and developer experience.

- **Core Framework:** Next.js 16. Selected for its server-side capabilities, simplified routing, and built-in API proxying to handle CORS issues securely.
- **Styling Engine:** Tailwind CSS 4. Utilized for zero-runtime styling overhead and rapid UI development. Includes a robust Dark Mode implementation via CSS variables.
- **State & Data:** Custom Hooks with native fetch and React Context for global UI state.
- **Visualization:** Recharts. Chosen for its composable API and lightweight SVG rendering for historical price charts.
- **Testing:** Vitest + React Testing Library. A modern, fast testing suite configured with JSDOM to ensure component reliability.
- **Internationalization:** A lightweight, type-safe dictionary approach for English/Spanish support without heavy external libraries.


## AI Usage & Transparency

AI tools were utilized as productivity accelerators in the following areas:

- **Testing Infrastructure:** Assisted in configuring the Vitest + JSDOM environment, specifically mocking browser APIs like window.matchMedia and localStorage to ensure test stability.
- **Type Definitions:** Used to generate accurate TypeScript interfaces from raw API JSON responses, reducing manual errors.
- **Visual Debugging:** Helped diagnose and resolve a flickering issue during Dark Mode transitions by identifying conflicts between global CSS transitions and component-level states.
- **Boilerplate:** Generated the initial setup for Tailwind v4 and the ThemeProvider context structure.

All AI-generated code was reviewed, refactored, and integrated into the custom architecture.

## Design Decisions

### Master-Detail Layout for desktop vs. Modal for mobile
Instead of a simple page navigation, a Master-Detail pattern was implemented.
- **Desktop:** The details panel remains fixed on the right side, allowing analysts to scan the list while maintaining context of the selected asset.
- **Mobile:** The interface adapts to a touch-friendly Modal/Bottom Sheet to maximize screen real estate.

### Dark Mode First
Given the context of trading applications, a dark mode was implemented. Global CSS transitions were removed to ensure an instant, professional theme switch without visual artifacts.

### Performance & Caching
- **API Proxy:** Direct calls to Binance are blocked by CORS in browsers. An internal proxy was implemented.
- **ISR/Caching:** The Next.js API route uses revalidation strategies to cache responses for 30 seconds, preventing rate-limiting from the upstream API while keeping data relatively fresh.

## Challenges & Trade-offs

### CORS Restrictions
The Binance public API blocks direct requests from the browser.
- **Solution:** Implemented a Next.js API Route acting as a proxy. This hides the upstream URL and allows for server-side caching.

### Real-Time Data Strategy
- **Challenge:** Keeping prices updated without overloading the client.
- **Decision:** A controlled Polling model using useEffect was chosen for this MVP.
- **Trade-off:** While effective, it creates unnecessary network traffic compared to a socket connection.

### Deployment Specifics
During deployment, two environment-specific issues were addressed:

- API Geo-blocking: Vercel's default US region is blocked by the main Binance API. The endpoint was switched to data-api.binance.vision to ensure global access reliability.

- Case Sensitivity: A file naming mismatch (Logo.png vs logo.png) caused 404 errors on Vercel's Linux environment despite working locally. This reinforces the importance of strict casing conventions in imports.

## Scalability & Future Improvements

To scale this application for a production environment with thousands of users, the following improvements would be implemented:

- **State Management:** Migrate from native fetch/useEffect to TanStack Query. This would handle background refetching, caching, and request deduplication automatically.
- **Real-Time Data:** Replace polling with WebSockets to provide sub-second updates and visual ticks on price changes.
- **List Virtualization:** Implement react-window or react-virtuoso to render only the visible items in the DOM, allowing the asset list to scale to thousands of items without performance degradation.
- **E2E Testing:** Add Playwright or Cypress to automate full user flows in real browser environments.

## Cloud Infrastructure (AWS)

In the case of deploying this project to AWS, the arquitecture would require the following services for best practices:

1. **AWS Amplify:** For hosting the Next.js application, managing CI/CD pipelines, and handling SSR/API routes automatically.
2.  **Amazon CloudFront:** As a CDN to cache static assets and API responses at the edge, reducing latency for global users.
3. **AWS Lambda:** To run the API proxy routes serverlessly, allowing for automatic scaling during traffic spikes.
4. **Amazon ElastiCache:** To cache Binance API responses. This would act as a buffer between the user base and Binance, preventing rate-limiting by serving frequent requests from the cache.

## Running the project locally
1. Install all dependencies

````bash
npm install
````
2. Run on dev mode, this should open a server on localhost:3000 by default.

````bash
npm run dev
````
That's it, I hope you enjoy the interface.

## Running Tests

Unit and integration tests are executed using Vitest:

````bash
npm run test
````

## Contact me
This project was made by Kevin Demian Pacheco González, if you have questions or any comment, contact me through my email: kpachecoglz@gmail.com
