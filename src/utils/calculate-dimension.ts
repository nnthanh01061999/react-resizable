import { InitDimensions } from '../types';
import { CalculateDimensionsProps } from '../types';

const calculateDimensions = (
  dir: CalculateDimensionsProps['dir'],
  {
    startDimensions,
    deltaX,
    deltaY,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  }: Omit<CalculateDimensionsProps, 'dir'>
) => {
  switch (dir) {
    case 'right':
      return Math.min(Math.max(startDimensions.width + deltaX, minWidth), maxWidth);
    case 'left':
      return Math.min(Math.max(startDimensions.width - deltaX, minWidth), maxWidth);
    case 'bottom':
      return Math.min(Math.max(startDimensions.height + deltaY, minHeight), maxHeight);
    case 'top':
      return Math.min(Math.max(startDimensions.height - deltaY, minHeight), maxHeight);
    default:
      return startDimensions.width;
  }
};

// Maintain aspect ratio
const calculateNewDimensionsAspectRatio = ({
  dir,
  initWidth,
  initHeight,
  ...props
}: CalculateDimensionsProps & InitDimensions) => {
  const ratio = props.startDimensions.width / props.startDimensions.height;
  let width = initWidth;
  let height = initHeight;

  if (dir.includes('right')) {
    width = calculateDimensions('right', props);
    height = width / ratio;
  } else if (dir.includes('left')) {
    width = calculateDimensions('left', props);
    height = width / ratio;
  } else if (dir.includes('bottom')) {
    height = calculateDimensions('bottom', props);
    width = height * ratio;
  } else if (dir.includes('top')) {
    height = calculateDimensions('top', props);
    width = height * ratio;
  }

  return { width, height };
};

// For single directions, only allow resizing in that specific direction
const calculateNewDimensionsSingleDirection = ({
  dir,
  initWidth,
  initHeight,
  ...props
}: CalculateDimensionsProps & InitDimensions) => {
  let width = initWidth;
  let height = initHeight;

  if (dir === 'right') {
    width = calculateDimensions('right', props);
  } else if (dir === 'left') {
    width = calculateDimensions('left', props);
  } else if (dir === 'bottom') {
    height = calculateDimensions('bottom', props);
  } else if (dir === 'top') {
    height = calculateDimensions('top', props);
  }

  return { width, height };
};

const calculateNewDimensionsCorner = ({
  dir,
  initWidth,
  initHeight,
  ...props
}: CalculateDimensionsProps & InitDimensions) => {
  let width = initWidth;
  let height = initHeight;

  if (dir.includes('right')) {
    width = calculateDimensions('right', props);
  } else if (dir.includes('left')) {
    width = calculateDimensions('left', props);
  }

  if (dir.includes('bottom')) {
    height = calculateDimensions('bottom', props);
  } else if (dir.includes('top')) {
    height = calculateDimensions('top', props);
  }

  return { width, height };
};

export const calculateNewDimensions = ({
  aspectRatio,
  ...props
}: CalculateDimensionsProps & InitDimensions & { aspectRatio: boolean }) => {
  const singleDirection = ['top', 'right', 'bottom', 'left'].includes(props.dir);

  if (aspectRatio) {
    return calculateNewDimensionsAspectRatio(props);
  } else if (singleDirection) {
    return calculateNewDimensionsSingleDirection(props);
  } else {
    return calculateNewDimensionsCorner(props);
  }
};
