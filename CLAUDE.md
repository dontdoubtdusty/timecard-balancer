# CLAUDE.md

The shared rules in `D:\My Documents\rpret\GitHub\CLAUDE.md` also apply; this file wins where they disagree.

## What this is
Timecard Balancer: a one-page browser tool that shows how many minutes over or under the weekly target the owner is,
and when to clock out (or how long a lunch to take) to land on it. Punches can be typed in or loaded from a Paycom Web
Time Sheet PDF. First built as a claude.ai artifact (https://claude.ai/artifact/M7xwZT8uvT25b8SZxSr1XT), moved here
2026-11-24.

## Run
Live at https://dontdoubtdusty.github.io/timecard-balancer/ (GitHub Pages from `main`, root), installable as a PWA
(progressive web app: a web page the phone installs like an app) via `manifest.webmanifest` and `sw.js`, same pattern as
the Big apps. Locally, open `index.html` in a browser (the service worker only registers over https). No build step, no
packages. Data is saved in the browser's localStorage under the key `timecard-balancer-v2`, per device and browser
(v1 data is migrated on first load: per-day PTO summed into the week's `pto`).

When any file listed in `sw.js` changes, bump `VERSION` in `sw.js` too, or installed copies keep serving old files.
The service worker precaches everything, so the installed app never needs the network.

## Version
`<span class="ver">` in the `h1` of `index.html`. Rules in `claude/versioning.md`.

## Project rules
- Public repo: never commit real punch times, PTO or Paycom exports (no sample data in `SEED`). The only PDF allowed is
  the fictional `samples/sample-timesheet.pdf`.
- Test PDF import against `samples/sample-timesheet.pdf` (made up, same layout and text order as a Paycom Web Time
  Sheet; regenerate from `samples/sample-timesheet.html`, command in its top comment). Expected: week of 11/22 gets
  10.50 h PTO (summary 4.20 + 6.30), Thu 11/26 is a holiday ($150.00 is not hours), Tue 11/24 loads In 08:00 / Out
  13:30 with No lunch, Mon and Fri load four punches.
- Fully offline: no internet requests at all. Fonts live in `fonts/` (OFL), pdf.js 3.11.174 in `vendor/pdfjs/`
  (Apache-2.0); add any new asset to the repo and to `APP_FILES` in `sw.js`, never a CDN link.
- Paycom PTO is a week lump (`week.pto`): the PDF lists it only in the pay-period summary, so `parsePaycom` places it
  by weekly total minus punched hours. Holidays (`day.holiday`) credit one day's share and ignore punches.
- If the localStorage data shape changes, bump the key (`-v2`) and migrate the old data rather than dropping it.
