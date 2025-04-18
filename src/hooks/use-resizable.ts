import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ResizableState,
  ResizeDirection,
  ResizableContextValue,
  UseResizableProps,
  ResizeTriggerMode,
} from '../types';
import { calculateNewDimensions } from '../utils/calculate-dimension';

export function useResizable({
  ref,
  value,
  minWidth = 50,
  minHeight = 50,
  maxWidth = Infinity,
  maxHeight = Infinity,
  aspectRatio = false,
  onChange,
  triggerMode = 'resize',
}: UseResizableProps & { triggerMode?: ResizeTriggerMode } = {}): ResizableContextValue {
  const initialWidth = value?.width ?? 0;
  const initialHeight = value?.height ?? 0;

  const [state, setState] = useState<ResizableState>({
    width: initialWidth,
    height: initialHeight,
    isResizing: false,
  });

  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startDimensions = useRef({ width: 0, height: 0 });
  const currentDirection = useRef<ResizeDirection>('bottom-right');
  const latestDimensions = useRef({ width: initialWidth, height: initialHeight });

  const startResize = useCallback(
    (x: number, y: number, dir: ResizeDirection) => {
      isResizing.current = true;
      currentDirection.current = dir;
      startPos.current = { x, y };
      startDimensions.current = { width: state.width, height: state.height };
      setState((prev) => ({ ...prev, isResizing: true }));
    },
    [state.width, state.height]
  );

  const updateSize = useCallback(
    (deltaX: number, deltaY: number, aspectRatio: boolean) => {
      const dir = currentDirection.current;

      const { width, height } = calculateNewDimensions({
        aspectRatio,
        startDimensions: startDimensions.current,
        initWidth: startDimensions.current.width,
        initHeight: startDimensions.current.height,
        deltaX,
        deltaY,
        dir,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
      });

      latestDimensions.current = { width, height };
      setState((prev) =>
        prev.width !== width || prev.height !== height ? { ...prev, width, height } : prev
      );

      if (onChange && (triggerMode === 'resize' || triggerMode === 'both')) {
        onChange({ width, height });
      }
    },
    [minWidth, maxWidth, minHeight, maxHeight, onChange, triggerMode]
  );

  const stopResize = useCallback(() => {
    isResizing.current = false;
    setState((prev) => ({ ...prev, isResizing: false }));

    if (onChange && (triggerMode === 'end' || triggerMode === 'both')) {
      onChange(latestDimensions.current);
    }
  }, [onChange, triggerMode]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;
      updateSize(
        e.clientX - startPos.current.x,
        e.clientY - startPos.current.y,
        e.shiftKey || aspectRatio
      );
    },
    [updateSize, aspectRatio]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isResizing.current) return;
      const touch = e.touches[0];
      updateSize(
        touch.clientX - startPos.current.x,
        touch.clientY - startPos.current.y,
        aspectRatio
      );
    },
    [updateSize]
  );

  const handleMouseUp = useCallback(() => {
    stopResize();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, stopResize]);

  const handleTouchEnd = useCallback(() => {
    stopResize();
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove, stopResize]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDirection) => {
      startResize(e.clientX, e.clientY, dir);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [startResize, handleMouseMove, handleMouseUp]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dir: ResizeDirection) => {
      const touch = e.touches[0];
      startResize(touch.clientX, touch.clientY, dir);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [startResize, handleTouchMove, handleTouchEnd]
  );

  const getResizeHandleProps = useCallback(
    (dir: ResizeDirection = 'bottom-right') => ({
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, dir),
      onTouchStart: (e: React.TouchEvent) => handleTouchStart(e, dir),
      role: 'button' as const,
      tabIndex: 0,
      'aria-label': `Resize from ${dir}`,
    }),
    [handleMouseDown, handleTouchStart]
  );

  useLayoutEffect(() => {
    let observer: ResizeObserver | null = null;

    if (typeof value?.width === 'number' && typeof value?.height === 'number') {
      // If explicit value is given, use it
      setState((prev) => ({
        ...prev,
        width: value.width,
        height: value.height,
      }));
    } else if (ref?.current) {
      // Otherwise, observe ref for dynamic resizing
      const updateSizeFromElement = () => {
        const el = ref.current;
        if (el) {
          const newWidth = el.clientWidth;
          const newHeight = el.clientHeight;
          setState((prev) =>
            prev.width !== newWidth || prev.height !== newHeight
              ? { ...prev, width: newWidth, height: newHeight }
              : prev
          );
        }
      };

      observer = new ResizeObserver(() => {
        updateSizeFromElement();
      });

      observer.observe(ref.current);
      updateSizeFromElement(); // Initial run
    }

    return () => {
      observer?.disconnect();
    };
  }, [ref, value?.width, value?.height]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return {
    width: state.width,
    height: state.height,
    isResizing: state.isResizing,
    getResizeHandleProps,
  };
}
