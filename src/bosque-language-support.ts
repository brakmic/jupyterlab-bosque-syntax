import { LanguageSupport } from '@codemirror/language';
import { bosqueLanguage } from './bosque-language';
import { bosqueHighlighting } from './bosque-highlighting';
import { parser } from './parser/bosque-parser';
import { linter, Diagnostic } from '@codemirror/lint';
import { bosqueOverlay } from './bosque-overlay';

/** A quick parse-tree logger. */
function logParseTree(docText: string) {
  const tree = parser.parse(docText);
  const cursor = tree.cursor();
  console.log('--- Bosque parse tree debug ---');
  const stack = [cursor.node];
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      continue;
    }
    const nodeText = docText.slice(node.from, node.to);
    if (node.type.isError) {
      console.log(`ERROR node [${node.from}..${node.to}] -> "${nodeText}"`);
    } else {
      console.log(
        `Node "${node.type.name}" [${node.from}..${node.to}] -> "${nodeText}"`
      );
    }
    for (let child = node.firstChild; child; child = child.nextSibling) {
      stack.push(child);
    }
  }
  console.log('--- End parse tree ---');
}

/** Linting to show parse errors, etc. */
const bosqueLinter = linter(view => {
  const diagnostics: Diagnostic[] = [];
  const text = view.state.doc.toString();
  try {
    // debug log
    logParseTree(text); // can be deactivated
    // parse
    const tree = parser.parse(text);
    const cursor = tree.cursor();
    do {
      if (cursor.type.isError) {
        diagnostics.push({
          from: cursor.from,
          to: cursor.to,
          severity: 'error',
          message: 'Syntax error',
          markClass: 'cm-error-underline'
        });
      }
    } while (cursor.next());
  } catch (err) {
    console.error('Parser error:', err);
  }
  return diagnostics;
});

export const bosqueLanguageSupport = new LanguageSupport(
  bosqueLanguage, // add Bosque language support
  [
    bosqueOverlay(), // load overlay colorizer
    bosqueLinter, // load linter
    bosqueHighlighting // load syntax highlighting
  ]
);
