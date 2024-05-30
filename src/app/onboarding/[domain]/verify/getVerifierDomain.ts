import { sha256 } from "./sha256";

export function getVerifierDomain(domain: string, userId: string) {
    return `a101${sha256(userId)}.${domain}`;
}
