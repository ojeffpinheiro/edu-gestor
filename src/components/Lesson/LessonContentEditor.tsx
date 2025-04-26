import React, { useState, useRef, useEffect } from 'react';

import {
  EditorContainer,
  EditorContent,
  EditorTextArea,
  TabHeader,
  Toolbar,
  ToolbarButton,
  ToolbarGroup
} from './styles'
import { TabButton } from '../../styles/buttons';

interface LessonContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const LessonContentEditor: React.FC<LessonContentEditorProps> = ({ content, onChange }) => {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [htmlContent, setHtmlContent] = useState(content || '');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = content;
    }
  }, [content]);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setHtmlContent(newContent);
    onChange(newContent);
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    updateContent();
    contentEditableRef.current?.focus();
  };

  const updateContent = () => {
    if (contentEditableRef.current) {
      onChange(contentEditableRef.current.innerHTML);
    }
  };

  const handleContentChange = () => {
    updateContent();
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const insertTable = () => {
    const rows = prompt('Enter number of rows:', '3');
    const cols = prompt('Enter number of columns:', '3');
    
    if (rows && cols) {
      let table = '<table border="1" cellpadding="5">';
      
      // Add header row
      table += '<tr>';
      for (let i = 0; i < parseInt(cols); i++) {
        table += `<th>Header ${i + 1}</th>`;
      }
      table += '</tr>';
      
      // Add data rows
      for (let i = 0; i < parseInt(rows); i++) {
        table += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          table += `<td>Cell ${i + 1},${j + 1}</td>`;
        }
        table += '</tr>';
      }
      
      table += '</table>';
      
      if (contentEditableRef.current) {
        document.execCommand('insertHTML', false, table);
        updateContent();
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:', 'http://');
    const text = prompt('Enter link text:', 'Link');
    
    if (url && text) {
      const link = `<a href="${url}" target="_blank">${text}</a>`;
      document.execCommand('insertHTML', false, link);
      updateContent();
    }
  };

  const insertCode = () => {
    const code = prompt('Enter code:');
    if (code) {
      const formattedCode = `<pre><code>${code}</code></pre>`;
      document.execCommand('insertHTML', false, formattedCode);
      updateContent();
    }
  };

  const clearFormatting = () => {
    document.execCommand('removeFormat', false, '');
    updateContent();
  };

  return (
    <EditorContainer>
      <TabHeader>
        <TabButton
          active={mode === 'visual'}
          onClick={() => {
            setMode('visual');
            if (contentEditableRef.current) {
              contentEditableRef.current.innerHTML = htmlContent;
            }
          }}
        >
          Visual
        </TabButton>
        <TabButton
          active={mode === 'html'}
          onClick={() => {
            setMode('html');
            if (contentEditableRef.current) {
              setHtmlContent(contentEditableRef.current.innerHTML);
            }
          }}
        >
          HTML
        </TabButton>
      </TabHeader>
      
      {mode === 'visual' && (
        <>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarButton title="Bold" onClick={() => execCommand('bold')}>
                <i className="fas fa-bold"></i>
              </ToolbarButton>
              <ToolbarButton title="Italic" onClick={() => execCommand('italic')}>
                <i className="fas fa-italic"></i>
              </ToolbarButton>
              <ToolbarButton title="Underline" onClick={() => execCommand('underline')}>
                <i className="fas fa-underline"></i>
              </ToolbarButton>
              <ToolbarButton title="Strike Through" onClick={() => execCommand('strikeThrough')}>
                <i className="fas fa-strikethrough"></i>
              </ToolbarButton>
            </ToolbarGroup>
            
            <ToolbarGroup>
              <ToolbarButton title="Heading 1" onClick={() => execCommand('formatBlock', 'h1')}>
                <i className="fas fa-heading"></i>1
              </ToolbarButton>
              <ToolbarButton title="Heading 2" onClick={() => execCommand('formatBlock', 'h2')}>
                <i className="fas fa-heading"></i>2
              </ToolbarButton>
              <ToolbarButton title="Heading 3" onClick={() => execCommand('formatBlock', 'h3')}>
                <i className="fas fa-heading"></i>3
              </ToolbarButton>
              <ToolbarButton title="Paragraph" onClick={() => execCommand('formatBlock', 'p')}>
                <i className="fas fa-paragraph"></i>
              </ToolbarButton>
            </ToolbarGroup>
            
            <ToolbarGroup>
              <ToolbarButton title="Unordered List" onClick={() => execCommand('insertUnorderedList')}>
                <i className="fas fa-list-ul"></i>
              </ToolbarButton>
              <ToolbarButton title="Ordered List" onClick={() => execCommand('insertOrderedList')}>
                <i className="fas fa-list-ol"></i>
              </ToolbarButton>
              <ToolbarButton title="Quote" onClick={() => execCommand('formatBlock', 'blockquote')}>
                <i className="fas fa-quote-right"></i>
              </ToolbarButton>
              <ToolbarButton title="Code" onClick={insertCode}>
                <i className="fas fa-code"></i>
              </ToolbarButton>
            </ToolbarGroup>
            
            <ToolbarGroup>
              <ToolbarButton title="Link" onClick={insertLink}>
                <i className="fas fa-link"></i>
              </ToolbarButton>
              <ToolbarButton title="Image" onClick={insertImage}>
                <i className="fas fa-image"></i>
              </ToolbarButton>
              <ToolbarButton title="Table" onClick={insertTable}>
                <i className="fas fa-table"></i>
              </ToolbarButton>
            </ToolbarGroup>
            
            <ToolbarGroup>
              <ToolbarButton title="Clear Formatting" onClick={clearFormatting}>
                <i className="fas fa-remove-format"></i>
              </ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
          
          <EditorContent
            ref={contentEditableRef}
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
          />
        </>
      )}
      
      {mode === 'html' && (
        <EditorTextArea
          value={htmlContent}
          onChange={handleHtmlChange}
          placeholder="Enter HTML code here..."
        />
      )}
    </EditorContainer>
  );
};