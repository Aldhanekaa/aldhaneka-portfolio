import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Gapcursor from '@tiptap/extension-gapcursor';
import Focus from '@tiptap/extension-focus';
import History from '@tiptap/extension-history';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Link from '@tiptap/extension-link';
import Code from '@tiptap/extension-code';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';

import Highlight from '@tiptap/extension-highlight';
import TypographyExtension from '@tiptap/extension-typography';
import UnderlineExtension from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// load all highlight.js languages
import { lowlight } from 'lowlight';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TiptapToolbar from './tiptapToolbar';
import { useEffect } from 'react';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);
let limit = 1000;

export const extensions = [
  HorizontalRule,

  Heading.configure({
    levels: [1, 2, 3, 4],
    HTMLAttributes: {
      class: 'tiptap-heading',
    },
  }),
  BulletList,
  ListItem,

  Blockquote,
  CharacterCount.configure({
    limit: limit,
  }),
  Document,
  Paragraph,
  Text,
  Image,
  Dropcursor,
  Gapcursor,

  TypographyExtension,
  UnderlineExtension,
  Code,

  Subscript,
  Superscript,

  Highlight,
  Link,

  History,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  HardBreak,
];
export default function TipTapEditor({
  setContent,
  content,
  isEditable = true,
}: {
  content?: JSONContent;
  isEditable: boolean;
  setContent?: (e: JSONContent) => void;
}) {
  const editor = useEditor({
    extensions: extensions,
    editable: isEditable,
    content: content
      ? content
      : `<p>Hello World! 🌎️</p>
    
    <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>`,
  });

  useEffect(() => {
    const editorText = editor?.getJSON();
    if (editorText) {
      if (setContent) setContent(editorText);
    }
  }, [editor?.getText()]);
  if (editor)
    return (
      <div
        className={`${
          isEditable == true && 'bg-brand-50 '
        } col-span-6 px-5 py-6 rounded-xl`}
      >
        {isEditable == true && <TiptapToolbar editor={editor} />}
        <EditorContent className="border-0 tiptap-renderer" editor={editor} />
        <div className="w-full flex justify-center">
          {editor.storage.characterCount.characters()}/{limit} characters
        </div>
      </div>
    );
  else return <div>Loading..</div>;
}
