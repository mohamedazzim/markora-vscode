declare module 'turndown' {
  export interface TurndownRule {
    filter: string[] | ((node: Element) => boolean);
    replacement: (content: string, node: Element) => string;
  }
  export default class TurndownService {
    constructor(options?: Record<string, unknown>);
    use(plugin: unknown): this;
    addRule(name: string, rule: TurndownRule): this;
    turndown(html: string): string;
  }
}
declare module 'turndown-plugin-gfm' {
  export const gfm: (service: unknown) => void;
}
