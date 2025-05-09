# @thanhnn/react-resizable

**A modern, accessible, and customizable React component library for creating resizable elements with TypeScript.**  
Perfect for dashboards, editors, modals, and any dynamic layout requiring user-resizable components.

[![NPM version](https://img.shields.io/npm/v/@thanhnn/react-resizable)](https://www.npmjs.com/package/@thanhnn/react-resizable)  
[Live Demo ↗](https://thanhnn-react-resizable.vercel.app)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/nnthanh01061999/react-resizable)

---

## Table of Contents

- [✨ Features](#-features)
- [📦 Installation](#-installation)
- [🚀 Demo](#-demo)
- [🛠️ Usage](#-usage)
  - [Basic](#basic)
  - [Controlled](#controlled)
  - [Multiple Handles](#multiple-handles)
  - [Custom Styling](#custom-styling)
  - [Aspect Ratio](#aspect-ratio)
  - [With useResizable Hook](#with-useresizable-hook)
  - [With Next.js](#with-nextjs)
- [📘 API Reference](#-api-reference)
- [⌨️ Keyboard Navigation](#️-keyboard-navigation)
- [♿ Accessibility](#-accessibility)
- [🌐 Browser Support](#-browser-support)
- [🧑‍💻 Development](#-development)
- [🤝 Contributing](#-contributing)
- [🪪 License](#-license)

---

## ✨ Features

- 🧩 **Composable & Flexible** – Headless design lets you style freely.
- ⚙️ **Fully Typed** – Built with TypeScript for great DX.
- ♿ **Accessible** – ARIA attributes, keyboard support, and screen reader-friendly.
- 🎯 **Precise Constraints** – Control min/max dimensions and aspect ratio.
- 🔗 **Keyboard + Mouse + Touch** – Works on all input devices.
- 🔄 **Controlled & Uncontrolled Modes** – Choose how you manage state.

---

## 📦 Installation

```bash
npm install @thanhnn/react-resizable
# or
yarn add @thanhnn/react-resizable
# or
pnpm add @thanhnn/react-resizable
```

---

## 🚀 Demo

Live demo: [https://thanhnn-react-resizable.vercel.app](https://thanhnn-react-resizable.vercel.app)  
Explore:

- Basic resizable behavior
- Custom handles and styling
- Multiple handles
- Aspect ratio locking
- Controlled/Uncontrolled usage
- `useResizable` hook

---

## 🛠️ Usage

### Basic

```tsx
import { Resizable } from '@thanhnn/react-resizable';

<Resizable>
  <Resizable.Content>Your content</Resizable.Content>
  <Resizable.Handle />
</Resizable>;
```

### Controlled

```tsx
const [size, setSize] = useState({ width: 300, height: 200 });

<Resizable value={size} onChange={(w, h) => setSize({ width: w, height: h })}>
  <Resizable.Content>Your content</Resizable.Content>
  <Resizable.Handle direction="bottom-right" />
</Resizable>;
```

### Multiple Handles

```tsx
<Resizable minWidth={200} minHeight={200}>
  <Resizable.Content>Your content</Resizable.Content>
  <Resizable.Handle direction="top" />
  <Resizable.Handle direction="right" />
  <Resizable.Handle direction="bottom" />
  <Resizable.Handle direction="left" />
  <Resizable.Handle direction="top-right" />
  <Resizable.Handle direction="bottom-right" />
  <Resizable.Handle direction="bottom-left" />
  <Resizable.Handle direction="top-left" />
</Resizable>
```

### Custom Styling

```tsx
<Resizable minWidth={200} minHeight={200}>
  <Resizable.Content className="bg-gray-100 rounded-lg shadow-lg p-4">
    Custom styled content
  </Resizable.Content>
  <Resizable.Handle
    direction="bottom-right"
    className="w-4 h-4 bg-blue-500 rounded-full hover:bg-blue-600"
  />
</Resizable>
```

### Aspect Ratio

```tsx
<Resizable minWidth={200} minHeight={200} aspectRatio>
  <Resizable.Content>Aspect-ratio locked</Resizable.Content>
  <Resizable.Handle direction="bottom-right" />
</Resizable>
```

### With `useResizable` Hook

```tsx
const { width, height, getResizeHandleProps } = useResizable({
  minWidth: 200,
  minHeight: 200,
  triggerMode: 'resize',
});

<div style={{ width, height }}>
  Custom content
  <div {...getResizeHandleProps('bottom-right')} />
</div>;
```

### With Next.js

```tsx
'use client';

import { Resizable } from '@thanhnn/react-resizable';

export default function Page() {
  return (
    <Resizable minWidth={300} minHeight={200}>
      <Resizable.Content className="p-4">Next.js ready</Resizable.Content>
      <Resizable.Handle direction="bottom-right" />
    </Resizable>
  );
}
```

### Using `asChild`

Render the `Resizable` component as its direct child element, merging props and behavior. Useful for applying resizable functionality to existing components without extra wrappers. Requires `@radix-ui/react-slot` to be installed.

```tsx
import { Resizable } from '@thanhnn/react-resizable';

<Resizable asChild>
  <button className="my-resizable-button">
    Resizable Button
    <Resizable.Handle />
  </button>
</Resizable>;
```

---

## 📘 API Reference

### `<Resizable />`

| Prop          | Type                                | Default    | Description              |
| ------------- | ----------------------------------- | ---------- | ------------------------ |
| `value`       | `{ width: number; height: number }` | –          | Controlled size          |
| `minWidth`    | `number`                            | `50`       | Minimum width (px)       |
| `minHeight`   | `number`                            | `50`       | Minimum height (px)      |
| `maxWidth`    | `number`                            | `Infinity` | Maximum width (px)       |
| `maxHeight`   | `number`                            | `Infinity` | Maximum height (px)      |
| `aspectRatio` | `boolean`                           | `false`    | Lock aspect ratio        |
| `triggerMode` | `'resize'` \| `'end'` \| `'both'`   | `'resize'` | When to trigger onChange |
| `onChange`    | `(w: number, h: number) => void`    | –          | Resize callback          |
| `asChild`     | `boolean`                           | `false`    | Render as direct child   |

**triggerMode options:**

- `'resize'`: (Default) onChange triggered continuously during resizing
- `'end'`: onChange triggered only once at the end of resize
- `'both'`: onChange triggered during resize and again at the end

### `<Resizable.Content />`

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| `asChild` | `boolean` | `false` | Render as direct child |

### `<Resizable.Handle />`

| Prop        | Type                                                                                                   | Default        | Description                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------- | ------------------------------ |
| `direction` | 'top' \| 'right' \| 'bottom' \| 'left' \| 'top-right' \| 'bottom-right' \| 'bottom-left' \| 'top-left' | 'bottom-right' | Direction of the resize handle |
| `asChild`   | `boolean`                                                                                              | `false`        | Render as direct child         |

> All components accept `div` props like `className`, `style`, `id`, etc.

---

## ⌨️ Keyboard Navigation

- `Enter`: Start resizing
- `Escape`: Cancel resizing
- `Shift`: Hold `Shift` for lock aspect ratio

---

## ♿ Accessibility

Built with accessibility in mind:

- Proper ARIA roles
- Focusable handles
- Keyboard support
- Touch device support

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🧑‍💻 Development

```bash
git clone https://github.com/nnthanh01061999/react-resizable.git
cd react-resizable
pnpm install
pnpm storybook  # Launch Storybook
pnpm build      # Build the library
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Fork the repository
- Create your feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

## 🪪 License

MIT © [@nnthanh01061999](https://github.com/nnthanh01061999)
