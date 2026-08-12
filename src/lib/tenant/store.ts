import * as fileStore from "./store-file";
import * as dbStore from "./store-db";

/**
 * SELECTOR nguồn nội dung tenant — điểm "thay impl" duy nhất.
 * Có DATABASE_URL → Postgres (Neon, prod-instant); không → file JSON (local/dev/test).
 * Interface async giống hệt 2 bên nên mọi consumer (route, page, test) không đổi gì khác ngoài await.
 */
const impl = process.env.DATABASE_URL ? dbStore : fileStore;

export const getTenant = impl.getTenant;
export const listTenantSlugs = impl.listTenantSlugs;
export const createSite = impl.createSite;
