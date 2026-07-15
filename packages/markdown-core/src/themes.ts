export type DocumentTheme =
  | 'follow-vscode'
  | 'classic-white'
  | 'paper'
  | 'academic'
  | 'sepia'
  | 'graphite'
  | 'midnight'
  | 'high-contrast';
export interface ThemeTokens {
  background: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  code: string;
  selection: string;
  quote: string;
}
export const documentThemes: Record<Exclude<DocumentTheme, 'follow-vscode'>, ThemeTokens> = {
  'classic-white': {
    background: '#ffffff',
    text: '#25282b',
    muted: '#687078',
    border: '#dfe3e6',
    accent: '#1f7a4d',
    code: '#f5f7f8',
    selection: '#d9eee2',
    quote: '#6b747b',
  },
  paper: {
    background: '#fdfcf7',
    text: '#332c22',
    muted: '#5e584f',
    border: '#d8d6cc',
    accent: '#8c6239',
    code: '#f6f4f0',
    selection: '#f3e4d5',
    quote: '#8c6239',
  },
  academic: {
    background: '#fbfcfe',
    text: '#1f2a37',
    muted: '#617083',
    border: '#d7dee8',
    accent: '#2368a2',
    code: '#f0f4f8',
    selection: '#dbeafe',
    quote: '#4b6582',
  },
  sepia: {
    background: '#fbf2e4',
    text: '#3c2f25',
    muted: '#766250',
    border: '#dfcdb6',
    accent: '#9a5c2e',
    code: '#f3e4d0',
    selection: '#f0d6b5',
    quote: '#9a5c2e',
  },
  graphite: {
    background: '#262a30',
    text: '#e5e7eb',
    muted: '#a6adb7',
    border: '#414852',
    accent: '#7dd3a7',
    code: '#1b1f24',
    selection: '#31553f',
    quote: '#91a3b0',
  },
  midnight: {
    background: '#121827',
    text: '#e5e7eb',
    muted: '#9ca9bf',
    border: '#2d3a55',
    accent: '#8ab4ff',
    code: '#192238',
    selection: '#253d68',
    quote: '#829ac2',
  },
  'high-contrast': {
    background: '#000000',
    text: '#ffffff',
    muted: '#ffffff',
    border: '#ffffff',
    accent: '#00ff9a',
    code: '#111111',
    selection: '#264f78',
    quote: '#00ff9a',
  },
};
