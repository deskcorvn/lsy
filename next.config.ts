import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Next 16 build workers can hang indefinitely on some Windows hosts.
    // Compile in-process so local `pnpm verify` and Vercel share a deterministic path.
    webpackBuildWorker: false,
  },
  images: {
    // Host phục vụ ảnh sản phẩm từ Medusa (/static).
    // Generator (M6) sẽ ghi host theo MEDUSA_URL của từng khách.
    remotePatterns: [
      { protocol: "https", hostname: "api.giftytech.com", pathname: "/static/**" },
      { protocol: "https", hostname: "api.giftyid.vn", pathname: "/static/**" },
      // EmbedWall: facade YouTube tự lấy thumbnail hqdefault (luôn tồn tại, maxres hay 404).
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
