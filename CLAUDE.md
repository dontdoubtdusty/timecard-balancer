# CLAUDE.md

The shared rules in `D:\My Documents\rpret\GitHub\CLAUDE.md` also apply; this file wins where they disagree.

## What this is
Timecard Balancer: a one-page browser tool that shows how many minutes over or under the weekly target the owner is,
and when to clock out (or how long a lunch to take) to land on it. Punches can be typed in or loaded from a Paycom Web
Time Sheet PDF. First built as a claude.ai artifact (https://claude.ai/artifact/M7xwZT8uvT25b8SZxSr1XT), moved here
2026-11-24.

## Run
Open `index.html` in a browser. No build step, no server, no packages. Data is saved in the browser's localStorage under
the key `timecard-balancer-v1`, so it stays per browser and per file location.

## Version
`<span class="ver">` in the `h1` of `index.html`. Rules in `claude/versioning.md`.

## Project rules
- Public repo: never commit real punch times, PTO or Paycom exports (no sample data in `SEED`, no PDFs in the repo).
- Internet is used only for Google Fonts and the pdf.js script (cdnjs) behind Load Paycom PDF; keep it that way.
- If the localStorage data shape changes, bump the key (`-v2`) and migrate the old data rather than dropping it.
