'use server';
import * as jose from 'jose';
import { alg, secret } from './jwt';
import { getVerifierDomain } from './getVerifierDomain';
import { createSub } from './createSub';


export async function createTxtRecords(domainName: string, userId: string) {
    
    /**
     * Assuming this is the actual domain, we will now try to create
     * a connection for this domain. This could also be done without
     * this connection.
     */
    const jwt = new jose.SignJWT({
        sub: createSub(userId, domainName),
    }).setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('30 days');
    const token = await jwt.sign(secret);
    return {
        domain: getVerifierDomain(domainName, userId),
        txt: `token=${token}`,
    }
}