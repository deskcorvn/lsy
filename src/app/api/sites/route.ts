import { NextResponse } from "next/server";
import { BuilderInputSchema, buildSiteFromBrief } from "@/lib/tenant/builder";
import { createSite, getTenant } from "@/lib/tenant/store";

/**
 * POST /api/sites — "bấm form → tạo site".
 * Body = brief tối thiểu → Zod validate → bung SiteModel → ghi store → trả URL /s/<slug>.
 * Bản này dùng file-store (local). Prod: thay createSite/getTenant bằng DB-store, route giữ nguyên.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON không hợp lệ" }, { status: 400 });
  }

  const parsed = BuilderInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu chưa hợp lệ", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const site = buildSiteFromBrief(parsed.data);
  if (await getTenant(site.slug)) {
    return NextResponse.json(
      { error: `Đã có site với tên '${site.slug}'. Hãy đổi tên thương hiệu hoặc nhập domain khác.` },
      { status: 409 },
    );
  }

  await createSite(site);
  return NextResponse.json({ slug: site.slug, url: `/s/${site.slug}` }, { status: 201 });
}
