export const alg = 'HS256'

export const secret = new TextEncoder().encode(
    process.env.AUTH0_SECRET,
);