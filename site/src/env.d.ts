/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env" />

type MemberAccess = import('./lib/auth/member-access').MemberAccess;
type MemberSession = import('./lib/auth/session').MemberSession;

declare namespace App {
  interface Locals {
    memberSession?: MemberSession;
    memberAccess?: MemberAccess;
  }
}
