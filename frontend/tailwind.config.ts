import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{ink:'#17221E',cream:'#F7F6F0',sage:'#DDE7D7',pine:'#166534',amber:'#E09F3E',coral:'#E86A4A'},boxShadow:{soft:'0 8px 26px rgba(28,49,39,.08)'}}},plugins:[] } satisfies Config;
