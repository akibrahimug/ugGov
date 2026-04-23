/**
 * Tiny helper to author Portable Text inline without the full block editor.
 * Accepts an array of paragraphs (strings) or heading tuples.
 */
export type BlockInput =
  | string
  | { h2: string }
  | { h3: string }
  | { list: string[] }
  | { quote: string };

/** Stable-enough non-cryptographic key — works in Node and the browser. */
function key() {
  return Math.random().toString(36).slice(2, 14);
}

export function pt(blocks: BlockInput[]) {
  return blocks.map((b) => {
    if (typeof b === 'string') {
      return {
        _type: 'block',
        _key: key(),
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: b, marks: [] }],
      };
    }
    if ('h2' in b) {
      return {
        _type: 'block',
        _key: key(),
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: b.h2, marks: [] }],
      };
    }
    if ('h3' in b) {
      return {
        _type: 'block',
        _key: key(),
        style: 'h3',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: b.h3, marks: [] }],
      };
    }
    if ('quote' in b) {
      return {
        _type: 'block',
        _key: key(),
        style: 'blockquote',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: b.quote, marks: [] }],
      };
    }
    return {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      listItem: 'bullet',
      level: 1,
      children: b.list.map((li) => ({ _type: 'span', _key: key(), text: li, marks: [] })),
    };
  });
}
