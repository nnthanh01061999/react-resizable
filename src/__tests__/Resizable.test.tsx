import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Resizable from '../components/Resizable';

describe('Resizable', () => {
  it('renders with default props', () => {
    const { container } = render(
      <Resizable>
        <div>Test content</div>
      </Resizable>
    );

    expect(container.firstChild).toHaveStyle({
      width: '200px',
      height: '200px',
    });
  });

  it('renders with custom dimensions', () => {
    const { container } = render(
      <Resizable width={300} height={400}>
        <div>Test content</div>
      </Resizable>
    );

    expect(container.firstChild).toHaveStyle({
      width: '300px',
      height: '400px',
    });
  });

  it('calls onResize when resizing', () => {
    const handleResize = jest.fn();
    const { container } = render(
      <Resizable onResize={handleResize}>
        <div>Test content</div>
      </Resizable>
    );

    const resizeHandle = container.querySelector('[role="button"]');
    fireEvent.mouseDown(resizeHandle!);
    fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(document);

    expect(handleResize).toHaveBeenCalled();
  });
});
