import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import TechStack from '../../app/global/components/tech-stack';
import getSiteContent from '../fixtures/site';

const site = await getSiteContent();

const stack = ['Golang', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'];

const meta = {
    title: 'Global/TechStack',
    component: TechStack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        items: stack,
        labels: site.tech_stack,
        className: 'w-80',
    },
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every entry, no heading. */
export const Default: Story = {};

/** A heading turns the row into a labelled block. */
export const Labelled: Story = {
    args: { label: 'Tech stack' },
};

/** `max` caps the chips and counts the rest, so a card footer stays one line. */
export const Truncated: Story = {
    args: { max: 3 },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
        await expect(canvas.getByText('+3 more')).toBeVisible();
        await expect(canvas.queryByText('Kubernetes')).not.toBeInTheDocument();
    },
};

/** Without `labels` the overflow count is dropped rather than rendered raw. */
export const TruncatedWithoutLabels: Story = {
    args: { max: 3, labels: undefined },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    },
};

/** An empty list renders nothing at all — no stray heading, no empty row. */
export const Empty: Story = {
    args: { items: [], label: 'Tech stack' },
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).queryByRole('list')).not.toBeInTheDocument();
    },
};
