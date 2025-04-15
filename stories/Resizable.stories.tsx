import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Resizable } from '../src';
import React from 'react';

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
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
      {children}
    </div>
  );
};

export const Default: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
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
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Custom styled handle</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
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

// Multiple handles in different directions
export const MultipleHandles: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Multiple resize handles</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top" className="bg-green-500" />
      <Resizable.Handle direction="right" className="bg-green-500" />
      <Resizable.Handle direction="bottom" className="bg-green-500" />
      <Resizable.Handle direction="left" className="bg-green-500" />
      <Resizable.Handle direction="top-right" className="bg-green-500" />
      <Resizable.Handle direction="bottom-right" className="bg-green-500" />
      <Resizable.Handle direction="bottom-left" className="bg-green-500" />
      <Resizable.Handle direction="top-left" className="bg-green-500" />
    </Resizable>
  ),
};

// Single direction handles (top, right, bottom, left)
export const SingleDirectionHandles: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Single direction handles</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top" className="bg-purple-500" />
      <Resizable.Handle direction="right" className="bg-purple-500" />
      <Resizable.Handle direction="bottom" className="bg-purple-500" />
      <Resizable.Handle direction="left" className="bg-purple-500" />
    </Resizable>
  ),
};

// Corner handles only
export const CornerHandles: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Corner handles only</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle direction="top-right" className="bg-orange-500" />
      <Resizable.Handle direction="bottom-right" className="bg-orange-500" />
      <Resizable.Handle direction="bottom-left" className="bg-orange-500" />
      <Resizable.Handle direction="top-left" className="bg-orange-500" />
    </Resizable>
  ),
};

// With aspect ratio preservation (hold Shift while resizing)
export const WithAspectRatio: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>
            Hold <kbd>Shift</kbd> while resizing to preserve aspect ratio
          </p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With content that fills the container
export const WithContent: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <h3 className="text-lg font-bold mb-2">Resizable Content</h3>
          <p>This content will resize with the container</p>
          <div className="mt-4 p-2 bg-white rounded">
            <p className="text-sm">Some nested content</p>
          </div>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With onResize callback
export const WithCallback: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
    onResize: fn(),
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Check console for resize events</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

// With very small min dimensions
export const SmallMinDimensions: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 800,
    maxHeight: 600,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
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
    width: 300,
    height: 200,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 1200,
    maxHeight: 1000,
    direction: 'bottom-right',
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4 rounded-md shadow-md">
        <Content>
          <p>Can be resized to very large dimensions</p>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};
