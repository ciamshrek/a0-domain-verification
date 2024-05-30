import { z } from "zod";

/**
 *
 */
export const createDomainBodySchema = z.object({
    domain: z.string().regex(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]))*$/),
    // strategy: z.object({
    //     type: z.literal('samlp'),
    //     metadataXml: z.string(),
    // }).or(z.object({
    //     type: z.literal('oidc'),
    //     discoveryUrl: z.string(),
    // }))
});

export type ICreateDomainSchema = z.infer<typeof createDomainBodySchema>;