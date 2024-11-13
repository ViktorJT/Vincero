import { useState, useEffect } from "react";

interface SplitTextOptions {
  tag?: string;
  linesClass?: string;
  absolute?: boolean;
}

interface SplitResult {
  lines: HTMLElement[];
  revert: () => void;
}

type ElementTarget = HTMLElement | HTMLElement[] | string;

const getElements = (target: ElementTarget): HTMLElement[] => {
  if (typeof target === "string") {
    return Array.from(document.querySelectorAll(target)) as HTMLElement[];
  }
  return Array.isArray(target) ? target : [target];
};

const splitElement = (
  element: HTMLElement,
  options: Required<SplitTextOptions>,
): HTMLElement[] => {
  // Store original content and styles
  const originalContent = element.innerHTML;
  const computedStyle = window.getComputedStyle(element);

  // Create a temporary container that mimics the original element's styles
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = originalContent;
  tempContainer.style.position = "absolute";
  tempContainer.style.top = "0";
  tempContainer.style.left = "0";
  tempContainer.style.width = computedStyle.width;
  tempContainer.style.fontSize = computedStyle.fontSize;
  tempContainer.style.fontFamily = computedStyle.fontFamily;
  tempContainer.style.fontWeight = computedStyle.fontWeight;
  tempContainer.style.lineHeight = computedStyle.lineHeight;
  tempContainer.style.letterSpacing = computedStyle.letterSpacing;
  tempContainer.style.whiteSpace = "normal";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.display = computedStyle.display;
  tempContainer.style.maxWidth = computedStyle.maxWidth;
  tempContainer.style.padding = computedStyle.padding;

  // Add to DOM temporarily
  element.parentNode?.insertBefore(tempContainer, element);

  // Create ranges for each word
  const ranges: Range[] = [];
  const treeWalker = document.createTreeWalker(
    tempContainer,
    NodeFilter.SHOW_TEXT,
    null,
  );

  let node: Node | null;
  while ((node = treeWalker.nextNode())) {
    const words = node.textContent?.split(/\s+/) || [];
    let startPos = 0;

    words.forEach((word) => {
      if (!word) return;

      const range = document.createRange();
      range.setStart(node, startPos);
      range.setEnd(node, startPos + word.length);
      ranges.push(range);

      startPos += word.length + 1; // +1 for the space
    });
  }

  // Group words into lines based on their vertical position
  const lines: HTMLElement[] = [];
  let currentLine: Range[] = [];
  let lastTop = -1;

  ranges.forEach((range) => {
    const rect = range.getBoundingClientRect();

    if (rect.top !== lastTop && lastTop !== -1 && currentLine.length > 0) {
      // Create new line element
      const lineEl = document.createElement(options.tag);
      const lineContent = currentLine.map((r) => r.toString()).join(" ");
      lineEl.innerHTML = lineContent;
      lines.push(lineEl);
      currentLine = [];
    }

    currentLine.push(range);
    lastTop = rect.top;
  });

  // Handle last line
  if (currentLine.length > 0) {
    const lineEl = document.createElement(options.tag);
    const lineContent = currentLine.map((r) => r.toString()).join(" ");
    lineEl.innerHTML = lineContent;
    lines.push(lineEl);
  }

  // Clean up
  tempContainer.remove();

  // Clear original content and append lines
  element.innerHTML = "";
  lines.forEach((line, i) => {
    if (options.linesClass) {
      line.className = `opacity-0 ${options.linesClass}${i + 1}`;
    }
    if (options.absolute) {
      line.style.position = "absolute";
      line.style.width = "100%";
      line.style.display = "block";
    }
    element.appendChild(line);
  });

  return lines;
};

export const splitText = (
  target: ElementTarget,
  options: SplitTextOptions = {},
): SplitResult => {
  const elements = getElements(target);
  const defaultedOptions: Required<SplitTextOptions> = {
    tag: options.tag || "div",
    linesClass: options.linesClass || "",
    absolute: options.absolute || false,
  };

  // Store original state for revert
  const originals = elements.map((el) => ({
    html: el.innerHTML,
    style: el.getAttribute("style"),
  }));

  // Split all elements
  const allLines = elements.flatMap((element) =>
    splitElement(element, defaultedOptions),
  );

  // Create revert function
  const revert = () => {
    elements.forEach((element, i) => {
      const original = originals[i];
      if (original) {
        element.innerHTML = original.html;
        if (original.style) {
          element.setAttribute("style", original.style);
        } else {
          element.removeAttribute("style");
        }
      }
    });
  };

  return { lines: allLines, revert };
};

// React hook for using splitText
export const useSplitText = (
  ref: React.RefObject<HTMLElement>,
  options: SplitTextOptions = {},
) => {
  const [lines, setLines] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    // Add resize observer to handle responsive text
    const resizeObserver = new ResizeObserver(() => {
      const { lines } = splitText(ref.current!, options);
      setLines(lines);
    });

    resizeObserver.observe(ref.current);

    // Initial split
    const { lines, revert } = splitText(ref.current, options);
    setLines(lines);

    return () => {
      resizeObserver.disconnect();
      revert();
    };
  }, [ref, options.tag, options.linesClass, options.absolute]);

  return lines;
};
