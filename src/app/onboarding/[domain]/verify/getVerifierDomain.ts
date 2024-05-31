import { sha256 } from "./sha256";

/**
 * 
 * @param domain 
 * @param userId 
 * @returns 
 */
export function getVerifierDomain(domain: string, userId: string) {
    return `${sha256(userId)}.${domain}`;
}
