# Independent Observer firewall proposal

This is a staged policy description, not a published Vercel rule. Action: LOG first.

## Common automated exploit probes

Match the exact request path, case-insensitively, against:

`/.env`, `/.env.local`, `/.env.production`, `/.git/config`, `/.git/HEAD`, `/wp-admin`, `/wp-login.php`, `/xmlrpc.php`, `/phpmyadmin`, `/vendor/phpunit`, `/server-status`, and clearly named backup/config paths such as `.bak`, `.old`, or `.zip` only when the complete path is an obvious configuration/archive probe.

Do not match path substrings. Exclude `/.well-known`, `/robots.txt`, `/sitemap.xml`, `/sitemap-index.xml`, feed routes, and static assets. Do not block Googlebot, Bingbot, social preview agents, accessibility tools, curl, Python, or headless clients solely from User-Agent text.

## Rate and bot posture

No global rate limit is proposed for this static public site. If future write/API endpoints are added, derive endpoint-specific LOG thresholds from observed traffic and protect them separately. No geography or generic VPN block is proposed.

## Human gate

The owner must inspect the native Vercel diff, test Preview, review matches, and publish. No native WAF draft was staged in this audit because Vercel CLI authentication was unavailable.
