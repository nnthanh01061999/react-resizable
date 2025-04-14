import React, { createContext, useContext, useRef } from 'react';
import { useResizable } from '../hooks/use-resizable';
import useShortcut from '../hooks/use-shortcut';
import {
  ResizableComponent,
  ResizableContentProps,
  ResizableContextValue,
  ResizableHandleProps,
  ResizeDirection,
} from '../types';
import { cn } from '../lib/utils';

const ResizableContext = createContext<ResizableContextValue | null>(null);

const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error('useResizableContext must be used within a Resizable component');
  }
  return context;
};

const Content: React.FC<ResizableContentProps> = ({ children, className = '' }) => {
  const { width, height, isResizing } = useResizableContext();
  return (
    <div
      className={`${className}`}
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

const getCursorClass = (direction: ResizeDirection = 'bottom-right') => {
  switch (direction) {
    case 'top':
      return 'cursor-ns-resize';
    case 'right':
      return 'cursor-ew-resize';
    case 'bottom':
      return 'cursor-ns-resize';
    case 'left':
      return 'cursor-ew-resize';
    case 'top-right':
      return 'cursor-nesw-resize';
    case 'bottom-right':
      return 'cursor-nwse-resize';
    case 'bottom-left':
      return 'cursor-nesw-resize';
    case 'top-left':
      return 'cursor-nwse-resize';
    default:
      return 'cursor-nesw-resize';
  }
};

const getHandlePosition = (direction: ResizeDirection = 'bottom-right') => {
  switch (direction) {
    case 'top':
      return '-top-1.5 left-1/2 -translate-x-1/2';
    case 'right':
      return '-right-1.5 top-1/2 -translate-y-1/2';
    case 'bottom':
      return '-bottom-1.5 left-1/2 -translate-x-1/2';
    case 'left':
      return '-left-1.5 top-1/2 -translate-y-1/2';
    case 'top-right':
      return 'top-0 right-0';
    case 'bottom-right':
      return 'bottom-0 right-0';
    case 'bottom-left':
      return 'bottom-0 left-0';
    case 'top-left':
      return 'top-0 left-0';
    default:
      return 'bottom-0 right-0';
  }
};

const getHandleSize = (direction: ResizeDirection = 'bottom-right') => {
  switch (direction) {
    case 'top':
      return 'w-full h-1.5';
    case 'right':
      return 'w-1.5 h-full';
    case 'bottom':
      return 'w-full h-1.5';
    case 'left':
      return 'w-1.5 h-full';
    case 'top-right':
      return 'bg-transparent hover:bg-transparent w-1 h-1';
    case 'bottom-right':
      return 'bg-transparent hover:bg-transparent w-1 h-1';
    case 'bottom-left':
      return 'bg-transparent hover:bg-transparent w-1 h-1';
    case 'top-left':
      return 'bg-transparent hover:bg-transparent w-1 h-1';
    default:
      return '';
  }
};

const getHandleIslandSize = (direction: ResizeDirection = 'bottom-right') => {
  switch (direction) {
    case 'top':
      return 'w-5 h-0.5 rounded-full';
    case 'right':
      return 'w-0.5 h-5 rounded-full';
    case 'bottom':
      return 'w-5 h-0.5 rounded-full';
    case 'left':
      return 'w-0.5 h-5 rounded-full';
    case 'top-right':
      return 'w-2 h-[1px] rotate-45  bg-gray-600 translate-y-1';
    case 'bottom-right':
      return 'w-2 h-[1px] -rotate-45  bg-gray-600 -translate-y-1';
    case 'bottom-left':
      return 'w-2 h-[1px] rotate-45  bg-gray-600 -translate-y-1';
    case 'top-left':
      return 'w-2 h-[1px] -rotate-45  bg-gray-600 translate-y-1';
  }
};
const Handle: React.FC<ResizableHandleProps> = ({
  className = '',
  direction = 'bottom-right',
  withHandle = true,
}) => {
  const { getResizeHandleProps, isResizing } = useResizableContext();
  return (
    <div
      {...getResizeHandleProps(direction)}
      className={cn(
        'absolute hover:bg-gray-300 group bg-gray-1.500 opacity-50 hover:opacity-70 transition-opacity',
        getCursorClass(direction),
        getHandlePosition(direction),
        getHandleSize(direction),
        className
      )}
      data-resizable-handle="true"
      data-resizing={isResizing.toString()}
      data-direction={direction}
      role="button"
      aria-label={`Resize handle for ${direction} direction`}
      aria-controls="resizable-content"
      aria-expanded={isResizing}
      tabIndex={0}
      aria-describedby="resize-instructions"
    >
      {withHandle && (
        <span
          className={cn(
            'bg-gray-600 top-1/2 left-1/2 -translate-x-1/2 absolute -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity',
            getHandleIslandSize(direction)
          )}
        />
      )}
    </div>
  );
};

export interface ResizableHandlesProps {
  directions?: ResizeDirection[];
  className?: string;
}

const Handles: React.FC<ResizableHandlesProps> = ({
  directions = ['bottom-right'],
  className = '',
}) => {
  return (
    <>
      {directions.map((direction) => (
        <Handle key={direction} direction={direction} className={className} />
      ))}
    </>
  );
};

const Resizable: ResizableComponent = ({ children, direction = 'bottom-right', ...props }) => {
  const resizable = useResizable({ ...props, direction });
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
        className={cn('relative inline-block')}
        data-resizable="true"
        data-resizable-component="true"
        role="region"
        aria-label="Resizable container"
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
};

Resizable.Content = Content;
Resizable.Handle = Handle;
Resizable.Handles = Handles;

export default Resizable;
