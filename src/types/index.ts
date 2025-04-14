import React from 'react';

export type ResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left';

export interface UseResizableProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResize?: (width: number, height: number) => void;
}

export interface ResizableState {
  width: number;
  height: number;
  isResizing: boolean;
}

export interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  role: string;
  tabIndex: number;
  'aria-label': string;
}

export interface ResizableContextValue {
  width: number;
  height: number;
  isResizing: boolean;
  getResizeHandleProps: (direction?: ResizeDirection) => {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    role: string;
    tabIndex: number;
    'aria-label': string;
  };
}

export interface ResizableProps extends UseResizableProps {
  children: React.ReactNode;
  direction?: ResizeDirection;
}

export interface ResizableContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ResizableHandleProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  direction?: ResizeDirection;
  withHandle?: boolean;
}

export interface ResizableHandlesProps {
  directions?: ResizeDirection[];
  className?: string;
}

export interface ResizableComponent extends React.FC<ResizableProps> {
  Content: React.FC<ResizableContentProps>;
  Handle: React.FC<ResizableHandleProps>;
  Handles: React.FC<ResizableHandlesProps>;
}
