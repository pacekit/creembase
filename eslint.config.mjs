import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".source/**"]),
    {
        rules: {
            "react/no-unescaped-entities": "off",
            "@next/next/no-img-element": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
]);

export default eslintConfig;
