import React, { createContext, useCallback, useContext, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useResizable } from '../hooks/use-resizable';
import useShortcut from '../hooks/use-shortcut';
import {
  ResizableComponent, // Add this import
  ResizableComponentProps,
  ResizableContentProps,
  ResizableContextValue,
  ResizableHandleProps,
  ResizeDirection,
} from '../types';
import '../styles/index.css';

const ResizableContext = createContext<ResizableContextValue | null>(null);

const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error('useResizableContext must be used within a Resizable component');
  }
  return context;
};

const Content: React.FC<ResizableContentProps> = ({ children, asChild, ...props }) => {
  const { width, height, isResizing } = useResizableContext();
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...props}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        transition: isResizing ? 'none' : props.style?.transition,
        ...props.style,
      }}
      data-resizable-content="true"
      data-resizing={isResizing.toString()}
      data-width={width}
      data-height={height}
      role="region"
      aria-label="Resizable content"
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </Comp>
  );
};

const getHandleClass = (direction: ResizeDirection = 'bottom-right') => {
  return `rr-handle rr-handle-${direction}`;
};

const Handle: React.FC<ResizableHandleProps> = ({
  direction = 'bottom-right',
  asChild,
  className = '',
  ...props
}) => {
  const { getResizeHandleProps, isResizing } = useResizableContext();
  const { onMouseDown, onTouchStart, ...handleProps } = getResizeHandleProps(direction);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      props.onMouseDown?.(e as any);
      onMouseDown?.(e);
    },
    [props.onMouseDown, onMouseDown]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      props.onTouchStart?.(e as any);
      onTouchStart?.(e);
    },
    [props.onTouchStart, onTouchStart]
  );

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...handleProps}
      className={[getHandleClass(direction), className].join(' ')}
      data-resizable-handle="true"
      data-resizing={isResizing.toString()}
      data-direction={direction}
      role="button"
      aria-label={`Resize handle for ${direction} direction`}
      aria-controls="resizable-content"
      aria-expanded={isResizing}
      tabIndex={0}
      aria-describedby="resize-instructions"
      {...props}
      onMouseDown={(e) => {
        handleMouseDown(e);
        onMouseDown?.(e);
      }}
      onTouchStart={(e) => {
        handleTouchStart(e);
        onTouchStart?.(e);
      }}
    />
  );
};

export const Resizable: ResizableComponent = ({
  children,
  value,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  aspectRatio,
  triggerMode,
  onChange,
  asChild,
  ...props
}: ResizableComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(({ width, height }: { width: number; height: number }) => {
    onChange?.({ width, height });
  }, []);

  const resizable = useResizable({
    ref: containerRef,
    value,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    aspectRatio,
    triggerMode,
    onChange: handleChange,
  });

  // Keyboard shortcut handlers
  const handleStartResize = () => {
    if (!resizable.isResizing) {
      const handle = containerRef.current?.querySelector(`[data-direction="bottom-right"]`);
      if (handle) {
        const rect = handle.getBoundingClientRect();
        const event = new MouseEvent('mousedown', {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          bubbles: true,
        });
        handle.dispatchEvent(event);
      }
    }
  };

  const handleStopResize = () => {
    if (resizable.isResizing) {
      // Simulate a mouse up event
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }
  };

  // Register keyboard shortcuts
  useShortcut(
    {
      Enter: handleStartResize,
      Escape: handleStopResize,
    },
    undefined,
    {
      target: containerRef.current || window,
      preventDefault: true,
    }
  );

  const Comp = asChild ? Slot : 'div';

  return (
    <ResizableContext.Provider value={resizable}>
      <Comp
        ref={containerRef}
        data-resizable="true"
        data-resizable-component="true"
        data-width={resizable.width}
        data-height={resizable.height}
        data-height-min={resizable.height === minHeight}
        data-height-max={resizable.height === maxHeight}
        data-width-min={resizable.width === minWidth}
        data-width-max={resizable.width === maxWidth}
        role="region"
        aria-label="Resizable container"
        {...props}
        className={['rr-container', props.className].join(' ')}
      >
        {children}
      </Comp>
    </ResizableContext.Provider>
  );
};

Resizable.Content = Content;
Resizable.Handle = Handle;
