# Content: how the website gets its events and artists

The **Google Sheet** is the source of truth. The website never reads it live: an import turns it into two
code files, `src/data/events.generated.ts` and `src/data/artists.generated.ts`, which are committed like any code.
Vercel builds from those files.

```
Team edits the Google Sheet  →  import (by hand or by GitHub)  →  generated files in git  →  Vercel
```

## Updating the site

**Automatic (recommended):** every morning GitHub runs the import. If the sheet changed, it opens a pull request
called *Content update from the sheet* with a Vercel preview. Look at the preview, press **Merge**, done.
Can't wait until tomorrow? GitHub → **Actions** → *Import content from sheet* → **Run workflow**.
If the sheet has a problem (unknown artist, missing flyer…) the run fails and GitHub emails you the reason.

**By hand:**
```bash
pnpm import-content      # downloads the sheet, checks it, writes the generated files
git diff src/data        # review
git commit -am "content: …" && git push
```

## Images

Images can't live in a spreadsheet, so they go into the repo:

| What | Where | Required |
|---|---|---|
| Flyer | `public/events/<event-id>/flyer.png` (or `.jpg`) | yes, or `video.mp4` instead. Until then keep the event on *Draft* |
| Main video | `public/events/<event-id>/video.mp4` | no |
| Footage | `public/events/<event-id>/footage/` (alphabetical order) | no |
| Artist photo | `public/images/artists/<file name from the sheet>` | no |

Team members with GitHub access can add them without you: on github.com open the folder → **Add file → Upload files**
→ **Create a new branch and start a pull request**.

## What the import checks (nothing is written if one fails)

- every Set artist exists on the Artists tab; ids are unique; dates are real; tags come from the Lists tab
- every published event has a flyer or main video
- nothing that is live disappears, unless you run `pnpm import-content --allow-removals`
- missing artist photos are only a warning

Other options: `--dry-run` (check only) · `pnpm import-content path/to/file.xlsx` (use a downloaded copy).

## Automatic updates: one-time GitHub setup

1. Repo → **Settings → Secrets and variables → Actions → New repository secret**:
   name `CONTENT_SHEET_ID`, value = the id from `.env.local`.
2. Repo → **Settings → Actions → General → Workflow permissions**: tick
   **Allow GitHub Actions to create and approve pull requests** → Save.
3. Test it: **Actions** → *Import content from sheet* → **Run workflow**.

The sheet must be shared as *Anyone with the link → Viewer* (that's how the import downloads it).
