import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import AnalyticsConsent from '../../app/global/components/analytics-consent';

const STORAGE_KEY = 'analytics-consent';

const meta = {
    title: 'Global/AnalyticsConsent',
    component: AnalyticsConsent,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        measurementId: 'G-STORYBOOK',
    },
    // The answer is persisted, so every story starts from a visitor who has not given one.
    beforeEach: () => {
        window.localStorage.removeItem(STORAGE_KEY);
    },
    decorators: [
        (Story) => (
            <div className="h-96">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AnalyticsConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Until the visitor answers, the banner shows and nothing is loaded from Google. */
export const Undecided: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(await canvas.findByRole('region', { name: 'Analytics consent' })).toBeVisible();
        await expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    },
};

/**
 * Declining hides the banner, remembers the answer and still loads nothing.
 * Accepting is not exercised here: it would fetch the real gtag script.
 */
export const Declined: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(await canvas.findByRole('button', { name: 'Decline' }));

        await waitFor(() => expect(canvas.queryByRole('region', { name: 'Analytics consent' })).toBeNull());
        await expect(window.localStorage.getItem(STORAGE_KEY)).toBe('denied');
        await expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    },
};
