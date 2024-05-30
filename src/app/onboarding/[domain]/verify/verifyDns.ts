import * as jose from "jose";
import { resolveTxt } from "node:dns/promises";
import { getVerifierDomain } from "./getVerifierDomain";
import { createSub } from "./createSub";
import { alg, secret } from "./jwt";

/**
 * Will respond with JWT Token stored on DNS or Null
 *
 * @param domain
 * @returns
 */
async function queryDnsForToken(domain: string) {
  try {
    const txtRecords = await resolveTxt(domain);
    for (const record of txtRecords) {
      console.info(record);
      const [first] = record;
      if (first.startsWith("token=")) {
        return record.join("").replace("token=", "");
      }
    }
  } catch (e) {
    console.warn(e);
  }

  return null;
}

/**
 *
 * @param params
 */
export async function isDomainVerified(domain: string, userId: string) {
  const dnsResponse = await queryDnsForToken(getVerifierDomain(domain, userId));

  if (dnsResponse === null) {
    return {
      status: "failed",
      status_cause: "Record not found",
      status_description:
        "No TXT records were found, please make sure the dns records are set",
    };
  }

  const expectedSub = createSub(userId, domain);
  try {
    await jose.jwtVerify(
        dnsResponse,
        secret, {
      algorithms: [alg],
      maxTokenAge: "30 days",
      subject: expectedSub,
    });
    return {
        status: "verified",
    };
  } catch (err) {
    console.log("verification failed");
    console.warn(err);
  }
  return {
    status: "failed",
    status_cause: "Malformed Record",
    status_description:
        "TXT records were found, but either expired or malformed, please update.",
  };
}
