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
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => {
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
      Resizable Content{' '}
      <code style={{ fontSize: '12px', padding: '10px' }}>
        Hold <kbd>Shift</kbd> to retain aspect ratio
      </code>
    </div>
  );
};

export const Default: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
    minWidth: 200,
    minHeight: 200,
    maxWidth: 600,
    maxHeight: 400,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content />
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const WithCustomHandle: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content />
      </Resizable.Content>
      <Resizable.Handle
        style={{
          backgroundColor: 'yellow',
          width: '10px',
          height: '10px',
        }}
      />
      <Resizable.Handle
        direction="top-right"
        style={{
          backgroundColor: 'blue',
          width: '20px',
          height: '20px',
        }}
      />
      <Resizable.Handle
        direction="bottom-left"
        style={{
          backgroundColor: 'green',
          width: '5px',
          height: '5px',
        }}
      />
      <Resizable.Handle
        direction="top-left"
        style={{
          backgroundColor: 'red',
          width: '15px',
          height: '15px',
        }}
      />
    </Resizable>
  ),
};

export const WithMultipleDirectionHandles: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content />
      </Resizable.Content>
      <Resizable.Handle direction="top" />
      <Resizable.Handle direction="right" />
      <Resizable.Handle direction="bottom" />
      <Resizable.Handle direction="left" />
      <Resizable.Handle direction="top-right" />
      <Resizable.Handle direction="bottom-right" />
      <Resizable.Handle direction="bottom-left" />
      <Resizable.Handle direction="top-left" />
    </Resizable>
  ),
};

export const WithSingleDirectionHandles: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content />
      </Resizable.Content>
      <Resizable.Handle direction="right" />
    </Resizable>
  ),
};

export const WithCallbackFunction: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
    onResize: fn(),
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content />
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};
