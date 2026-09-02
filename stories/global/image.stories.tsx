import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';

import Image from '../../app/global/components/image';

const meta = {
    title: 'Global/Image',
    component: Image,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        src: '/profile.jpg',
        alt: 'Portrait',
        className: 'h-40 w-40 rounded-2xl object-cover',
    },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A source that resolves loads as-is. */
export const Loads: Story = {};

/**
 * A missing source swaps in the gallery placeholder instead of the browser's
 * broken-image glyph. Project banners rely on this.
 */
export const FallsBack: Story = {
    args: { src: '/banners/does-not-exist.png', alt: 'Missing banner' },
    play: async ({ canvasElement }) => {
        const image = within(canvasElement).getByRole('img', { name: 'Missing banner' });

        await waitFor(() => expect(image).toHaveAttribute('src', '/image-gallery.svg'));
    },
};

/** An SVG icon, the shape the card header and the timeline pass in. */
export const Icon: Story = {
    args: {
        src: '/Kubernetes.svg',
        alt: 'Kubernetes',
        className: 'h-16 w-16 object-contain',
    },
};
