import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import {
  functionKeywordTag,
  methodKeywordTag,
  anonFunctionTag,
  typeDeclarationTag,
  invariantTag,
  specialTag,
  validationTag,
  fieldTag
} from './bosque-language';

const bosqueHighlightStyle = HighlightStyle.define([
  {
    // methods + functions
    tag: [functionKeywordTag, methodKeywordTag],
    class: 'cm-bosque-func'
  },
  {
    // anonymous functions: fn + pred
    tag: anonFunctionTag,
    class: 'cm-bosque-anon'
  },
  {
    // fields
    tag: fieldTag,
    class: 'cm-bosque-field'
  },
  {
    // e.g. "override", "abstract", "public", etc.
    tag: t.annotation,
    class: 'cm-bosque-annotation'
  },
  {
    tag: t.variableName,
    class: 'cm-bosque-varname'
  },
  {
    tag: t.controlKeyword,
    class: 'cm-bosque-ctrlkw'
  },
  {
    tag: t.keyword,
    class: 'cm-bosque-keyword'
  },
  {
    tag: t.typeName,
    class: 'cm-bosque-typename'
  },
  {
    tag: t.comment,
    class: 'cm-bosque-comment'
  },
  {
    tag: t.string,
    class: 'cm-bosque-string'
  },
  {
    tag: t.number,
    class: 'cm-bosque-number'
  },
  {
    tag: t.atom,
    class: 'cm-bosque-atom'
  },
  {
    tag: t.operator,
    class: 'cm-bosque-operator'
  },
  {
    tag: specialTag,
    class: 'cm-bosque-special'
  },
  {
    tag: invariantTag,
    class: 'cm-bosque-invariant'
  },
  {
    tag: typeDeclarationTag,
    class: 'cm-bosque-typedecl'
  },
  {
    tag: validationTag,
    class: 'cm-bosque-validation'
  }
]);

export const bosqueHighlighting = syntaxHighlighting(bosqueHighlightStyle);
