Animation steps:

1. **Image Selection**: When an image is selected:
   - If the left image is clicked, both images slide to the right.
   - If the right image is clicked, both images slide to the left.
2. **Image Transition (Selected Image)**:
   - The non-selected image fades out in 0.2 seconds as it's sliding.
   - The selected image slides into the center in 0.5 seconds.
3. **Pause**: The selected image stays in the center for 0.5 seconds.
4. **New Image Set Transition**: When a new set of images is loaded:
   - The currently displayed (selected) image fades out.
   - The new images fade in, with a transition duration of 0.2 seconds.

Implementation hints:

- Use Tailwind 4 for animation if possible.
- Use `clsx` to compose the styles if it's easier.
- Minimize complexity.
