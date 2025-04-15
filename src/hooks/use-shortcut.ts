import { useCallback, useEffect, useRef } from 'react';

type KeyType = string | string[];
type KeyHandler = (event: KeyboardEvent) => void;
type KeyMapType = Record<string, KeyHandler>;

interface UseShortcutOptions {
  /**
   * Whether the shortcut is active
   * @default true
   */
  isActive?: boolean;

  /**
   * Whether the shortcut should prevent default browser behavior
   * @default true
   */
  preventDefault?: boolean;

  /**
   * Whether the shortcut should stop event propagation
   * @default false
   */
  stopPropagation?: boolean;

  /**
   * Target element to attach the event listener (defaults to window)
   */
  target?: EventTarget;
}

/**
 * Hook for handling keyboard shortcuts
 *
 * @example
 * // Single key with handler
 * useShortcut("Escape", handleEsc);
 *
 * @example
 * // Multiple keys with same handler
 * useShortcut(["ArrowUp", "w"], handleMoveUp);
 *
 * @example
 * // Key map for multiple shortcuts
 * useShortcut({
 *   "Escape": handleClose,
 *   "Enter": handleConfirm,
 *   "Shift+S": handleSave
 * });
 */
export function useShortcut(
  keys: KeyType | KeyMapType,
  handler?: KeyHandler,
  options: UseShortcutOptions = {}
) {
  const {
    isActive = true,
    preventDefault = true,
    stopPropagation = false,
    target = window,
  } = options;

  // Store key map in a ref to avoid unnecessary re-renders
  const keyMapRef = useRef<KeyMapType>({});

  // Setup key map based on input types
  useEffect(() => {
    if (typeof keys === 'object' && !Array.isArray(keys) && handler === undefined) {
      // Case: key map object passed directly
      keyMapRef.current = keys;
    } else if (handler) {
      // Case: key(s) and handler passed separately
      const keyList = Array.isArray(keys) ? keys : [keys as string];
      const newKeyMap: KeyMapType = {};

      keyList.forEach((key) => {
        newKeyMap[key] = handler;
      });

      keyMapRef.current = newKeyMap;
    }
  }, [keys, handler]);

  // Parse a key string like "Shift+S" into components
  const parseKeyString = useCallback((keyString: string) => {
    const parts = keyString.split('+');
    const key = parts.pop()?.toLowerCase() || '';
    const modifiers = {
      alt: parts.includes('Alt'),
      ctrl: parts.includes('Ctrl') || parts.includes('Control'),
      meta: parts.includes('Meta'),
      shift: parts.includes('Shift'),
    };

    return { key, modifiers };
  }, []);

  // Check if the event matches a key combination
  const matchesKeyCombo = useCallback(
    (event: KeyboardEvent, keyString: string) => {
      const { key, modifiers } = parseKeyString(keyString);

      // Check if the actual key matches
      const keyMatches = event.key.toLowerCase() === key || event.code.toLowerCase() === key;

      // Check if modifiers match
      const modifiersMatch =
        modifiers.alt === event.altKey &&
        modifiers.ctrl === event.ctrlKey &&
        modifiers.meta === event.metaKey &&
        modifiers.shift === event.shiftKey;

      return keyMatches && modifiersMatch;
    },
    [parseKeyString]
  );

  // Event handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      // Check all keys in the key map
      for (const [keyCombo, handler] of Object.entries(keyMapRef.current)) {
        if (matchesKeyCombo(event, keyCombo)) {
          if (preventDefault) event.preventDefault();
          if (stopPropagation) event.stopPropagation();

          handler(event);
          break;
        }
      }
    },
    [isActive, matchesKeyCombo, preventDefault, stopPropagation]
  );

  // Register event listener
  useEffect(() => {
    target.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [target, handleKeyDown]);
}

export default useShortcut;
