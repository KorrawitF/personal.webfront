/** The navbar order, which doubles as the site's left-to-right spatial model. */
export const ROUTES = ['/', '/about', '/skills', '/projects', '/contact'];

function rank(pathname: string): number {
    return ROUTES.findIndex((route) => (route === '/' ? pathname === '/' : pathname.startsWith(route)));
}

/**
 * The view transition types for a move between two routes. Going right along the
 * navbar slides the page forward, going left slides it back, so a jump reads as a
 * position on the site rather than an arbitrary direction. An unknown or unchanged
 * route gets no type, which leaves it with no directional animation at all.
 */
export default function direction(from: string, to: string): string[] {
    const origin = rank(from);
    const target = rank(to);

    if (origin < 0 || target < 0 || origin === target) {
        return [];
    }

    return [target > origin ? 'nav-forward' : 'nav-back'];
}
