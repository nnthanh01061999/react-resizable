import React from 'react';

export type ResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface UseResizableProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResize?: (width: number, height: number) => void;
  direction?: ResizeDirection;
}

export interface ResizableState {
  width: number;
  height: number;
  isResizing: boolean;
}

export interface ResizableProps extends UseResizableProps {
  children: React.ReactNode;
}

export interface ResizableContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ResizableHandleProps {
  className?: string;
  direction?: ResizeDirection;
}

export interface ResizableContextValue extends ResizableState {
  getResizeHandleProps: (direction?: ResizeDirection) => {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    role: string;
    'aria-label': string;
    tabIndex: number;
  };
}

export interface ResizableComponent extends React.FC<ResizableProps> {
  Content: React.FC<ResizableContentProps>;
  Handle: React.FC<ResizableHandleProps>;
}
