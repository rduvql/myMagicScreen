// @ts-check

export function pad(v: number): string {
    return `${'0' + v}`.substr(-2);
}
