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
  surface: string;
  toolbar: string;
  text: string;
  heading: string;
  muted: string;
  border: string;
  accent: string;
  link: string;
  code: string;
  codeText: string;
  selection: string;
  quote: string;
  tableHeader: string;
}

export const documentThemes: Record<Exclude<DocumentTheme, 'follow-vscode'>, ThemeTokens> = {
  'classic-white': {
    background: '#ffffff',
    surface: '#ffffff',
    toolbar: '#ffffff',
    text: '#2b2b2b',
    heading: '#202124',
    muted: '#687078',
    border: '#e5e7eb',
    accent: '#4183c4',
    link: '#4183c4',
    code: '#f6f8fa',
    codeText: '#24292f',
    selection: '#cfe8ff',
    quote: '#6b747b',
    tableHeader: '#f6f8fa',
  },
  paper: {
    background: '#fdfcf7',
    surface: '#fdfcf7',
    toolbar: '#fdfcf7',
    text: '#332c22',
    heading: '#2a231b',
    muted: '#5e584f',
    border: '#d8d6cc',
    accent: '#8c6239',
    link: '#8c6239',
    code: '#f6f4f0',
    codeText: '#332c22',
    selection: '#f3e4d5',
    quote: '#8c6239',
    tableHeader: '#f6f4f0',
  },
  academic: {
    background: '#fbfcfe',
    surface: '#fbfcfe',
    toolbar: '#fbfcfe',
    text: '#1f2a37',
    heading: '#17202b',
    muted: '#617083',
    border: '#d7dee8',
    accent: '#2368a2',
    link: '#2368a2',
    code: '#f0f4f8',
    codeText: '#1f2a37',
    selection: '#dbeafe',
    quote: '#4b6582',
    tableHeader: '#f0f4f8',
  },
  sepia: {
    background: '#fbf2e4',
    surface: '#fbf2e4',
    toolbar: '#fbf2e4',
    text: '#3c2f25',
    heading: '#2f241b',
    muted: '#766250',
    border: '#dfcdb6',
    accent: '#9a5c2e',
    link: '#9a5c2e',
    code: '#f3e4d0',
    codeText: '#3c2f25',
    selection: '#f0d6b5',
    quote: '#9a5c2e',
    tableHeader: '#f3e4d0',
  },
  graphite: {
    background: '#262a30',
    surface: '#262a30',
    toolbar: '#262a30',
    text: '#e5e7eb',
    heading: '#ffffff',
    muted: '#a6adb7',
    border: '#414852',
    accent: '#7dd3a7',
    link: '#7dd3a7',
    code: '#1b1f24',
    codeText: '#e5e7eb',
    selection: '#31553f',
    quote: '#91a3b0',
    tableHeader: '#1b1f24',
  },
  midnight: {
    background: '#121827',
    surface: '#121827',
    toolbar: '#121827',
    text: '#e5e7eb',
    heading: '#ffffff',
    muted: '#9ca9bf',
    border: '#2d3a55',
    accent: '#8ab4ff',
    link: '#8ab4ff',
    code: '#192238',
    codeText: '#e5e7eb',
    selection: '#253d68',
    quote: '#829ac2',
    tableHeader: '#192238',
  },
  'high-contrast': {
    background: '#000000',
    surface: '#000000',
    toolbar: '#000000',
    text: '#ffffff',
    heading: '#ffffff',
    muted: '#ffffff',
    border: '#ffffff',
    accent: '#00ff9a',
    link: '#00ffff',
    code: '#111111',
    codeText: '#ffffff',
    selection: '#264f78',
    quote: '#00ff9a',
    tableHeader: '#111111',
  },
};
