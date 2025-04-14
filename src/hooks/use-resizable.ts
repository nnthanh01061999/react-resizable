import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableState,
  ResizeDirection,
  ResizableContextValue,
  UseResizableProps,
} from '../types';

export function useResizable({
  width = 200,
  height = 200,
  minWidth = 50,
  minHeight = 50,
  maxWidth = Infinity,
  maxHeight = Infinity,
  onResize,
  direction = 'bottom-right',
}: UseResizableProps = {}): ResizableContextValue {
  const [state, setState] = useState<ResizableState>({
    width,
    height,
    isResizing: false,
  });

  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startDimensions = useRef({ width: 0, height: 0 });
  const currentDirection = useRef<ResizeDirection>(direction);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDirection = direction) => {
      isResizing.current = true;
      currentDirection.current = dir;
      startPos.current = { x: e.clientX, y: e.clientY };
      startDimensions.current = { width: state.width, height: state.height };
      setState((prev) => ({ ...prev, isResizing: true }));
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [state.width, state.height, direction]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dir: ResizeDirection = direction) => {
      isResizing.current = true;
      currentDirection.current = dir;
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startDimensions.current = { width: state.width, height: state.height };
      setState((prev) => ({ ...prev, isResizing: true }));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [state.width, state.height, direction]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      const dir = currentDirection.current;

      let newWidth = startDimensions.current.width;
      let newHeight = startDimensions.current.height;

      // Check if it's a single direction (not a corner)
      const isSingleDirection = ['top', 'right', 'bottom', 'left'].includes(dir);

      if (e.shiftKey) {
        // Maintain aspect ratio
        const ratio = startDimensions.current.width / startDimensions.current.height;

        if (dir.includes('right')) {
          newWidth = Math.min(Math.max(startDimensions.current.width + deltaX, minWidth), maxWidth);
          newHeight = newWidth / ratio;
        } else if (dir.includes('left')) {
          newWidth = Math.min(Math.max(startDimensions.current.width - deltaX, minWidth), maxWidth);
          newHeight = newWidth / ratio;
        } else if (dir.includes('bottom')) {
          newHeight = Math.min(
            Math.max(startDimensions.current.height + deltaY, minHeight),
            maxHeight
          );
          newWidth = newHeight * ratio;
        } else if (dir.includes('top')) {
          newHeight = Math.min(
            Math.max(startDimensions.current.height - deltaY, minHeight),
            maxHeight
          );
          newWidth = newHeight * ratio;
        }
      } else {
        // Handle different resize directions
        if (isSingleDirection) {
          // For single directions, only allow resizing in that specific direction
          if (dir === 'right') {
            newWidth = Math.min(
              Math.max(startDimensions.current.width + deltaX, minWidth),
              maxWidth
            );
          } else if (dir === 'left') {
            newWidth = Math.min(
              Math.max(startDimensions.current.width - deltaX, minWidth),
              maxWidth
            );
          } else if (dir === 'bottom') {
            newHeight = Math.min(
              Math.max(startDimensions.current.height + deltaY, minHeight),
              maxHeight
            );
          } else if (dir === 'top') {
            newHeight = Math.min(
              Math.max(startDimensions.current.height - deltaY, minHeight),
              maxHeight
            );
          }
        } else {
          // For corner directions, allow resizing in both directions
          if (dir.includes('right')) {
            newWidth = Math.min(
              Math.max(startDimensions.current.width + deltaX, minWidth),
              maxWidth
            );
          } else if (dir.includes('left')) {
            newWidth = Math.min(
              Math.max(startDimensions.current.width - deltaX, minWidth),
              maxWidth
            );
          }

          if (dir.includes('bottom')) {
            newHeight = Math.min(
              Math.max(startDimensions.current.height + deltaY, minHeight),
              maxHeight
            );
          } else if (dir.includes('top')) {
            newHeight = Math.min(
              Math.max(startDimensions.current.height - deltaY, minHeight),
              maxHeight
            );
          }
        }
      }

      setState((prev) => ({ ...prev, width: newWidth, height: newHeight }));
      onResize?.(newWidth, newHeight);
    },
    [minWidth, maxWidth, minHeight, maxHeight, onResize]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isResizing.current) return;

      const deltaX = e.touches[0].clientX - startPos.current.x;
      const deltaY = e.touches[0].clientY - startPos.current.y;
      const dir = currentDirection.current;

      let newWidth = startDimensions.current.width;
      let newHeight = startDimensions.current.height;

      // Check if it's a single direction (not a corner)
      const isSingleDirection = ['top', 'right', 'bottom', 'left'].includes(dir);

      // Handle different resize directions
      if (isSingleDirection) {
        // For single directions, only allow resizing in that specific direction
        if (dir === 'right') {
          newWidth = Math.min(Math.max(startDimensions.current.width + deltaX, minWidth), maxWidth);
        } else if (dir === 'left') {
          newWidth = Math.min(Math.max(startDimensions.current.width - deltaX, minWidth), maxWidth);
        } else if (dir === 'bottom') {
          newHeight = Math.min(
            Math.max(startDimensions.current.height + deltaY, minHeight),
            maxHeight
          );
        } else if (dir === 'top') {
          newHeight = Math.min(
            Math.max(startDimensions.current.height - deltaY, minHeight),
            maxHeight
          );
        }
      } else {
        // For corner directions, allow resizing in both directions
        if (dir.includes('right')) {
          newWidth = Math.min(Math.max(startDimensions.current.width + deltaX, minWidth), maxWidth);
        } else if (dir.includes('left')) {
          newWidth = Math.min(Math.max(startDimensions.current.width - deltaX, minWidth), maxWidth);
        }

        if (dir.includes('bottom')) {
          newHeight = Math.min(
            Math.max(startDimensions.current.height + deltaY, minHeight),
            maxHeight
          );
        } else if (dir.includes('top')) {
          newHeight = Math.min(
            Math.max(startDimensions.current.height - deltaY, minHeight),
            maxHeight
          );
        }
      }

      setState((prev) => ({ ...prev, width: newWidth, height: newHeight }));
      onResize?.(newWidth, newHeight);
    },
    [minWidth, maxWidth, minHeight, maxHeight, onResize]
  );

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    setState((prev) => ({ ...prev, isResizing: false }));
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleTouchEnd = useCallback(() => {
    isResizing.current = false;
    setState((prev) => ({ ...prev, isResizing: false }));
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove]);

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

  return {
    width: state.width,
    height: state.height,
    isResizing: state.isResizing,
    getResizeHandleProps,
  };
}
