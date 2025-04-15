// type TCalculateDimensionsProps = {
//   startDimensions: { width: number; height: number };
//   deltaX: number;
//   deltaY: number;
//   dir: ResizeDirection;
//   minWidth: number;
//   maxWidth: number;
//   minHeight: number;
//   maxHeight: number;
// };

// type TInitDimensions = {
//   initWidth: number;
//   initHeight: number;
// };

// const calculateDimensions = ({
//   startDimensions,
//   deltaX,
//   deltaY,
//   dir,
//   minWidth,
//   maxWidth,
//   minHeight,
//   maxHeight,
// }: TCalculateDimensionsProps) => {
//   switch (dir) {
//     case 'right':
//       return Math.min(Math.max(startDimensions.width + deltaX, minWidth), maxWidth);
//     case 'left':
//       return Math.min(Math.max(startDimensions.width - deltaX, minWidth), maxWidth);
//     case 'bottom':
//       return Math.min(Math.max(startDimensions.height + deltaY, minHeight), maxHeight);
//     case 'top':
//       return Math.min(Math.max(startDimensions.height - deltaY, minHeight), maxHeight);
//     default:
//       return startDimensions.width;
//   }
// };

// // Maintain aspect ratio
// const calculateNewDimensionsAspectRatio = ({
//   startDimensions,
//   dir,

//   initWidth,
//   initHeight,
//   ...props
// }: TCalculateDimensionsProps & TInitDimensions) => {
//   const ratio = startDimensions.width / startDimensions.height;
//   let width = initWidth;
//   let height = initHeight;

//   const newDimension = calculateDimensions({
//     startDimensions,
//     dir,
//     ...props,
//   });

//   if (dir.includes('right')) {
//     width = newDimension;
//     height = width / ratio;
//   } else if (dir.includes('left')) {
//     width = newDimension;
//     height = width / ratio;
//   } else if (dir.includes('bottom')) {
//     height = newDimension;
//     width = height * ratio;
//   } else if (dir.includes('top')) {
//     height = newDimension;
//     width = height * ratio;
//   }

//   return { width, height };
// };

// // For single directions, only allow resizing in that specific direction
// const calculateNewDimensionsSingleDirection = ({
//   dir,
//   initWidth,
//   initHeight,
//   ...props
// }: TCalculateDimensionsProps & TInitDimensions) => {
//   let width = initWidth;
//   let height = initHeight;

//   const newDimension = calculateDimensions({ dir, ...props });

//   if (dir === 'right') {
//     width = newDimension;
//   } else if (dir === 'left') {
//     width = newDimension;
//   } else if (dir === 'bottom') {
//     height = newDimension;
//   } else if (dir === 'top') {
//     height = newDimension;
//   }

//   return { width, height };
// };

// const calculateNewDimensionsCorner = ({
//   dir,
//   initWidth,
//   initHeight,
//   ...props
// }: TCalculateDimensionsProps & TInitDimensions) => {
//   let width = initWidth;
//   let height = initHeight;

//   const newDimension = calculateDimensions({ dir, ...props });

//   if (dir.includes('right')) {
//     width = newDimension;
//   } else if (dir.includes('left')) {
//     width = newDimension;
//   }

//   if (dir.includes('bottom')) {
//     height = newDimension;
//   } else if (dir.includes('top')) {
//     height = newDimension;
//   }
//   return { width, height };
// };

// const calculateNewDimensions = ({
//   aspectRatio,
//   singleDirection,
//   ...props
// }: TCalculateDimensionsProps &
//   TInitDimensions & { aspectRatio: boolean; singleDirection: boolean }) => {
//   if (aspectRatio) {
//     return calculateNewDimensionsAspectRatio(props);
//   } else if (singleDirection) {
//     return calculateNewDimensionsSingleDirection(props);
//   } else {
//     return calculateNewDimensionsCorner(props);
//   }
// };
