# AQA Physics Lab

An interactive web app for the twelve **AQA A-level Physics required practicals**. Each practical comes with a virtual apparatus simulator, a tabbed worksheet (aim & theory, method, safety, results, analysis, conclusion, uncertainty), a graph builder with error bars, KaTeX-rendered equations, and PDF export of the completed write-up.

Built with React 19, TypeScript and Vite. Auth and per-user progress are powered by Supabase.

---

## Features

- **12 practical simulators** — interactive bench animations for each required practical:
  1. Stationary Waves
  2. Young's Double Slit & Diffraction Grating
  3. Determination of *g* by Free Fall
  4. Young Modulus
  5. Resistivity of a Wire
  6. EMF and Internal Resistance
  7. Simple Harmonic Motion
  8. Gas Laws
  9. Capacitor Charge and Discharge
  10. Force on a Current-Carrying Wire
  11. Magnetic Flux Density
  12. Inverse Square Law for Gamma Radiation
- **Structured worksheet** for every practical: Aim & Theory, Apparatus checklist, Method, Safety, Results table, Graph, Analysis, Uncertainty, Conclusion.
- **Graph builder** with Chart.js, line of best fit, and error bars.
- **Equations** rendered with KaTeX, including variable/unit tables.
- **Exam mode** with a timer and a locked layout, plus a "start exam" modal.
- **PDF export** of the full exam write-up via jsPDF.
- **Authentication & roles** via Supabase — separate dashboards for `admin`, `teacher`, `tutor` and `student`.
- **Progress persistence** through `useProgress` / `useLocalStorage` hooks.

## Tech stack

| Area            | Library                                     |
| --------------- | ------------------------------------------- |
| Framework       | React 19 + TypeScript                       |
| Build / dev     | Vite 8                                      |
| Routing         | react-router-dom 7                          |
| Auth & storage  | @supabase/supabase-js                       |
| Charts          | chart.js + react-chartjs-2                  |
| Equations       | katex                                       |
| PDF             | jspdf                                       |
| Icons           | lucide-react                                |
| Linting         | eslint + typescript-eslint                  |

## Getting started

### Prerequisites

- Node.js 20+
- A Supabase project (URL + anon key) if you want auth to work end-to-end

### Install

```bash
npm install
```

### Environment

Create a `.env.local` in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are consumed by [src/supabaseClient.ts](src/supabaseClient.ts).

### Run

```bash
npm run dev       # start the dev server with HMR
npm run build     # type-check and produce a production build
npm run preview   # preview the production build locally
npm run lint      # run eslint
npm run share     # build + preview in one step
```

## Project structure

```
src/
  App.tsx                    # routes (public, protected, role-gated)
  main.tsx                   # entry point
  supabaseClient.ts          # Supabase client setup
  config/
    practicals.ts            # all 12 practical definitions (aim, theory, apparatus, equations, method, ...)
    types.ts                 # PracticalConfig and related types
  components/
    home/                    # HomeScreen and PracticalCard grid
    lab/                     # LabPage, LabBench, ApparatusSVG, P1–P12 simulators, ExamStartModal, PracticalTimer
    worksheet/               # Worksheet shell + tabs (AimTheory, Method, Safety, ApparatusChecklist,
                             #                         ResultsTable, Analysis, Uncertainty, Conclusion)
    graph/                   # GraphBuilder + custom error-bars plugin
    auth/                    # ProtectedRoute, DashboardShell, RoleBadge, UserManagement
    shared/                  # Badge, LatexEq
  pages/auth/                # LoginPage, RegisterPage, UnauthorizedPage, role dashboards
  context/AuthContext.tsx    # auth state, role + session
  hooks/                     # useLocalStorage, useProgress, useExamMode, useRole
  utils/examPdfExport.ts     # PDF generation
  styles/, assets/, index.css
```

## Routes

| Path                    | Access                                  |
| ----------------------- | --------------------------------------- |
| `/login`, `/register`   | Public                                  |
| `/`                     | Any signed-in user — practical grid     |
| `/lab/:id`              | Any signed-in user — practical workspace |
| `/admin/dashboard`      | `admin`                                 |
| `/teacher/dashboard`    | `admin`, `teacher`                      |
| `/tutor/dashboard`      | `admin`, `teacher`, `tutor`             |
| `/student/dashboard`    | `admin`, `teacher`, `tutor`, `student`  |

See [src/App.tsx](src/App.tsx) for the full route table and [src/components/auth/ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx) for the role gate.

## Adding a new practical

1. Append a new `PracticalConfig` object to [src/config/practicals.ts](src/config/practicals.ts) following the `PracticalConfig` shape in [src/config/types.ts](src/config/types.ts) (aim, theory, equations, apparatus, method steps, safety, sub-experiments).
2. Create a `P{n}Simulator.tsx` in [src/components/lab/](src/components/lab/) that drives the bench animation and emits readings into the worksheet.
3. Wire it up inside [src/components/lab/LabPage.tsx](src/components/lab/LabPage.tsx) so the right simulator renders for that practical id.

## License

Private / unpublished. All rights reserved.
