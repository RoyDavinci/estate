"use strict";
module.exports = {
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: null,
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    overrides: [
        {
            files: ['bin/*.js', 'lib/*.js'],
            excludedFiles: '*.test.js',
            rules: {
                quotes: ['error', 'single'],
            },
        },
    ],
    rules: {
        'newline-before-return': 'error',
        '@typescript-eslint/no-var-requires': 0,
        'import/no-import-module-exports': 'off',
        'no-var': 'error',
        semi: 'error',
        indent: ['error', 2, { SwitchCase: 1 }],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
};
