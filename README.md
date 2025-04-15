# @thanhnn/react-resizable

A modern, lightweight React component library for creating resizable elements with TypeScript support. Built with a headless component pattern for maximum flexibility.

## Features

- 🎯 TypeScript support
- 🎨 Headless component pattern
- 🎭 Customizable styling with Tailwind CSS
- 📏 Min/max size constraints
- 🔄 Aspect ratio preservation (hold Shift while resizing)
- ♿ Accessibility support
- 📱 Touch device support
- 🧪 Comprehensive test coverage
- 📚 Storybook documentation

## Installation

```bash
npm install @thanhnn/react-resizable
# or
yarn add @thanhnn/react-resizable
```

## Usage

### Basic Usage

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  const handleResize = (width: number, height: number) => {
    console.log('New dimensions:', width, height);
  };

  return (
    <Resizable
      width={200}
      height={200}
      minWidth={100}
      minHeight={100}
      maxWidth={400}
      maxHeight={400}
      onResize={handleResize}
    >
      <Resizable.Content className="bg-blue-100 p-4">
        <p>Resizable content</p>
        <p>Drag the bottom-right corner to resize</p>
      </Resizable.Content>
      <Resizable.Handle />
    </Resizable>
  );
}
```

### Custom Handle

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable width={200} height={200}>
      <Resizable.Content className="bg-blue-100 p-4">
        <p>Custom resize handle</p>
      </Resizable.Content>
      <Resizable.Handle className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-blue-500 rounded-full">
        <span className="sr-only">Resize</span>
        {/* Your custom handle content */}
      </Resizable.Handle>
    </Resizable>
  );
}
```

### Multiple Handles

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable width={200} height={200}>
      <Resizable.Content className="bg-blue-100 p-4">
        <p>Multiple resize handles</p>
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
        className="bg-green-500"
      />
    </Resizable>
  );
}
```

### Single Direction Handles

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable width={200} height={200}>
      <Resizable.Content className="bg-blue-100 p-4">
        <p>Single direction handles</p>
      </Resizable.Content>
      <Resizable.Handles
        directions={['top', 'right', 'bottom', 'left']}
        className="bg-purple-500"
      />
    </Resizable>
  );
}
```

### Corner Handles

```tsx
import { Resizable } from '@thanhnn/react-resizable';

function App() {
  return (
    <Resizable width={200} height={200}>
      <Resizable.Content className="bg-blue-100 p-4">
        <p>Corner handles</p>
      </Resizable.Content>
      <Resizable.Handles
        directions={['top-right', 'bottom-right', 'bottom-left', 'top-left']}
        className="bg-orange-500"
      />
    </Resizable>
  );
}
```

### Using the Hook Directly

```tsx
import { useResizable } from '@thanhnn/react-resizable';

function CustomResizable() {
  const { width, height, getResizeHandleProps } = useResizable({
    width: 200,
    height: 200,
    minWidth: 100,
    minHeight: 100,
  });

  return (
    <div style={{ width, height }}>
      <div>Your content</div>
      <button {...getResizeHandleProps()}>Resize</button>
    </div>
  );
}
```

## Props

### Resizable Component Props

| Prop      | Type                                    | Default   | Description                                           |
| --------- | --------------------------------------- | --------- | ----------------------------------------------------- |
| width     | number                                  | 200       | Initial width of the resizable element                |
| height    | number                                  | 200       | Initial height of the resizable element               |
| minWidth  | number                                  | 50        | Minimum width constraint                              |
| minHeight | number                                  | 50        | Minimum height constraint                             |
| maxWidth  | number                                  | Infinity  | Maximum width constraint                              |
| maxHeight | number                                  | Infinity  | Maximum height constraint                             |
| onResize  | (width: number, height: number) => void | undefined | Callback function when resizing                       |
| children  | React.ReactNode                         | required  | Content to be rendered inside the Resizable component |

### Resizable.Content Props

| Prop      | Type                | Default  | Description                                         |
| --------- | ------------------- | -------- | --------------------------------------------------- |
| children  | React.ReactNode     | required | Content to be rendered inside the resizable element |
| className | string              | ''       | Additional CSS classes                              |
| style     | React.CSSProperties | {}       | Additional inline styles                            |

### Resizable.Handle Props

| Prop      | Type                | Default                                              | Description                              |
| --------- | ------------------- | ---------------------------------------------------- | ---------------------------------------- |
| children  | React.ReactNode     | undefined                                            | Content to be rendered inside the handle |
| className | string              | 'absolute bottom-0 right-0 w-4 h-4 cursor-se-resize' | CSS classes for the handle               |
| style     | React.CSSProperties | {}                                                   | Additional inline styles                 |
| direction | ResizeDirection     | 'bottom-right'                                       | Direction of the resize handle           |

### Resizable.Handles Props

| Prop       | Type              | Default          | Description                         |
| ---------- | ----------------- | ---------------- | ----------------------------------- |
| directions | ResizeDirection[] | ['bottom-right'] | Array of directions for the handles |
| className  | string            | ''               | CSS classes applied to all handles  |

### useResizable Hook Props

| Prop      | Type                                    | Default   | Description                     |
| --------- | --------------------------------------- | --------- | ------------------------------- |
| width     | number                                  | 200       | Initial width                   |
| height    | number                                  | 200       | Initial height                  |
| minWidth  | number                                  | 50        | Minimum width constraint        |
| minHeight | number                                  | 50        | Minimum height constraint       |
| maxWidth  | number                                  | Infinity  | Maximum width constraint        |
| maxHeight | number                                  | Infinity  | Maximum height constraint       |
| onResize  | (width: number, height: number) => void | undefined | Callback function when resizing |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build the library
npm run build

# Start Storybook
npm run storybook
```

## Publishing

```bash
# Login to npm with your account
npm login

# Build the package
npm run build

# Publish the package
npm publish --access public
```

## License

MIT © [nnthanh01061999]
