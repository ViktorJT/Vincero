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

const getTextNodes = (element: HTMLElement, tag: string): HTMLElement[] => {
  const nodes: HTMLElement[] = [];
  const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

  let node: Node | null;
  while ((node = walk.nextNode())) {
    if (node.textContent?.trim()) {
      const wrapper = document.createElement(tag);
      wrapper.appendChild(node.cloneNode(true));
      nodes.push(wrapper);
    }
  }

  return nodes;
};

const createLineElement = (
  elements: HTMLElement[],
  tag: string,
  absolute: boolean,
): HTMLElement => {
  const line = document.createElement(tag);

  if (absolute) {
    line.style.position = "absolute";
    line.style.display = "block";
    line.style.width = "100%";
  }

  elements.forEach((el) => {
    const content = el.innerHTML;
    el.parentNode?.removeChild(el);
    line.innerHTML += content;
  });

  return line;
};

const splitElement = (
  element: HTMLElement,
  options: Required<SplitTextOptions>,
): HTMLElement[] => {
  const lineThreshold = parseFloat(getComputedStyle(element).fontSize) * 0.2;
  const lines: HTMLElement[] = [];
  let nodes = getTextNodes(element, options.tag);
  let lineOffsetY = -999;
  let currentLine: HTMLElement[] = [];

  // Create temporary elements for measuring
  nodes.forEach((node) => {
    const wrapper = document.createElement(options.tag);
    wrapper.appendChild(node.cloneNode(true));
    element.appendChild(wrapper);

    const offsetY = wrapper.offsetTop;

    if (Math.abs(offsetY - lineOffsetY) > lineThreshold) {
      if (currentLine.length) {
        lines.push(
          createLineElement(currentLine, options.tag, options.absolute),
        );
      }
      currentLine = [wrapper];
      lineOffsetY = offsetY;
    } else {
      currentLine.push(wrapper);
    }
  });

  // Handle last line
  if (currentLine.length) {
    lines.push(createLineElement(currentLine, options.tag, options.absolute));
  }

  // Clear original content and append lines
  element.innerHTML = "";
  lines.forEach((line, i) => {
    if (options.linesClass) {
      line.className = options.linesClass + (i + 1);
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

    const { lines, revert } = splitText(ref.current, options);
    setLines(lines);

    return revert;
  }, [ref, options.tag, options.linesClass, options.absolute]);

  return lines;
};
