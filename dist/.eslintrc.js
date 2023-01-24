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
        project: './tsconfig.json',
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // for example, the rule below mean that this rule requires an empty line
        // before return statements to increase code clarity, except when the
        // return is alone inside a statement group (such as an if statement).
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
