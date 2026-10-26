import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 손님용 메뉴판은 menu-board/tv.html(빌드 때 public/menu-board로 복사)을 그대로 보여준다.
  async redirects() {
    return [{ source: "/menu", destination: "/menu-board/tv.html", permanent: false }];
  },
};

export default nextConfig;
