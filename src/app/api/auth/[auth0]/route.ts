import {
  AppRouteHandlerFn,
  handleAuth,
  handleLogin
} from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export const GET = handleAuth({
  // login: ((req: NextRequest, res: NextResponse) => {
  //   // return handleLogin({
  //   //   authorizationParams: {
  //   //     audience: 'https://example.api',
  //   //     response_type: 'code',
  //   //     response_mode: 'query',
  //   //     acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor',
  //   //     max_age: 0,
  //   //     scope: 'openid profile',
  //   //     'ext-foobar': true,
  //   //   },
  //   //   // Needed to fix
  //   // })(req as any, res as any);
  // }) as AppRouteHandlerFn,
});
