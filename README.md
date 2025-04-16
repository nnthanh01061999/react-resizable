# @thanhnn/react-resizable

A modern, accessible, and flexible React component library for creating resizable elements with TypeScript support. This library provides a simple yet powerful way to make any element resizable with customizable constraints and callbacks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Controlled Mode](#controlled-mode)
  - [Multiple Resize Handles](#multiple-resize-handles)
  - [Custom Styling](#custom-styling)
  - [Aspect Ratio Lock](#aspect-ratio-lock)
  - [Using the Hook](#using-the-hook)
  - [With Next.js](#with-nextjs)
- [API Reference](#api-reference)
  - [Resizable Component](#resizable-component)
  - [Resizable.Content](#resizablecontent)
  - [Resizable.Handle](#resizablehandle)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🎯 TypeScript support with full type definitions
- ♿️ Accessible with ARIA attributes and keyboard navigation
- 🎨 Customizable resize handles with multiple directions
- 📏 Configurable minimum and maximum dimensions
- 🔄 Aspect ratio locking support (hold Shift or use aspectRatio prop)
- ⌨️ Keyboard shortcuts for resizing
- 🎭 Headless design for maximum flexibility
- 📱 Touch device support
- 📦 Zero dependencies (except React)

## Installation

```bash
npm install @thanhnn/react-resizable
# or
yarn add @thanhnn/react-resizable
# or
pnpm add @thanhnn/react-resizable
```

## Demo

Check out our interactive demo at [https://thanhnn-react-resizable.vercel.app](Demo) to see the component in action and explore various usage examples.

The demo site showcases:

- Basic resizable components
- Different handle configurations
- Custom styling options
- Aspect ratio locking
- Multiple resizable elements
- And more!

You can interact with all examples to get a feel for how the component works in real-time.

## Usage

### Basic Usage

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable
      minWidth={200}
      minHeight={200}
      maxWidth={800}
      maxHeight={600}
      onChange={(width, height) => {
        console.log(`New dimensions: ${width}x${height}`);
      }}
    >
      <Resizable.Content>
        <div>Your content here</div>
      </Resizable.Content>
      <Resizable.Handle direction="bottom-right" />
    </Resizable>
  );
}
```

### Controlled Mode

```tsx
import { Resizable } from '@thanhnn/react-resizable';
import { useState } from 'react';

function App() {
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  return (
    <Resizable
      value={dimensions}
      minWidth={200}
      minHeight={150}
      maxWidth={800}
      maxHeight={600}
      onChange={(width, height) => setDimensions({ width, height })}
    >
      <Resizable.Content>
        <div className="p-4">
          <h2>Controlled Resizable</h2>
          <p>
            Current size: {dimensions.width}x{dimensions.height}
          </p>
        </div>
      </Resizable.Content>
      <Resizable.Handle direction="bottom-right" />
    </Resizable>
  );
}
```

### Multiple Resize Handles

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable minWidth={200} minHeight={200}>
      <Resizable.Content>
        <div className="p-4">
          <h2>Multiple Handles</h2>
          <p>Try resizing from different corners and edges</p>
        </div>
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
  );
}
```

### Custom Styling

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable minWidth={200} minHeight={200}>
      <Resizable.Content className="bg-blue-50 rounded-lg shadow-lg">
        <div className="p-4">
          <h2>Custom Styled Content</h2>
          <p>With custom background and shadow</p>
        </div>
      </Resizable.Content>
      <Resizable.Handle
        direction="bottom-right"
        className="bg-blue-500 hover:bg-blue-600 rounded-full w-4 h-4"
      />
    </Resizable>
  );
}
```

### Aspect Ratio Lock

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable
      minWidth={200}
      minHeight={200}
      aspectRatio={true} // Lock aspect ratio during resize
    >
      <Resizable.Content>
        <div className="p-4">
          <h2>Locking Aspect Ratio</h2>
          <p>This content maintains aspect ratio while resizing</p>
        </div>
      </Resizable.Content>
      <Resizable.Handle direction="bottom-right" />
    </Resizable>
  );
}
```

### Using the Hook

```tsx
import { useResizable } from '@thanhnn/react-resizable';

function CustomResizable() {
  const { width, height, isResizing, getResizeHandleProps } = useResizable({
    minWidth: 200,
    minHeight: 200,
    onChange: (width, height) => {
      console.log(`Resizing to: ${width}x${height}`);
    },
  });

  return (
    <div style={{ width, height }} className="relative">
      <div className="p-4">
        <h2>Custom Implementation</h2>
        <p>Using the useResizable hook directly</p>
      </div>
      <div
        {...getResizeHandleProps('bottom-right')}
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
      />
    </div>
  );
}
```

### With Next.js

```tsx
'use client';

import { Resizable } from '@thanhnn/react-resizable';

export default function ResizableDemoPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Resizable Component in Next.js</h1>
      <Resizable minWidth={300} minHeight={200}>
        <Resizable.Content className="bg-gray-100 rounded p-4">
          <p>Resize me in your Next.js application!</p>
        </Resizable.Content>
        <Resizable.Handle direction="bottom-right" />
      </Resizable>
    </div>
  );
}
```

## API Reference

### Resizable Component

The main component that wraps your resizable content.

#### Props

| Prop          | Type                                    | Default  | Description                     |
| ------------- | --------------------------------------- | -------- | ------------------------------- |
| `value`       | { width: number; height: number }       | -        | Controlled dimensions           |
| `minWidth`    | number                                  | 50       | Minimum width in pixels         |
| `minHeight`   | number                                  | 50       | Minimum height in pixels        |
| `maxWidth`    | number                                  | Infinity | Maximum width in pixels         |
| `maxHeight`   | number                                  | Infinity | Maximum height in pixels        |
| `aspectRatio` | boolean                                 | false    | Lock aspect ratio during resize |
| `onChange`    | (width: number, height: number) => void | -        | Callback when dimensions change |

### Resizable.Content

The content component that will be resized.

#### Props

| Prop       | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `children` | ReactNode | -       | Content to be rendered |

### Resizable.Handle

The resize handle component that users can drag to resize.

#### Props

| Prop        | Type                                                                                                   | Default        | Description                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------- | ------------------------------ |
| `direction` | 'top' \| 'right' \| 'bottom' \| 'left' \| 'top-right' \| 'bottom-right' \| 'bottom-left' \| 'top-left' | 'bottom-right' | Direction of the resize handle |

> **Note:** The Resizable, Resizable.Content, Resizable.Handle component extends standard HTML div element props, allowing you to use className, style, and other div attributes.

## Keyboard Navigation

- `Enter`: Start resizing
- `Escape`: Stop resizing
- `Shift`: Hold `Shift` for locking aspect ratio

## Accessibility

The component is built with accessibility in mind:

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- Touch device support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To set up the development environment:

```bash
# Clone the repository
git clone https://github.com/nnthanh01061999/react-resizable.git
cd react-resizable

# Install dependencies
npm install
# or
pnpm install

# Start Storybook for development
npm run storybook
# or
pnpm storybook

# Build the library
npm run build
# or
pnpm build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Fork the repository
- Create your feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

## License

MIT © [nnthanh01061999](https://github.com/nnthanh01061999)
