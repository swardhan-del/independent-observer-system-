import type { APIRoute, GetStaticPaths } from "astro";
import { publicDocumentItems } from "../../data/documents";
import { exportCitation } from "../../lib/citations";
export const getStaticPaths: GetStaticPaths = () =>
  publicDocumentItems.flatMap((record) =>
    (["bib", "ris"] as const).flatMap((format) => {
      const content = exportCitation(record, format);
      return content
        ? [{ params: { id: record.id, format }, props: { content, format, id: record.id } }]
        : [];
    }),
  );
export const GET: APIRoute = ({ props }) =>
  new Response(props.content, {
    headers: {
      "Content-Type":
        props.format === "bib"
          ? "application/x-bibtex; charset=utf-8"
          : "application/x-research-info-systems; charset=utf-8",
      "Content-Disposition": `attachment; filename="${props.id}.${props.format}"`,
    },
  });
