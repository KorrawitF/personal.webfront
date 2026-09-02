/** Fills `{token}` placeholders in a content string with the given values. */
export default function fill(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token));
}
