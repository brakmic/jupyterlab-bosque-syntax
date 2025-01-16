import {
  EditorView,
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate
} from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';

/**
 * This map associates each literal Bosque keyword/modifier/control word
 * to the CSS class (base.css).
 *
 * The left side is the exact text in the Bosque code.
 * The right side is the matching .cm-* class that was defined in style/base.css.
 */
const BOSQUE_KEYWORDS_TO_CLASSES: Record<string, string> = {
  // -- Modifiers
  override: 'cm-bosque-annotation',
  public: 'cm-bosque-annotation',
  private: 'cm-bosque-annotation',
  abstract: 'cm-bosque-annotation',
  virtual: 'cm-bosque-annotation',
  recursive: 'cm-bosque-annotation',

  // -- Functions/methods
  method: 'cm-bosque-func',
  function: 'cm-bosque-func',
  field: 'cm-bosque-field',
  fn: 'cm-bosque-anon',
  pred: 'cm-bosque-anon',

  // -- Control keywords
  if: 'cm-bosque-ctrlkw',
  elif: 'cm-bosque-ctrlkw',
  else: 'cm-bosque-ctrlkw',
  return: 'cm-bosque-ctrlkw',

  // -- Declarations
  declare: 'cm-bosque-keyword',
  namespace: 'cm-bosque-keyword',
  concept: 'cm-bosque-keyword',
  entity: 'cm-bosque-keyword',
  provides: 'cm-bosque-keyword',
  let: 'cm-bosque-keyword',
  var: 'cm-bosque-keyword',

  // -- New checks
  invariant: 'cm-bosque-invariant',
  validate: 'cm-bosque-validation',
  test: 'cm-bosque-invariant',
  ensures: 'cm-bosque-invariant',

  // -- New special keywords
  this: 'cm-bosque-special',
  ref: 'cm-bosque-special',
  defer: 'cm-bosque-special',

  // -- Typedeclaration keyword
  typedecl: 'cm-bosque-typedecl'
};

/**
 * Build one big regex that matches ANY of the known words
 * from BOSQUE_KEYWORDS_TO_CLASSES as a separate word boundary.
 */
const BOSQUE_KEYWORDS_REGEX = new RegExp(
  '\\b(?:' + Object.keys(BOSQUE_KEYWORDS_TO_CLASSES).join('|') + ')\\b',
  'g'
);

/**
 * A "universal" overlay plugin that forcibly highlights all recognized
 * Bosque keywords from the grammar, according to base.css classes.
 * Even if the Lezer grammar lumps them, this overlay ensures each
 * keyword string is decorated independently.
 */
export function bosqueOverlay() {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      buildDecorations(view: EditorView): DecorationSet {
        const builder = new RangeSetBuilder<Decoration>();

        // For each visible range in the editor
        for (const { from, to } of view.visibleRanges) {
          // Get the text
          const text = view.state.doc.sliceString(from, to);
          // Reset the regex for each chunk
          BOSQUE_KEYWORDS_REGEX.lastIndex = 0;

          let match: RegExpExecArray | null;
          while ((match = BOSQUE_KEYWORDS_REGEX.exec(text)) !== null) {
            const start = from + match.index;
            const end = start + match[0].length;
            const word = match[0];
            // Look up the CSS class for this word
            const className = BOSQUE_KEYWORDS_TO_CLASSES[word];
            if (className) {
              builder.add(start, end, Decoration.mark({ class: className }));
            }
          }
        }

        return builder.finish();
      }
    },
    {
      decorations: v => v.decorations
    }
  );
}
