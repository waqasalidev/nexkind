import { memo, useState, useCallback } from 'react';
import { Check, Copy, ExternalLink, Code } from 'lucide-react';

/**
 * Parses inline formatting:
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Inline code: `code`
 * - Links: [label](url) or autolink https://...
 */
const renderInline = (text, keyPrefix = 'inline') => {
  if (!text) return null;

  // Tokenize regex:
  // 1. Link [label](url)
  // 2. Bare URL https?://...
  // 3. Inline code `code`
  // 4. Bold-Italic ***text***
  // 5. Bold **text** or __text__
  // 6. Italic *text* or _text_
  const tokenRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<]+[^<.,:;"')\]\s])|(`([^`]+)`)|(\*\*\*([^*]+)\*\*\*)|(\*\*([^*]+)\*\*|__([^_]+)__)|(\*([^*]+)\*|_([^_]+)_)/g;

  const elements = [];
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Plain text before token
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const [
      full,
      markdownLink, linkText, linkUrl,
      bareUrl,
      inlineCodeBlock, inlineCodeText,
      boldItalicBlock, boldItalicText,
      boldBlock, boldText1, boldText2,
      italicBlock, italicText1, italicText2,
    ] = match;

    if (markdownLink) {
      elements.push(
        <a
          key={`${keyPrefix}-link-${idx++}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-indigo-300 hover:text-indigo-200 underline underline-offset-2 font-medium break-all"
        >
          {linkText}
          <ExternalLink size={11} className="inline opacity-70 shrink-0" />
        </a>
      );
    } else if (bareUrl) {
      elements.push(
        <a
          key={`${keyPrefix}-url-${idx++}`}
          href={bareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-indigo-300 hover:text-indigo-200 underline underline-offset-2 break-all"
        >
          {bareUrl}
          <ExternalLink size={11} className="inline opacity-70 shrink-0" />
        </a>
      );
    } else if (inlineCodeBlock) {
      elements.push(
        <code
          key={`${keyPrefix}-code-${idx++}`}
          className="px-1.5 py-0.5 mx-0.5 text-[12px] font-mono bg-indigo-950/70 border border-indigo-500/30 text-amber-300 rounded"
        >
          {inlineCodeText}
        </code>
      );
    } else if (boldItalicBlock) {
      elements.push(
        <strong key={`${keyPrefix}-bi-${idx++}`} className="font-bold italic text-white">
          {boldItalicText}
        </strong>
      );
    } else if (boldBlock) {
      elements.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold text-white">
          {boldText1 || boldText2}
        </strong>
      );
    } else if (italicBlock) {
      elements.push(
        <em key={`${keyPrefix}-i-${idx++}`} className="italic text-slate-200">
          {italicText1 || italicText2}
        </em>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
};

const CodeBlock = memo(({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-slate-400">
          <Code size={13} className="text-indigo-400" />
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[13px] font-mono text-slate-200 leading-relaxed scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

/**
 * ChatMarkdown parses the full Markdown content into structured React blocks:
 * - Headings (#, ##, ###, ####)
 * - Code blocks (```lang ... ```)
 * - Bullet lists (*, -, +, •)
 * - Numbered lists (1., 2.)
 * - Blockquotes (>)
 * - Tables (| col | col |)
 * - Paragraphs
 */
const ChatMarkdown = memo(({ content = '', className = '' }) => {
  if (!content) return null;

  // Split content into lines
  const rawLines = content.split(/\r?\n/);
  const blocks = [];

  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];

    // 1. Check for fenced code blocks (``` or ~~~)
    const codeFenceMatch = line.match(/^```(\w*)/);
    if (codeFenceMatch) {
      const language = codeFenceMatch[1] || '';
      const codeLines = [];
      i++;
      while (i < rawLines.length && !rawLines[i].startsWith('```')) {
        codeLines.push(rawLines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n'),
      });
      continue;
    }

    // 2. Headings (# Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      blocks.push({
        type: 'heading',
        level,
        text,
      });
      i++;
      continue;
    }

    // 3. Blockquotes (> quote)
    if (line.match(/^>\s*(.*)$/)) {
      const quoteLines = [];
      while (i < rawLines.length && rawLines[i].match(/^>\s*(.*)$/)) {
        const m = rawLines[i].match(/^>\s*(.*)$/);
        quoteLines.push(m[1]);
        i++;
      }
      blocks.push({
        type: 'blockquote',
        text: quoteLines.join(' '),
      });
      continue;
    }

    // 4. Bullet lists (* item, - item, + item, • item)
    if (line.match(/^(\s*)[*+-•]\s+(.*)$/)) {
      const items = [];
      while (i < rawLines.length && rawLines[i].match(/^(\s*)[*+-•]\s+(.*)$/)) {
        const m = rawLines[i].match(/^(\s*)[*+-•]\s+(.*)$/);
        items.push({
          indent: m[1].length,
          text: m[2],
        });
        i++;
      }
      blocks.push({
        type: 'bulletList',
        items,
      });
      continue;
    }

    // 5. Numbered lists (1. item)
    if (line.match(/^(\s*)\d+\.\s+(.*)$/)) {
      const items = [];
      while (i < rawLines.length && rawLines[i].match(/^(\s*)\d+\.\s+(.*)$/)) {
        const m = rawLines[i].match(/^(\s*)\d+\.\s+(.*)$/);
        items.push({
          indent: m[1].length,
          text: m[2],
        });
        i++;
      }
      blocks.push({
        type: 'numberedList',
        items,
      });
      continue;
    }

    // 6. Horizontal rule (--- or ***)
    if (line.match(/^(\*{3,}|-{3,}|_{3,})$/)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 7. Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // 8. Regular paragraph text (group contiguous non-empty lines)
    const paragraphLines = [];
    while (
      i < rawLines.length &&
      rawLines[i].trim() &&
      !rawLines[i].match(/^```/) &&
      !rawLines[i].match(/^#{1,6}\s+/) &&
      !rawLines[i].match(/^>\s*/) &&
      !rawLines[i].match(/^(\s*)[*+-•]\s+/) &&
      !rawLines[i].match(/^(\s*)\d+\.\s+/) &&
      !rawLines[i].match(/^(\*{3,}|-{3,}|_{3,})$/)
    ) {
      paragraphLines.push(rawLines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: paragraphLines.join(' '),
      });
    }
  }

  return (
    <div className={`space-y-2.5 text-sm leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            const HeadingTag = block.level <= 2 ? 'h3' : block.level === 3 ? 'h4' : 'h5';
            const sizeClass =
              block.level === 1
                ? 'text-lg font-bold text-white mt-3 mb-1.5 pb-1 border-b border-white/10'
                : block.level === 2
                ? 'text-base font-bold text-white mt-3 mb-1.5'
                : block.level === 3
                ? 'text-sm font-bold text-indigo-200 mt-2.5 mb-1 tracking-wide'
                : 'text-sm font-semibold text-slate-200 mt-2 mb-1';
            return (
              <HeadingTag key={idx} className={sizeClass}>
                {renderInline(block.text, `h-${idx}`)}
              </HeadingTag>
            );
          }

          case 'code':
            return <CodeBlock key={idx} language={block.language} code={block.code} />;

          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className="my-2 pl-3 py-1 border-l-2 border-indigo-400 bg-white/5 rounded-r-lg text-slate-300 italic text-xs leading-relaxed"
              >
                {renderInline(block.text, `q-${idx}`)}
              </blockquote>
            );

          case 'bulletList':
            return (
              <ul key={idx} className="my-2 space-y-1.5 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span className="flex-1 leading-relaxed">
                      {renderInline(item.text, `bl-${idx}-${itemIdx}`)}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'numberedList':
            return (
              <ol key={idx} className="my-2 space-y-1.5 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-slate-200">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold text-[11px] shrink-0 mt-0.5">
                      {itemIdx + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">
                      {renderInline(item.text, `nl-${idx}-${itemIdx}`)}
                    </span>
                  </li>
                ))}
              </ol>
            );

          case 'hr':
            return <hr key={idx} className="my-3 border-white/10" />;

          case 'paragraph':
          default:
            return (
              <p key={idx} className="text-slate-100 leading-relaxed">
                {renderInline(block.text, `p-${idx}`)}
              </p>
            );
        }
      })}
    </div>
  );
});

ChatMarkdown.displayName = 'ChatMarkdown';

export default ChatMarkdown;
