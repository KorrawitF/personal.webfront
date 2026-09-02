import type { Preview } from '@storybook/nextjs-vite'

// The app's Tailwind entry. Without it every story renders unstyled, since the
// components carry no CSS of their own — they are utility classes end to end.
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  decorators: [
    // Mirrors the shell in app/layout.tsx: the dark ground, the grid backdrop and
    // white text every component is designed against. Components are never seen on
    // a white page, so they should never be reviewed on one either.
    (Story) => (
      <div className="relative min-h-dvh bg-background p-6 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
            bg-size-[40px_40px]
            mask-[radial-gradient(ellipse_at_center,#000_70%,transparent_100%)]
            [-webkit-mask-image:radial-gradient(ellipse_at_center,#000_70%,transparent_100%)]"
        />
        <Story />
      </div>
    ),
  ],
};

export default preview;
