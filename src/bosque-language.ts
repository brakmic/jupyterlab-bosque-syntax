import { parser } from './parser/bosque-parser';
import { LRLanguage } from '@codemirror/language';
import { styleTags, tags as t, Tag } from '@lezer/highlight';

export const functionKeywordTag = Tag.define();
export const methodKeywordTag = Tag.define();
export const anonFunctionTag = Tag.define();
export const invariantTag = Tag.define();
export const validationTag = Tag.define();
export const specialTag = Tag.define();
export const typeDeclarationTag = Tag.define();
export const fieldTag = Tag.define();

export const bosqueLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        // Modifiers
        publicKw: t.annotation,
        privateKw: t.annotation,
        abstractKw: t.annotation,
        virtualKw: t.annotation,
        recursiveKw: t.annotation,
        overrideKw: t.annotation,

        // Declaration tokens
        methodKw: methodKeywordTag,
        functionKw: functionKeywordTag,
        fnKw: anonFunctionTag,
        predKw: anonFunctionTag,
        typedeclKw: typeDeclarationTag,

        returnKw: t.controlKeyword,
        ifKw: t.controlKeyword,
        elifKw: t.controlKeyword,
        elseKw: t.controlKeyword,

        declareKw: t.keyword,
        namespaceKw: t.keyword,
        conceptKw: t.keyword,
        entityKw: t.keyword,
        providesKw: t.keyword,
        letKw: t.keyword,
        varKw: t.keyword,
        fieldKw: t.keyword,

        // Types
        TypeRef: t.typeName,
        typeName: t.typeName,
        ObjectCreation: t.typeName,

        // Identifiers
        identifier: t.variableName,

        // Literals, operators, etc.
        string: t.string,
        number: t.number,
        constant: t.atom,
        comment: t.comment,
        staticOp: t.operator,
        dotOp: t.operator,
        assignOp: t.operator,
        compareOp: t.operator,

        // Check keywords
        invariantKw: invariantTag,
        validateKw: validationTag,
        testKw: validationTag,
        ensuresKw: invariantTag,

        // Special keywords
        thisKw: specialTag,
        refKw: specialTag,
        deferKw: specialTag
      })
    ]
  })
});
