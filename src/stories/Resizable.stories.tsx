import Resizable from '@/components/Resizable';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-gray-100 p-4">
        <div className="h-full w-full flex items-center justify-center">
          Resize me using the handle
        </div>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const WithMinMaxConstraints: Story = {
  args: {
    width: 300,
    height: 200,
    minWidth: 200,
    minHeight: 150,
    maxWidth: 500,
    maxHeight: 400,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-blue-100 p-4">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <p>Min: 200x150</p>
            <p>Max: 500x400</p>
            <p>
              Press <kbd>Shift</kbd> for keep aspect ratio
            </p>
          </div>
        </div>
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
      <Resizable.Content className="bg-green-100 p-4">
        <div className="h-full w-full flex items-center justify-center">Custom resize handle</div>
      </Resizable.Content>
      <Resizable.Handle className="bg-green-500 w-3 h-3 hover:bg-green-600 rounded-br" />
    </Resizable>
  ),
};

export const WithMultipleHandles: Story = {
  args: {
    width: 300,
    height: 200,
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-purple-100 p-4">
        <div className="h-full w-full flex items-center justify-center">
          Multiple resize handles
        </div>
      </Resizable.Content>
      <Resizable.Handles
        directions={[
          'top',
          'right',
          'bottom',
          'left',
          'top-right',
          'bottom-right',
          'bottom-left',
          'top-left',
        ]}
      />
    </Resizable>
  ),
};

export const WithCallback: Story = {
  args: {
    width: 300,
    height: 200,
    onResize: (width, height) => {
      console.log(`Resized to: ${width}x${height}`);
    },
    children: null,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content className="bg-purple-100 p-4">
        <div className="h-full w-full flex items-center justify-center">
          Check console for resize events
        </div>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};
