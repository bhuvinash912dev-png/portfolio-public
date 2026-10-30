# Portfolio (no contact details)

A copy of the portfolio with all contact information removed: no email, LinkedIn or other profile links,
and no Contact section. It has its own Sanity project, so its admin, photo and projects are separate
from the main portfolio.

Next.js 14 + Tailwind + Framer Motion. Your profile photo and projects are managed in **Sanity** (headless CMS)
through the admin panel at **`/studio`**. Everything else (bio, experience, stack, certifications, showcase)
lives in `src/data/site.ts`.

## 1. Run locally

Install Node.js 20 LTS from https://nodejs.org, then:

```powershell
npm install
npm run dev        # http://localhost:3001
```

## 2. The admin (Sanity, free)

`.env.local` points at this copy's own Sanity project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xrnfhq60
NEXT_PUBLIC_SANITY_DATASET=production
```

Open http://localhost:3001/studio and log in.

- **Profile**: upload your photo. Click the crop icon on the image to crop it, and drag the focus
  circle onto your face; the hero and navbar centre on that point. Without a photo here, `public/photo.png` is used.
- **Projects**: add, edit, reorder (with the `order` field) or delete projects. Each takes a title,
  description, several screenshots (the first is the cover; each can be cropped and given a focus point),
  stack tags and a live URL.

Changes show up on the site within about 60 seconds, with no redeploy needed.

CORS origins (Sanity → API → CORS origins, with **Allow credentials**) must include every address the
Studio is opened from: `http://localhost:3001` is set up; add your Vercel URL after deploying.

## 3. Deploy to Vercel

1. Push this folder to its own GitHub repository.
2. Go to https://vercel.com/new, import the repo, and keep the framework preset as **Next.js**.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SANITY_PROJECT_ID=xrnfhq60` and `NEXT_PUBLIC_SANITY_DATASET=production`.
4. Deploy, then add the Vercel URL to Sanity's CORS origins.
