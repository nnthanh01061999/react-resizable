import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableState,
  ResizeDirection,
  ResizableContextValue,
  UseResizableProps,
} from '../types';
import { calculateNewDimensions } from '../utils/calculate-dimension';

export function useResizable({
  ref,
  value,
  minWidth = 50,
  minHeight = 50,
  maxWidth = Infinity,
  maxHeight = Infinity,
  direction = 'bottom-right',
  aspectRatio = false,
  onChange,
}: UseResizableProps = {}): ResizableContextValue {
  const { width, height } = value || { width: undefined, height: undefined };

  const [state, setState] = useState<ResizableState>({
    width: width ?? 0,
    height: height ?? 0,
    isResizing: false,
  });

  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startDimensions = useRef({ width: 0, height: 0 });
  const currentDirection = useRef<ResizeDirection>(direction);

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

      setState((prev) => ({ ...prev, width, height }));
      onChange?.({ width, height });
    },
    [minWidth, maxWidth, minHeight, maxHeight, onChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDirection = direction) => {
      startResize(e.clientX, e.clientY, dir);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [direction, startResize]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dir: ResizeDirection = direction) => {
      const touch = e.touches[0];
      startResize(touch.clientX, touch.clientY, dir);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [direction, startResize]
  );

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
      updateSize(touch.clientX - startPos.current.x, touch.clientY - startPos.current.y, false);
    },
    [updateSize]
  );

  const stopResize = useCallback(() => {
    isResizing.current = false;
    setState((prev) => ({ ...prev, isResizing: false }));
  }, []);

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

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const getResizeHandleProps = useCallback(
    (dir: ResizeDirection = direction) => ({
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, dir),
      onTouchStart: (e: React.TouchEvent) => handleTouchStart(e, dir),
      role: 'button',
      tabIndex: 0,
      'aria-label': `Resize from ${dir}`,
    }),
    [handleMouseDown, handleTouchStart, direction]
  );

  useEffect(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      setState((prev) => ({ ...prev, width, height }));
    } else {
      setState((prev) => ({
        ...prev,
        width: ref?.current?.clientWidth || 0,
        height: ref?.current?.clientHeight || 0,
      }));
    }
  }, [width, height, ref?.current]);

  return {
    width: state.width,
    height: state.height,
    isResizing: state.isResizing,
    getResizeHandleProps,
  };
}
