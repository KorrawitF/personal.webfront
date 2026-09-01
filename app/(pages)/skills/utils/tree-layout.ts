/** Horizontal slot for one leaf, and the width every node label is allowed to use. */
export const COLUMN = 128;
/** Vertical distance between two tiers. */
export const ROW = 116;
export const ROOT_RADIUS = 26;
export const NODE_RADIUS = 20;

const PADDING_X = 12;
const PADDING_TOP = ROOT_RADIUS + 8;
/** Room under the root for the domain name and its point total. */
const PADDING_BOTTOM = 74;

function group(skills: Skill[]): { roots: Skill[], children: Map<string, Skill[]> } {
    const known = new Set(skills.map((skill) => skill.id));
    const children = new Map<string, Skill[]>();
    const roots: Skill[] = [];

    for (const skill of skills) {
        if (!skill.parent || !known.has(skill.parent) || skill.parent === skill.id) {
            roots.push(skill);
            continue;
        }

        children.set(skill.parent, [...(children.get(skill.parent) ?? []), skill]);
    }

    return { roots, children };
}

/**
 * Places a domain on its own canvas: the root sits at the bottom and every tier
 * grows upwards, with a parent centred over the children it branches into.
 */
export default function layoutSkillTree(domain: SkillDomain): SkillTreeLayout {
    const { roots, children } = group(domain.skills);
    const placed = new Map<string, { column: number, depth: number }>();
    let slots = 0;

    const walk = (skill: Skill, depth: number): number => {
        // Guards a malformed parent chain from looping forever.
        if (placed.has(skill.id)) {
            return placed.get(skill.id)!.column;
        }

        placed.set(skill.id, { column: slots, depth });

        const kids = children.get(skill.id) ?? [];

        if (!kids.length) {
            const column = slots;
            slots += 1;
            placed.set(skill.id, { column, depth });

            return column;
        }

        const columns = kids.map((kid) => walk(kid, depth + 1));
        const column = (Math.min(...columns) + Math.max(...columns)) / 2;
        placed.set(skill.id, { column, depth });

        return column;
    };

    roots.forEach((root) => walk(root, 0));

    const depths = [...placed.values()].map((position) => position.depth);
    const maxDepth = depths.length ? Math.max(...depths) : 0;

    const nodes: SkillNode[] = domain.skills.flatMap((skill) => {
        const position = placed.get(skill.id);

        if (!position) {
            return [];
        }

        return [{
            skill,
            depth: position.depth,
            x: PADDING_X + position.column * COLUMN + COLUMN / 2,
            y: PADDING_TOP + (maxDepth - position.depth) * ROW,
            radius: position.depth === 0 ? ROOT_RADIUS : NODE_RADIUS,
        }];
    });

    const byId = new Map(nodes.map((node) => [node.skill.id, node]));

    const edges: SkillEdge[] = nodes.flatMap((node) => {
        const parent = node.skill.parent ? byId.get(node.skill.parent) : undefined;

        if (!parent || parent === node) {
            return [];
        }

        return [{ id: `${parent.skill.id}-${node.skill.id}`, from: parent, to: node }];
    });

    return {
        width: Math.max(slots, 1) * COLUMN + PADDING_X * 2,
        height: PADDING_TOP + maxDepth * ROW + PADDING_BOTTOM,
        nodes,
        edges,
    };
}
