/**
 * Scramble-decode text animation
 * Characters cycle through random glyphs before settling to their final value.
 * Animates left-to-right, elements can be sequenced top-to-bottom.
 */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?/<>{}[]|~^';

/**
 * Decode a single element's text content
 * @param {HTMLElement} el - Element to animate
 * @param {object} opts
 * @param {number} opts.duration - Total decode time in ms (default 1200)
 * @param {number} opts.delay - Delay before starting in ms (default 0)
 * @param {number} opts.scrambleCycles - How many random chars before settling (default 4)
 */
export function decodeText(el, { duration = 1200, delay = 0, scrambleCycles = 4 } = {}) {
  const finalText = el.getAttribute('data-text') || el.textContent;
  const chars = finalText.split('');
  const totalChars = chars.length;
  
  // Preserve HTML structure for elements with child spans (like .accent)
  if (el.children.length > 0) {
    decodeWithChildren(el, { duration, delay, scrambleCycles });
    return;
  }

  // Start fully scrambled
  el.textContent = chars.map(c => c === ' ' ? ' ' : randomGlyph()).join('');
  el.style.opacity = '1';

  setTimeout(() => {
    const perCharTime = duration / totalChars;
    
    chars.forEach((finalChar, i) => {
      if (finalChar === ' ') return; // Skip spaces
      
      // Each character goes through scramble cycles then settles
      const settleTime = i * perCharTime;
      
      for (let cycle = 0; cycle < scrambleCycles; cycle++) {
        setTimeout(() => {
          const current = el.textContent.split('');
          current[i] = randomGlyph();
          el.textContent = current.join('');
        }, settleTime + (cycle * (perCharTime / scrambleCycles)));
      }
      
      // Final settle
      setTimeout(() => {
        const current = el.textContent.split('');
        current[i] = finalChar;
        el.textContent = current.join('');
      }, settleTime + perCharTime);
    });
  }, delay);
}

/**
 * Decode an element that contains child elements (e.g., spans with .accent)
 * Handles innerHTML by extracting text nodes and animating them
 */
function decodeWithChildren(el, { duration, delay, scrambleCycles }) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.trim().length > 0) {
      textNodes.push({
        node,
        finalText: node.textContent,
      });
    }
  }

  // Calculate total character count across all text nodes
  let totalChars = 0;
  textNodes.forEach(t => totalChars += t.finalText.length);

  // Scramble all text nodes initially
  textNodes.forEach(t => {
    t.node.textContent = t.finalText.split('').map(c => c === ' ' ? ' ' : randomGlyph()).join('');
  });
  el.style.opacity = '1';

  setTimeout(() => {
    const perCharTime = duration / totalChars;
    let globalIndex = 0;

    textNodes.forEach(({ node, finalText }) => {
      const chars = finalText.split('');
      
      chars.forEach((finalChar, localIndex) => {
        const i = globalIndex + localIndex;
        if (finalChar === ' ') return;
        
        const settleTime = i * perCharTime;
        
        for (let cycle = 0; cycle < scrambleCycles; cycle++) {
          setTimeout(() => {
            const current = node.textContent.split('');
            current[localIndex] = randomGlyph();
            node.textContent = current.join('');
          }, settleTime + (cycle * (perCharTime / scrambleCycles)));
        }
        
        setTimeout(() => {
          const current = node.textContent.split('');
          current[localIndex] = finalChar;
          node.textContent = current.join('');
        }, settleTime + perCharTime);
      });
      
      globalIndex += chars.length;
    });
  }, delay);
}

/**
 * Sequence decode across multiple elements (top to bottom)
 * @param {HTMLElement[]} elements - Array of elements to decode in order
 * @param {object} opts
 * @param {number} opts.perElementDuration - Duration per element (default 800)
 * @param {number} opts.stagger - Delay between elements starting (default 400)
 */
export function decodeSequence(elements, { perElementDuration = 800, stagger = 400 } = {}) {
  elements.forEach((el, i) => {
    // Initially hide
    el.style.opacity = '0';
    
    decodeText(el, {
      duration: perElementDuration,
      delay: i * stagger,
      scrambleCycles: 3 + Math.floor(Math.random() * 2),
    });
  });
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}
