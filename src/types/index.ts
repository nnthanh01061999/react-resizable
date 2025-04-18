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

export type ResizeTriggerMode = 'resize' | 'end' | 'both';

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

export interface ResizableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    UseResizableProps {
  asChild?: boolean;
}

// Define ResizableComponentProps as an alias
export type ResizableComponentProps = ResizableProps;

export interface ResizableContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ResizeDirection;
  asChild?: boolean;
}

// Update ResizableComponent to use ResizableComponentProps
export interface ResizableComponent extends React.FC<ResizableComponentProps> {
  Content: React.FC<ResizableContentProps>;
  Handle: React.FC<ResizableHandleProps>;
}

export interface UseResizableProps {
  ref?: React.RefObject<HTMLDivElement | null>;
  value?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: boolean;
  triggerMode?: ResizeTriggerMode;
  onChange?: (value: { width: number; height: number }) => void;
}

export interface CalculateDimensionsProps {
  startDimensions: { width: number; height: number };
  deltaX: number;
  deltaY: number;
  dir: ResizeDirection;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

export interface InitDimensions {
  initWidth: number;
  initHeight: number;
}

// Remove duplicate definitions below this line
