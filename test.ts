import { assertEquals } from "https://deno.land/std@0.101.0/testing/asserts.ts";
import { Claim, Insurer } from "./types.ts";
import { insurersPerClaim, insurersPerClaimRecursive } from "./script.ts";

const mockedClaims: Claim[] = [{ amount: 20, id: 1 }, { amount: 10, id: 2 }];
const mockInsurers: Insurer[] = [
  { balance: 10, id: 3 },
  { balance: 10, id: 4 },
  {
    balance: 10,
    id: 5,
  },
];

Deno.test("insurersPerClaim should assign insurers", () => {
  const claims = mockedClaims;
  const insurers = mockInsurers;

  const result = insurersPerClaimRecursive(claims, insurers);

  assertEquals(result, { 1: [3, 4], 2: [5] });
});

Deno.test("insurersPerClaim should handle empty lists", () => {
  const emptyClaims: Claim[] = [];
  const emptyInsurers: Insurer[] = [];

  const emptyClaimsResult = insurersPerClaimRecursive(
    emptyClaims,
    mockInsurers,
  );
  const emptyInsurersResult = insurersPerClaimRecursive(
    mockedClaims,
    emptyInsurers,
  );

  assertEquals(emptyClaimsResult, {});
  assertEquals(emptyInsurersResult, {});
});
