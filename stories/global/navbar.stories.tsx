import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import Navbar from '../../app/global/components/navbar';
import getSiteContent from '../fixtures/site';

const site = await getSiteContent();

const meta = {
    title: 'Global/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
        // The navbar reads the current route through next/navigation.
        nextjs: {
            appDirectory: true,
            navigation: { pathname: '/' },
        },
    },
    tags: ['autodocs'],
    args: {
        brand: site.brand,
        open_menu: site.open_menu,
        close_menu: site.close_menu,
    },
    decorators: [
        (Story) => (
            <div className="h-96">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** At `/` the sliding pill sits under Home. */
export const Home: Story = {};

/** The pill follows the route, and the active label flips to the background colour. */
export const OnProjects: Story = {
    parameters: {
        nextjs: { appDirectory: true, navigation: { pathname: '/projects' } },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const active = canvas.getByRole('link', { name: 'Projects' });
        await expect(active).toHaveClass(/text-background/);
        await expect(canvas.getByRole('link', { name: 'Home' })).not.toHaveClass(/text-background/);
    },
};

/** Nested routes light their section up too. */
export const OnNestedRoute: Story = {
    parameters: {
        nextjs: { appDirectory: true, navigation: { pathname: '/skills/golang' } },
    },
};

/** Below `md` the links collapse behind the hamburger. */
export const MobileMenu: Story = {
    parameters: {
        viewport: {
            options: {
                mobile: { name: 'Mobile', styles: { width: '390px', height: '844px' } },
            },
        },
    },
    globals: {
        viewport: { value: 'mobile' },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const toggle = canvas.getByRole('button', { name: site.open_menu });
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(toggle);

        await expect(canvas.getByRole('button', { name: site.close_menu })).toHaveAttribute('aria-expanded', 'true');
    },
};
