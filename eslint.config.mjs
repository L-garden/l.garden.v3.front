import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/display-name": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
  // 메뉴판은 손으로 쓴 정적 HTML·JS (빌드 때 public으로 복사)
  { ignores: [".next/**", "public/menu-board/**", "menu-board/**", "next-env.d.ts"] },
];

export default eslintConfig;
