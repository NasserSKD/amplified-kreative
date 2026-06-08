# Deployment

The public URL contract uses clean, trailing-slash routes. HTML filenames are
implementation details and redirect to their canonical routes.

## Vercel preview

1. Import the Git repository into Vercel.
2. Select **Other** as the framework preset.
3. Leave the build command empty and use the repository root as the output.
4. Confirm clean routes, redirects, headers, and the custom 404 page.

`vercel.json` contains the preview routing and security headers.

## Host4Geeks / Apache production

1. Upload the repository contents to the domain document root.
2. Confirm Apache `mod_rewrite` and `mod_headers` are enabled.
3. Confirm `.htaccess` is uploaded and honored.
4. Point the domain to the hosting account and enable HTTPS.
5. Test every canonical route and its corresponding `.html` redirect.

## Formspree

Before launch, replace `YOUR_FORM_ID` in `contact.html` with the production
Formspree form ID. Until configured, the form directs visitors to
`info@amplified.com` and never reports a false successful submission.
