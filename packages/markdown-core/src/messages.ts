import { z } from 'zod';
export const allowedCommands = [
  'insertTable',
  'insertImage',
  'insertMath',
  'insertDiagram',
  'copyAsHtml',
  'copyAsMarkdown',
  'showOutline',
  'setTheme',
] as const;
export type AllowedCommand = (typeof allowedCommands)[number];
export const webviewToExtensionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('ready'), instanceId: z.string().min(1).max(100) }),
  z.object({
    type: z.literal('document.update'),
    transactionId: z.string().min(1).max(100),
    documentVersion: z.number().int().nonnegative(),
    markdown: z.string().max(20_000_000),
  }),
  z.object({
    type: z.literal('command.execute'),
    command: z.enum(allowedCommands),
    payload: z.unknown().optional(),
    requestId: z.string().min(1).max(100).optional(),
  }),
  z.object({ type: z.literal('mode.set'), mode: z.enum(['visual', 'source']) }),
]);
export type WebviewToExtensionMessage = z.infer<typeof webviewToExtensionSchema>;
export type ExtensionToWebviewMessage =
  | { type: 'document.set'; markdown: string; version: number; transactionId?: string }
  | { type: 'document.ack'; transactionId: string; version: number }
  | { type: 'theme.set'; theme: string; vscodeTheme: 'light' | 'dark' | 'high-contrast' }
  | { type: 'command.run'; command: AllowedCommand; payload?: unknown }
  | { type: 'error'; message: string };
