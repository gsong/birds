# Image Selection Animation Implementation Plan

## Phase 1: Selection Animation

1. **Track direction in state**

   - Add `direction` state to `useImageSelection` ("left" | "right")
   - Update direction when image is selected

   ```coding-prompt
   File: app/routes/home/hooks/useImageSelection.tsx
   Add direction state and update handleSelect to set direction based on which image was chosen
   ```

2. **Add transition classes to ImageOption**

   ```tsx
   // Conditional classes based on selection state:
   clsx(
     "transition-all duration-500",
     selected && direction === "left" && "-translate-x-full",
     selected && direction === "right" && "translate-x-full",
     !selected && "opacity-0 transition-opacity duration-200",
   );
   ```

   ```coding-prompt
   File: app/routes/home/components/ImageOption.tsx
   Implement clsx conditional classes with Tailwind transitions based on selection state
   ```

3. **Implement simultaneous slide**
   - Both images get translated based on direction
   - Non-selected image fades out faster (200ms)

## Phase 2: Center Stage Transition

1. **Selected image movement**

   ```coding-prompt
   File: app/routes/home/index.tsx
   Add translate-x-0 transition to selected image after sliding animation completes
   ```

   - Animate selected image to center using:

   ```tsx
   "transition-transform duration-500 translate-x-0";
   ```

2. **Add pause duration**
   - Use setTimeout to maintain center position for 500ms
   - Trigger new image load after delay

## Phase 3: New Image Transition

1. **Fade out current image**

   ```coding-prompt
   File: app/routes/home/components/ImageOption.tsx
   Add opacity-0 transition when new images are loading
   ```

   ```tsx
   "opacity-0 transition-opacity duration-200";
   ```

2. **Fade in new images**
   - Initial state for new images: `opacity-0`
   - Mount with:
   ```tsx
   "opacity-100 transition-opacity duration-200";
   ```

## Required State Additions

```coding-prompt
File: app/routes/home/hooks/useImageSelection.tsx
Add animationPhase state machine ('idle' | 'sliding' | 'paused' | 'transitioning')
Track previous/current images and direction in state
```

- Track animation phase: 'idle' | 'sliding' | 'paused' | 'transitioning'
- Direction state for controlling translation direction

## CSS Timeline

```coding-prompt
File: app/routes/home/components/ImageOption.tsx
Implement staggered transitions using Tailwind duration classes:
- transition-all duration-500 for slides
- transition-opacity duration-200 for fades
```

| Phase          | Duration | Transition Properties |
| -------------- | -------- | --------------------- |
| Initial slide  | 500ms    | transform (slide)     |
| Fade out loser | 200ms    | opacity               |
| Pause          | 500ms    | none                  |
| Final fade out | 200ms    | opacity               |
| New image fade | 200ms    | opacity               |
