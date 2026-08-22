# Dropbox publication boundary

Dropbox is a source for reviewed material, not a public database.

## Approved flow

1. Select material in the approved Independent Observer feed folder.
2. Keep the original Dropbox files unchanged.
3. Create a public-safe duplicate or export with provenance and a review status.
4. Run the build and SEO audit.
5. Review links, images, copyright, personal information, and claims.
6. Publish only after the human review gate.

The integration must fail closed when the approved folder, metadata, or review status is missing. It must never publish lockbox contents, private booking information, credentials, refresh tokens, or arbitrary Dropbox folders.

If a future Dropbox API is added, credentials must be stored only in the hosting provider's encrypted environment variables. They must not be committed to GitHub or exposed to browser JavaScript.
