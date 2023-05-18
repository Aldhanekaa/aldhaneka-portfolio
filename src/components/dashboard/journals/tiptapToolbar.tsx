import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export default function TiptapToolbar({ editor }: { editor: Editor }) {
  const addImage = useCallback(() => {
    console.log('oi');
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  return (
    <div className=" mb-8 w-full flex flex-wrap bg-brand-100">
      <button
        type="button"
        onClick={addImage}
        className="bg-brand-400 text-brand-500 px-3 py-2"
      >
        Add Image
      </button>
    </div>
  );
}
