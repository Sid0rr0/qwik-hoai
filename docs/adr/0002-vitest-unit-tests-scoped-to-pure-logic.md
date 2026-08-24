# Vitest for unit tests, scoped to extracted pure logic

We're adopting Vitest as the test runner and starting with unit tests only, covering three pieces of pure logic extracted out of component/route closures for testability: the Builder.io → `IProjectList` transform (previously inlined in `useProjectData`'s `routeLoader$`), `ProjectList`'s `getColor`, and `Project`'s YouTube-ID regex parser. Component and E2E tests are explicitly deferred to a follow-up, even though the project's global testing policy calls for the full unit/integration/E2E pyramid at 80% coverage — this repo had zero test infrastructure before this change, and landing the complete pyramid in one pass risked stalling on setup instead of shipping any coverage.

## Considered Options

- **Jest** — rejected: Vitest reuses the project's existing Vite config (aliases, TS) with no parallel setup, and is what Qwik's own docs and `@builder.io/qwik/testing` are built around, which matters once component tests (a planned follow-up) are in scope.
- **Test through the loader/components, mocking `fetch` and rendering** — rejected: exercising the transform via `useProjectData` would require mocking `requestEvent.env` and `fetch` just to test a pure data reshape; extraction removes that machinery entirely.
- **Full unit + component + E2E pyramid now** — rejected for this pass, not abandoned: a much larger first slice on a codebase with no existing test infra.

## Consequences

- Extracting the transform also tightened the project-category field from a bare `string` to a `'art' | 'design'` union — see `CONTEXT.md` for the `Project Category` term this introduced.
- The 80% coverage floor (per global policy) is enforced only on the three extracted helper modules, not repo-wide — untested UI/routing code won't fail the gate until component/E2E tests land.
- This repo's first CI workflow (GitHub Actions, on PRs to `master`) runs `pnpm test`, `pnpm lint`, and `pnpm build.types` together, since none of those were automated anywhere before now.
- Follow-up work: component tests for `ProjectList`/`Project`/`Info`/`Navbar`, and a Playwright E2E flow, to close the gap with the global testing policy.
