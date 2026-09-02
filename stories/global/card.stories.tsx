import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import Card from '../../app/global/components/card';
import TechStack from '../../app/global/components/tech-stack';
import ExternalLinkIcon from '../../app/global/icons/external-link';
import getSiteContent from '../../app/global/api/mocks/site';

// The card's own copy lives with the rest of the site content, not in the story.
//
// The link icon is ExternalLinkIcon rather than the GithubIcon the projects page
// passes: the Github and LinkedIn marks are `'use cache'` async Server Components,
// and Card is a Client Component, so only a synchronous icon can be rendered here.
const site = await getSiteContent();

const project: CardDetail = {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    subtitle: 'Solo project',
    icon: '/Next.js.svg',
    period: 'Aug 2026 - Present',
    status: 'Live',
    summary: 'A statically rendered portfolio built on the Next.js App Router with a small set of reusable server and client components.',
    detail: 'Pages are Server Components rendered ahead of time, with client components only where interaction is needed. Styling is Tailwind v4 with CSS variables for theming.',
    highlights: [
        'Server-first rendering with cache components enabled',
        'Reusable global components: timeline, card, image with fallback',
        'Component-level tests running in a real browser via Vitest',
    ],
    links: [
        {
            label: 'Repository',
            href: 'https://github.com/korrawit/personal.webfront',
            icon: <ExternalLinkIcon className="h-4 w-4" />,
        },
    ],
};

const meta = {
    title: 'Global/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        item: project,
        labels: site.card,
        className: 'w-80',
    },
    argTypes: {
        item: { control: 'object' },
        back: { control: false },
        children: { control: false },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default face: summary, status and a prompt to flip. */
export const Front: Story = {};

/** The back face, reached by flipping — detail, highlights and links. */
export const Back: Story = {
    args: { defaultFlipped: true },
};

/** A banner replaces the inline status chip and pushes the header down. */
export const WithBanner: Story = {
    args: {
        item: { ...project, banner: '/profile.jpg' },
    },
};

/** `children` renders in the front face's footer, above the flip prompt. */
export const WithTechStack: Story = {
    args: {
        children: (
            <TechStack
                items={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest']}
                max={4}
                labels={site.tech_stack}
            />
        ),
    },
};

/** Work under NDA: the links are replaced by a lock and an explanation. */
export const Confidential: Story = {
    args: {
        item: {
            ...project,
            id: 'wms',
            title: 'Warehouse Management System',
            subtitle: 'Backend Developer',
            icon: '/Go.svg',
            status: 'Production',
            confidential: true,
            links: undefined,
        },
        defaultFlipped: true,
    },
};

/** `flippable: false` renders one flat face that grows with its content. */
export const Static: Story = {
    args: { flippable: false },
};

/** Clicking the front face turns the card and moves focus-blocking `inert` with it. */
export const FlipsOnClick: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const front = canvas.getByRole('button', { name: `Show more details about ${project.title}` });
        await expect(front).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(front);

        const close = await canvas.findByRole('button', { name: `Hide details about ${project.title}` });
        await expect(close).toBeVisible();
        await expect(canvas.getByText(project.highlights![0])).toBeInTheDocument();
    },
};
