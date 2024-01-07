/** @type {import('prettier').Config & import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
    endOfLine: 'lf',
    semi: false,
    useTabs: false,
    singleQuote: true,
    arrowParens: 'avoid',
    tabWidth: 2,
    trailingComma: 'none',
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^types$',
        '^@/types/(.*)$',
        '^@/config/(.*)$',
        '^@/lib/(.*)$',
        '^@/hooks/(.*)$',
        '^@/components/ui/(.*)$',
        '^@/components/(.*)$',
        '^@/registry/(.*)$',
        '^@/styles/(.*)$',
        '^@/app/(.*)$',
        '',
        '^[./]'
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}

export default config;
