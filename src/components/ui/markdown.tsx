
import React from 'react';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  // This is a simple implementation that handles basic markdown formatting
  // For a production app, you'd want to use a proper markdown library

  // Process content to handle basic markdown
  const processedContent = content
    // Handle bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle italics
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Handle lists
    .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
    // Handle headers
    .replace(/^###\s+(.*?)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*?)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*?)$/gm, '<h1>$1</h1>')
    // Handle paragraphs (add line breaks)
    .replace(/\n\n/g, '<br/><br/>');

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: processedContent }}
      className="prose prose-sm dark:prose-invert max-w-none"
    />
  );
};
