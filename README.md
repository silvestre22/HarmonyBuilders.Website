# Harmony Builders Sdn Bhd: Website

A single-page static website, ready for GitHub Pages. No build step is needed.

## Files
```
index.html            the whole site
assets/css/styles.css styles (brand colours are at the top as CSS variables)
assets/js/main.js     menu, filters, before/after slider, scroll animations
assets/img/           logo versions (cut out from the original), favicon
.nojekyll             tells GitHub Pages to serve files as they are
```

## Before publishing
1. **Contact Us.** Search `index.html` for `EDIT:` and `[` placeholders:
   address, phone/WhatsApp, email, business hours, map, footer contact details and SSM company number.
2. **Enquiry form.** GitHub Pages cannot process forms. Either put your email in
   `action="mailto:..."`, or sign up for a free form service (e.g. Formspree) and paste its URL into `action`.
3. **Map (optional).** Replace the `map-placeholder` box with a Google Maps embed `<iframe>`.
4. **Properties.** The three listings are samples. Replace their titles, locations, specs, prices and photos.
5. **Portfolio.** The gallery uses stock photos. Swap them for your own project photos when you have them.

## Images
Photos are free-to-use images from Unsplash (unsplash.com/license), linked directly from Unsplash's servers.
To use your own photo, put it in `assets/img/` and change the `src="..."` to `assets/img/your-photo.jpg`.
If an online photo ever fails to load, the site shows a navy panel in its place instead of a broken image.

## Publish to GitHub Pages
1. Create a repository and upload the **contents** of this folder (so `index.html` sits at the top level).
2. Repository **Settings → Pages → Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<your-username>.github.io/<repository-name>/` after a minute or two.
