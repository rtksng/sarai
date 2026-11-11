import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * BlurText — after React Bits (https://reactbits.dev/text-animations/blur-text),
 * MIT + Commons Clause.
 *
 * Adapted for a server-rendered hero: the word-by-word blur reveal runs on CSS
 * keyframes (see `.blur-word` in globals.css), so it starts with the first
 * paint instead of waiting for hydration — better LCP, no JavaScript needed.
 * The full sentence is exposed once to assistive tech; the animated words are
 * hidden from it. Reduced motion shows the text immediately.
 */
type BlurTextProps = {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** A phrase within `text` that should never wrap on large screens. */
  keepTogether?: string;
  /** Delay before the first word, in ms. */
  startDelay?: number;
  /** Stagger between words, in ms. */
  step?: number;
  /** Decorative element animated in after the last word. */
  trailing?: ReactNode;
};

function findPhrase(words: string[], phrase?: string): [number, number] {
  if (!phrase) return [-1, -1];
  const target = phrase.split(" ");
  for (let i = 0; i + target.length <= words.length; i++) {
    if (target.every((w, j) => words[i + j] === w)) return [i, i + target.length - 1];
  }
  return [-1, -1];
}

export function BlurText({
  text,
  as: Tag = "p",
  id,
  className,
  keepTogether,
  startDelay = 150,
  step = 70,
  trailing,
}: BlurTextProps) {
  const words = text.split(" ");
  const [groupStart, groupEnd] = findPhrase(words, keepTogether);

  const word = (value: string, i: number) => (
    <span key={i} className="blur-word" style={{ "--i": i } as CSSProperties}>
      {value}
    </span>
  );

  const nodes: ReactNode[] = [];
  for (let i = 0; i < words.length; i++) {
    if (i === groupStart) {
      const inner: ReactNode[] = [];
      for (let j = groupStart; j <= groupEnd; j++) {
        inner.push(word(words[j], j));
        if (j < groupEnd) inner.push(" ");
      }
      nodes.push(
        <span key={`group-${i}`} className="lg:whitespace-nowrap">
          {inner}
        </span>,
      );
      i = groupEnd;
    } else {
      nodes.push(word(words[i], i));
    }
    if (i < words.length - 1) nodes.push(" ");
  }

  return (
    <Tag
      id={id}
      className={className}
      style={{ "--blur-start": `${startDelay}ms`, "--blur-step": `${step}ms` } as CSSProperties}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {nodes}
        {trailing && (
          <span className="blur-word" style={{ "--i": words.length } as CSSProperties}>
            {trailing}
          </span>
        )}
      </span>
    </Tag>
  );
}
