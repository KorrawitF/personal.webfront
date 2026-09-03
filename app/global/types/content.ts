export {}

declare global {
    /** A page heading. The layout renders the first letter of `title` in the accent colour. */
    type PageHeader = {
        title: string,
        lead: string,
    }

    type ActionLink = {
        label: string,
        href: string,
    }

    type NavbarProps = {
        brand: string,
        open_menu: string,
        close_menu: string,
    }

    /** Copy owned by the shared card, not by the page that renders it. */
    type CardLabels = {
        view_details: string,
        /** Takes a {title} placeholder. */
        show_details: string,
        /** Takes a {title} placeholder. */
        hide_details: string,
        confidential: string,
    }

    /** Takes a {count} placeholder. */
    type TechStackLabels = {
        more: string,
    }

    /** Document titles. `template` carries Next's %s token for the page title. */
    type SiteTitle = {
        default: string,
        template: string,
    }

    type SiteContent = {
        title: SiteTitle,
        brand: string,
        /** Absolute origin the site is served from, with no trailing slash. */
        url: string,
        /** BCP 47 tag for the lang attribute on <html>. */
        locale: string,
        open_menu: string,
        close_menu: string,
        card: CardLabels,
        tech_stack: TechStackLabels,
    }
}
