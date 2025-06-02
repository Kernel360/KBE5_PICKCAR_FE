import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // 기존 브라우저 전역 변수
        kakao: 'readonly' // 'kakao'를 전역 변수로 추가 (애플리케이션 코드용)
      }
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },
  // .d.ts 파일에 대한 설정
  {
    files: ['**/*.d.ts'], // 프로젝트 내의 모든 .d.ts 파일 대상
    rules: {
      '@typescript-eslint/no-unused-vars': 'off' // .d.ts 파일에서는 이 규칙을 적용하지 않음
      // 필요에 따라 .d.ts 파일에 대해 비활성화할 다른 규칙들을 여기에 추가할 수 있습니다.
    }
  }
)
