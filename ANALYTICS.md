# Private website traffic dashboard

Production: https://www.maayanrabinovich.co.il/

The reports live in the authenticated Vercel project dashboard, not on a public
page of the website. No Vercel credentials or analytics data belong in this repo.

## Activation

1. Sign into Vercel and open team `maayan-4df2`, project `express-draco-cqxnpb8`.
2. Open **Analytics** and enable **Web Analytics** on the existing plan. Do not
   enable a paid add-on or upgrade a plan without the owner's authorization.
3. Merge the analytics integration into `main` after enabling the feature.
   Vercel must deploy again after activation to provision its collection routes.
4. Visit production with a browser that permits analytics, then check that the
   insights script and page-view request succeed. The dashboard may take time
   to display the first visits. Do not claim that collection is active until
   these checks pass.

## Coverage and privacy

`analytics.js` is included once on each content page, including both homepage
languages, all blog articles, and the accessibility pages. The old blog-preview
redirect does not count a visit; its destination blog page does.

The loader only runs on the two production domain names. Local development,
GitHub Pages, and Vercel preview URLs do not contribute to the production
statistics. Global Privacy Control and Do Not Track requests are respected.
The beforeSend hook removes query strings and fragments from page URLs.
No custom events, form values, names, phone numbers, or email addresses are
explicitly collected by this integration. Vercel provides aggregate traffic
statistics under its own published data practices.

Visitors using blockers, privacy preferences, or disabled JavaScript may not be
counted. Visitors and page views are estimates, not identities. No historical
traffic can be reconstructed from this integration before collection starts.

The built-in dashboard supports visitors, page views, popular pages, referrers,
device categories, and date filtering subject to the account's current plan.
Do not add a public share link or expose a Vercel API token in client-side code.
