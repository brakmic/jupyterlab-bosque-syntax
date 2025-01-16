import { LRParser } from '@lezer/lr';

declare module './bosque-parser' {
  export const parser: LRParser;
  export const ParseContext: any;
  export const SyntaxNode: any;
  export const TreeCursor: any;
}
