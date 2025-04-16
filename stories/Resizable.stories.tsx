import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Resizable } from '../src';
import React, { useState, useEffect } from 'react';

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'object' },
    minWidth: { control: 'number' },
    minHeight: { control: 'number' },
    maxWidth: { control: 'number' },
    maxHeight: { control: 'number' },
    direction: {
      control: 'select',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-right',
        'bottom-right',
        'bottom-left',
        'top-left',
      ],
    },
  },
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'lightblue',
      }}
    >
      <code
        style={{
          padding: 10,
          textAlign: 'center',
        }}
      >
        {children}
      </code>
    </div>
  );
};

export const Default: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Drag the bottom-right corner to resize</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// Custom handle with different styling
export const CustomHandle: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Custom styled handle</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle
        style={{
          backgroundColor: '#ef4444',
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="sr-only">Resize</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </Resizable.Handle>
    </Resizable>
  ),
};

// Single direction handles (top, right, bottom, left)
export const SingleDirectionHandles: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Single direction handles</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top" style={{ backgroundColor: '#6b5bca' }} />
      <Resizable.Handle direction="right" style={{ backgroundColor: '#6b5bca' }} />
      <Resizable.Handle direction="bottom" style={{ backgroundColor: '#6b5bca' }} />
      <Resizable.Handle direction="left" style={{ backgroundColor: '#6b5bca' }} />
    </Resizable>
  ),
};

// Corner handles only
export const CornerHandles: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Corner handles only</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top-right" style={{ backgroundColor: '#f97316' }} />
      <Resizable.Handle direction="bottom-right" style={{ backgroundColor: '#f97316' }} />
      <Resizable.Handle direction="bottom-left" style={{ backgroundColor: '#f97316' }} />
      <Resizable.Handle direction="top-left" style={{ backgroundColor: '#f97316' }} />
    </Resizable>
  ),
};

// Multiple handles in different directions
export const MultipleHandles: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Multiple resize handles</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="right" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="bottom" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="left" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="top-right" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="bottom-right" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="bottom-left" style={{ backgroundColor: '#34d399' }} />
      <Resizable.Handle direction="top-left" style={{ backgroundColor: '#34d399' }} />
    </Resizable>
  ),
};

export const CircleShape: Story = {
  args: {
    value: { width: 200, height: 200 },
    minHeight: 100,
    minWidth: 100,
    children: null,
    aspectRatio: true,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <div
          style={{
            backgroundColor: 'lightblue',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          Circle shape with aspect ratio
        </div>
      </Resizable.Content>
      <Resizable.Handle
        direction="top"
        style={{ backgroundColor: '#6b5bca', width: 8, height: 8 }}
      />
      <Resizable.Handle
        direction="bottom"
        style={{ backgroundColor: '#6b5bca', width: 8, height: 8 }}
      />
      <Resizable.Handle
        direction="left"
        style={{ backgroundColor: '#6b5bca', width: 8, height: 8 }}
      />
      <Resizable.Handle
        direction="right"
        style={{ backgroundColor: '#6b5bca', width: 8, height: 8 }}
      />
    </Resizable>
  ),
};

// With aspect ratio preservation (hold Shift while resizing)
export const WithAspectRatio: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
    aspectRatio: false,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          Hold{' '}
          <b>
            <kbd>Shift</kbd>
          </b>{' '}
          while resizing to preserve aspect ratio or pass{' '}
          <b>
            <code>aspectRatio={`{true}`}</code>
          </b>{' '}
          to the component to enable it.
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With content that fills the container
export const WithContent: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
            }}
          >
            Resizable Content
          </h3>
          <p>This content will resize with the container</p>
          <div
            style={{
              marginTop: '1rem',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
            }}
          >
            <p style={{ fontSize: '0.875rem' }}>Some nested content</p>
          </div>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With onChange callback
export const WithCallback: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
    onChange: fn(),
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Check console for resize events</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const Uncontrolled: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content>
          <p>Uncontrolled content</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With very small min dimensions
export const SmallMinDimensions: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 50,
    minHeight: 50,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Can be resized to very small dimensions</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With very large max dimensions
export const LargeMaxDimensions: Story = {
  args: {
    value: { width: 300, height: 200 },
    minWidth: 100,
    minHeight: 100,
    maxWidth: 1200,
    maxHeight: 1000,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content
        style={{
          backgroundColor: '#ebf8ff',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Content>
          <p>Can be resized to very large dimensions</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// Controlled example with state updates
export const ControlledWithState: Story = {
  args: {
    minWidth: 200,
    minHeight: 150,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => {
    const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
    const [resizeCount, setResizeCount] = useState(0);

    const handleResize = ({ width, height }: { width: number; height: number }) => {
      setDimensions({ width, height });
      setResizeCount((prev) => prev + 1);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Resizable {...args} value={dimensions} onChange={handleResize}>
          <Resizable.Content
            style={{
              backgroundColor: '#fdf4ff',
              padding: '1rem',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Content>
              <p>Controlled component with state</p>
              <p>Width: {dimensions.width}px</p>
              <p>Height: {dimensions.height}px</p>
              <p>Resize events: {resizeCount}</p>
            </Content>
          </Resizable.Content>
          <Resizable.Handle
            style={{
              backgroundColor: '#d946ef',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
            }}
          />
        </Resizable>

        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setDimensions({ width: 250, height: 150 })}
            style={{
              backgroundColor: '#d946ef',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              marginRight: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Small
          </button>
          <button
            onClick={() => setDimensions({ width: 400, height: 300 })}
            style={{
              backgroundColor: '#d946ef',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              marginRight: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Medium
          </button>
          <button
            onClick={() => setDimensions({ width: 600, height: 400 })}
            style={{
              backgroundColor: '#d946ef',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Large
          </button>
        </div>
      </div>
    );
  },
};
