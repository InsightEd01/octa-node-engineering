import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  height = '400px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const formatBlock = (tag: string) => {
    execCommand('formatBlock', tag);
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="toolbar-btn"
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="toolbar-btn"
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="toolbar-btn"
            title="Underline"
          >
            <u>U</u>
          </button>
        </div>

        <div className="toolbar-group">
          <select
            onChange={(e) => formatBlock(e.target.value)}
            className="toolbar-select"
            defaultValue=""
          >
            <option value="">Format</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="p">Paragraph</option>
          </select>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="toolbar-btn"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="toolbar-btn"
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={insertLink}
            className="toolbar-btn"
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={insertImage}
            className="toolbar-btn"
            title="Insert Image"
          >
            🖼️ Image
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="toolbar-btn"
            title="Align Left"
          >
            ⬅️
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="toolbar-btn"
            title="Align Center"
          >
            ↔️
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="toolbar-btn"
            title="Align Right"
          >
            ➡️
          </button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="toolbar-btn"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="editor-content"
        style={{ minHeight: height }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default RichTextEditor;