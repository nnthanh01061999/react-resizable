import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Resizable, ResizeDirection } from '../src';

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
    aspectRatio: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Resizable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sharedArgs = {
  value: { width: 300, height: 200 },
  minWidth: 100,
  minHeight: 100,
  maxWidth: 800,
  maxHeight: 600,
  children: undefined,
};

const contentStyle: React.CSSProperties = {
  backgroundColor: '#ebf8ff',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const Content = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      border: '1px solid #000',
      borderRadius: 8,
      ...style,
    }}
  >
    <code style={{ textAlign: 'center' }}>{children}</code>
  </div>
);

export const Default: Story = {
  args: sharedArgs,
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content>Drag the bottom-right corner to resize</Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const CustomHandle: Story = {
  args: sharedArgs,
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content>Custom styled handle</Content>
      </Resizable.Content>
      <Resizable.Handle
        style={{
          backgroundColor: '#ef4444',
          width: 24,
          height: 24,
          borderRadius: '50%',
        }}
      >
        <span className="sr-only">Resize</span>
      </Resizable.Handle>
    </Resizable>
  ),
};

export const SingleDirectionHandles: Story = {
  args: sharedArgs,
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content style={{ border: 'none' }}>Single direction handles</Content>
      </Resizable.Content>
      {['top', 'right', 'bottom', 'left'].map((dir) => (
        <Resizable.Handle
          key={dir}
          direction={dir as ResizeDirection}
          style={{ backgroundColor: '#6b5bca' }}
        />
      ))}
    </Resizable>
  ),
};

export const CornerHandles: Story = {
  args: sharedArgs,
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content>Corner handles only</Content>
      </Resizable.Content>
      {['top-right', 'bottom-right', 'bottom-left', 'top-left'].map((dir) => (
        <Resizable.Handle
          key={dir}
          direction={dir as ResizeDirection}
          style={{ backgroundColor: '#f97316' }}
        />
      ))}
    </Resizable>
  ),
};

export const MultipleHandles: Story = {
  args: sharedArgs,
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content style={{ border: 'none' }}>All directions and corner handles</Content>
      </Resizable.Content>
      {[
        'top',
        'right',
        'bottom',
        'left',
        'top-right',
        'bottom-right',
        'bottom-left',
        'top-left',
      ].map((dir) => (
        <Resizable.Handle
          key={dir}
          direction={dir as ResizeDirection}
          style={{ backgroundColor: '#34d399' }}
        />
      ))}
    </Resizable>
  ),
};

export const CircleShape: Story = {
  args: {
    ...sharedArgs,
    value: { width: 200, height: 200 },
    aspectRatio: true,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content>
        <Content
          style={{
            borderRadius: '50%',
          }}
        >
          Circle shape with aspect ratio
        </Content>
      </Resizable.Content>
      {['top', 'right', 'bottom', 'left'].map((dir) => (
        <Resizable.Handle
          key={dir}
          direction={dir as ResizeDirection}
          style={{ backgroundColor: '#6b5bca', width: 8, height: 8 }}
        />
      ))}
    </Resizable>
  ),
};

export const WithImage: Story = {
  args: {
    ...sharedArgs,
    value: { width: 300, height: 200 },
    aspectRatio: true,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content asChild>
        <img src="https://placehold.co/300x200" alt="Placeholder" style={{ objectFit: 'cover' }} />
      </Resizable.Content>
      {[
        'left',
        'top',
        'bottom',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].map((dir) => (
        <Resizable.Handle
          key={dir}
          direction={dir as ResizeDirection}
          style={{ width: 6, height: 6 }}
        />
      ))}
    </Resizable>
  ),
};

