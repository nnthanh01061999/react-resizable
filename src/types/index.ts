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
  children: React.ReactNode;
  direction?: ResizeDirection;
}

export interface ResizableContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ResizeDirection;
}

export interface ResizableComponent extends React.FC<ResizableProps> {
  Content: React.FC<ResizableContentProps>;
  Handle: React.FC<ResizableHandleProps>;
}

export interface UseResizableProps {
  value?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  direction?: ResizeDirection;
  aspectRatio?: boolean;
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

export interface ResizableState {
  width: number;
  height: number;
  isResizing: boolean;
}

export interface ResizableProps extends Omit<UseResizableProps, 'direction'> {
  children: React.ReactNode;
}

export interface ResizableContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ResizeDirection;
  withHandle?: boolean;
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
