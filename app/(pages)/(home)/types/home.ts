export {}

declare global {
    type Portrait = {
        src: string,
        alt: string,
    }

    type HomeContent = {
        eyebrow: string,
        greeting: string,
        name: string,
        intro: string,
        actions: ActionLink[],
        portrait: Portrait,
        channels?: ContactChannel[],
    }
}
