# Cornerstone Investment Partners Website

A simple, trustworthy static website for **rentwithcip.com** — list available rentals, help tenants pay rent, and make it easy to get in touch.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Intro, about us, trust highlights, main CTAs |
| Available Rentals | `rentals.html` | Property listings with photos and inquire buttons |
| Pay Rent | `pay-rent.html` | Link to Apartments.com payment portal |
| Contact | `contact.html` | Contact form and direct phone/email |

## Quick start (local preview)

```bash
cd cornerstone-investment-partners
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## What to customize first

### 1. Contact info and payment link — `js/site-config.js`

Update:

- `phone` and `email` — shown in the footer and on the contact page
- `payRentUrl` — your Apartments.com tenant payment portal URL
- `formspreeId` (optional) — [Formspree](https://formspree.io) form ID; leave empty to send submissions to `email` via [FormSubmit](https://formsubmit.co) (first submission triggers a one-time activation email)

### 2. Rental listings — `js/properties.js`

Each property is one object in the `PROPERTIES` array. To add a listing, copy an existing entry and change the fields. Set `active: false` to hide a unit without deleting it.

Fields:

- `address`, `location`, `beds`, `baths`, `rent`, `availableDate`, `description`
- `photos` — paths under `assets/properties/`
- `listingUrl` — optional Apartments.com listing link
- `applyUrl` — optional; if empty, “Inquire” links to the contact page with the address pre-filled

The sample listing uses placeholder address/rent — replace with real details.

### 3. Property photos — `assets/properties/`

Add images here and reference them in `js/properties.js`.

### 4. Branding — `assets/logos/`

Logos are already wired into the header and footer.

## Assets

| Folder | Use for |
|--------|---------|
| `assets/logos` | Company logo, favicon |
| `assets/properties` | Property photos |
| `assets/team` | Team headshots (future use) |
| `assets/general` | Site hero (`hero-rental.jpg`), misc. |

## Deploying

This site is static HTML/CSS/JS. Deploy to any static host, for example:

- **Netlify** or **Vercel** — connect the repo and publish the project root
- **GitHub Pages** — enable Pages on the default branch
- **Cloudflare Pages** — same as above

Point your domain **rentwithcip.com** to the host’s DNS instructions.

No build step is required.

## Structure

```
index.html          Home
rentals.html        Available rentals
pay-rent.html       Pay rent
contact.html        Contact
css/main.css        Styles
js/site-config.js   Phone, email, payment URL
js/properties.js    Rental listings (easy to update)
js/main.js          Header, footer, listings UI, form
assets/             Logos and photos
```
