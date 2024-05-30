import { getVerifierDomain } from './getVerifierDomain';
import { sha256 } from './sha256';

export function createSub(userId: string, domainName: string) {
    return sha256(`${userId}@${getVerifierDomain(domainName, userId)}`);
}
