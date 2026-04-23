/**
 * Minimal Portable Text renderer.
 * Handles normal paragraphs, h2/h3/h4, blockquotes, bulleted + numbered lists.
 * Swap for @portabletext/react if we need marks, images, or custom blocks.
 */
import type { ReactNode } from 'react';

type PTBlock = {
  _type: 'block';
  _key: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: Array<{ _type: 'span'; _key: string; text: string; marks?: string[] }>;
};

function renderChildren(block: PTBlock): ReactNode {
  return block.children?.map((c) => {
    const marks = c.marks ?? [];
    let node: ReactNode = c.text;
    if (marks.includes('strong')) node = <strong key={c._key}>{node}</strong>;
    if (marks.includes('em')) node = <em key={c._key}>{node}</em>;
    return <span key={c._key}>{node}</span>;
  });
}

export function PortableText({ blocks }: { blocks: unknown[] | undefined }) {
  if (!blocks || blocks.length === 0) return null;
  const typed = blocks as PTBlock[];

  const out: ReactNode[] = [];
  let listBuf: { kind: 'bullet' | 'number'; items: PTBlock[]; keyStart: string } | null = null;

  const flushList = () => {
    if (!listBuf) return;
    const Tag = listBuf.kind === 'number' ? 'ol' : 'ul';
    out.push(
      <Tag key={`list-${listBuf.keyStart}`} className="uggov-prose__list">
        {listBuf.items.map((b) => (
          <li key={b._key}>{renderChildren(b)}</li>
        ))}
      </Tag>,
    );
    listBuf = null;
  };

  for (const b of typed) {
    if (b._type !== 'block') continue;
    if (b.listItem) {
      if (!listBuf || listBuf.kind !== b.listItem) {
        flushList();
        listBuf = { kind: b.listItem, items: [], keyStart: b._key };
      }
      // Portable Text list items sometimes embed each span as a child;
      // our seed helper bundles several items into one block's children.
      if (b.children && b.children.length > 1) {
        for (const child of b.children) {
          listBuf.items.push({
            _type: 'block',
            _key: `${b._key}-${child._key}`,
            children: [child],
          });
        }
      } else {
        listBuf.items.push(b);
      }
      continue;
    }

    flushList();
    const style = b.style ?? 'normal';
    const key = b._key;
    if (style === 'h2') out.push(<h2 key={key}>{renderChildren(b)}</h2>);
    else if (style === 'h3') out.push(<h3 key={key}>{renderChildren(b)}</h3>);
    else if (style === 'h4') out.push(<h4 key={key}>{renderChildren(b)}</h4>);
    else if (style === 'blockquote')
      out.push(<blockquote key={key}>{renderChildren(b)}</blockquote>);
    else out.push(<p key={key}>{renderChildren(b)}</p>);
  }
  flushList();

  return <div className="uggov-prose">{out}</div>;
}