export const WithAspectRatio: Story = {
  args: {
    ...sharedArgs,
    aspectRatio: true,
  },
  render: (args) => (
    <Resizable {...args}>
      <Resizable.Content style={contentStyle}>
        <Content>
          Hold{' '}
          <b>
            <kbd>Shift</kbd>
          </b>{' '}
          while resizing to preserve aspect ratio or pass{' '}
          <b>
            <code>aspectRatio</code>
          </b>{' '}
          to the component to enable it.
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const LiveSizeFeedback: Story = {
  args: {
    ...sharedArgs,
  },
  render: (args) => {
    const [size, setSize] = React.useState(args.value);
    return (
      <Resizable {...args} value={size} onChange={setSize}>
        <Resizable.Content style={contentStyle}>
          <Content>
            Width: {size?.width}px
            <br />
            Height: {size?.height}px
          </Content>
        </Resizable.Content>
        <Resizable.Handle />
      </Resizable>
    );
  },
};

export const Controlled: Story = {
  args: {
    ...sharedArgs,
  },
  render: (args) => {
    const [size, setSize] = useState(args.value);
    return (
      <Resizable {...args} value={size} onChange={setSize}>
        <Resizable.Content style={contentStyle}>
          <Content>
            Width: {size?.width}px
            <br />
            Height: {size?.height}px
          </Content>
        </Resizable.Content>
        <Resizable.Handle />
      </Resizable>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    ...sharedArgs,
  },
  render: () => (
    <Resizable>
      <Resizable.Content style={contentStyle}>
        <Content>
          <div style={{ padding: 10 }}>Uncontrolled</div>
        </Content>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  ),
};

export const TriggerModeComparison: Story = {
  args: {
    children: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the different `triggerMode` options for triggering onChange events.',
      },
    },
  },
  render: () => {
    return (
      <code style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
        <h2 style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          TriggerMode Comparison
        </h2>

        <p style={{ textAlign: 'center' }}>
          Compare how updates happen with different triggerMode settings
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <TriggerModeExample mode="resize" />
          <TriggerModeExample mode="end" />
          <TriggerModeExample mode="both" />
        </div>
      </code>
    );
  },
};

// Component to demonstrate each triggerMode
const TriggerModeExample = ({ mode }: { mode: 'resize' | 'end' | 'both' }) => {
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [updates, setUpdates] = useState<{ width: number; height: number; time: number }[]>([]);
  const updateCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // Clear updates after 3 seconds of inactivity
  useEffect(() => {
    if (updates.length > 0) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setUpdates([]);
        updateCountRef.current = 0;
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [updates]);

  const handleChange = (newSize: { width: number; height: number }) => {
    setSize(newSize);
    updateCountRef.current += 1;

    // Keep only the last 5 updates to avoid cluttering the UI
    setUpdates((prev) => [{ ...newSize, time: Date.now() }, ...prev.slice(0, 4)]);
  };

  const handleResizeStart = () => {
    setUpdates([]);
    updateCountRef.current = 0;
  };

  // Get color based on mode
  const getColor = useCallback(() => {
    switch (mode) {
      case 'resize':
        return '#0ea5e9'; // blue
      case 'end':
        return '#f97316'; // orange
      case 'both':
        return '#8b5cf6'; // purple
      default:
        return '#000000';
    }
  }, [mode]);

  const getDescription = useCallback(() => {
    switch (mode) {
      case 'resize':
        return 'Updates continuously while resizing';
      case 'end':
        return 'Updates only when resize completes';
      case 'both':
        return 'Updates during resize and when complete';
      default:
        return '';
    }
  }, [mode]);

  return (
    <code
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h3
        style={{
          padding: 8,
          marginBottom: 16,
          backgroundColor: getColor(),
          color: 'white',
          borderRadius: 4,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        triggerMode: "{mode}"
      </h3>

      <p style={{ fontSize: 14, marginBottom: 16, textAlign: 'center', height: 40 }}>
        {getDescription()}
      </p>

      <Resizable
        value={size}
        onChange={handleChange}
        triggerMode={mode}
        minWidth={100}
        minHeight={100}
        maxWidth={280}
        maxHeight={250}
      >
        <Resizable.Content
          style={{
            backgroundColor: `${getColor()}`,
            padding: '1rem',
            borderRadius: '0.375rem',
            transition: 'background-color 0.2s',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: `2px solid ${getColor()}`,
          }}
        >
          <Content>
            <div>Width: {size.width}px</div>
            <div>Height: {size.height}px</div>
          </Content>
        </Resizable.Content>
        <Resizable.Handle
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          direction="bottom-right"
          style={{
            backgroundColor: getColor(),
          }}
        />
      </Resizable>

      <div
        style={{
          backgroundColor: '#f1f5f9',
          padding: 8,
          borderRadius: 4,
          fontSize: 13,
          height: 120,
          overflowY: 'auto',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Latest Updates:</div>
        {updates.length === 0 ? (
          <div style={{ color: '#64748b', fontStyle: 'italic' }}>
            No updates yet. Resize to see.
          </div>
        ) : (
          <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
            {updates.map((update, index) => (
              <li key={index} style={{ marginBottom: 4 }}>
                {update.width}×{update.height}
              </li>
            ))}
          </ul>
        )}
      </div>
    </code>
  );
};

// Add a new story for asChild
export const AsChild: Story = {
  args: {
    ...sharedArgs,
    asChild: true,
  },
  render: (args) => (
    <Resizable {...args}>
      <div>
        <Resizable.Content asChild>
          <button>Resizable Button (using asChild)</button>
        </Resizable.Content>
        <Resizable.Handle asChild>
          <div>I'm Children</div>
        </Resizable.Handle>
      </div>
    </Resizable>
  ),
};
