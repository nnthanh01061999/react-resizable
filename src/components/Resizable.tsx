import React, { createContext, useContext, useRef } from 'react';
import { useResizable } from '../hooks/use-resizable';
import useShortcut from '../hooks/use-shortcut';
import {
  ResizableComponent,
  ResizableContentProps,
  ResizableContextValue,
  ResizableHandleProps,
  ResizeDirection
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

const Content: React.FC<ResizableContentProps> = ({ children, ...props }) => {
  const { width, height, isResizing } = useResizableContext();
  return (
    <div
      {...props}
      style={{ width: `${width}px`, height: `${height}px` }}
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
    </div>
  );
};

const getHandleClass = (direction: ResizeDirection = 'bottom-right') => {
  return `rr-handle rr-handle-${direction}`
};

const Handle: React.FC<ResizableHandleProps> = ({
  direction = 'bottom-right',
  className = '',
  ...props
}) => {
  const { getResizeHandleProps, isResizing } = useResizableContext();
  return (
    <div
      {...getResizeHandleProps(direction)}
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
    />
  );
};



export const Resizable: ResizableComponent = ({ children, direction = 'bottom-right',width ,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  onResize,
  ...props
}) => {
  const resizable = useResizable({ width, height, minWidth, minHeight, maxWidth, maxHeight, onResize });
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut handlers
  const handleStartResize = () => {
    if (!resizable.isResizing) {
      const handle = containerRef.current?.querySelector(`[data-direction="${direction}"]`);
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

  return (
    <ResizableContext.Provider value={resizable}>
      <div
        ref={containerRef}
        data-resizable="true"
        data-resizable-component="true"
        role="region"
        aria-label="Resizable container"
        {...props}
        className={["rr-container", props.className].join(' ')}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
};

Resizable.Content = Content;
Resizable.Handle = Handle;


