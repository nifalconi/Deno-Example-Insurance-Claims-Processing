import { assertEquals } from "https://deno.land/std@0.101.0/testing/asserts.ts";
import { Claim, Insurer } from "../types.ts";
import {
  insurersPerClaim,
  insurersPerClaimOptimized,
  insurersPerClaimRecursive,
} from "../script.ts";

const insurerPerClaimMethodTester = (method: Function, description: string) => {
  const mockedClaims: Claim[] = [
    { amount: 20, id: 1 },
    { amount: 10, id: 2 },
  ];
  const mockInsurers: Insurer[] = [
    { balance: 10, id: 3 },
    { balance: 10, id: 4 },
    { balance: 10, id: 5 },
  ];

  Deno.test(
    `${description}:insurersPerClaim should match individual claims to insurer balances`,
    () => {
      const result = insurersPerClaimRecursive(
        [...mockedClaims],
        [...mockInsurers]
      ); // Using spread to create a copy and avoid side-effects (important in recursive functions)

      for (const claim of mockedClaims) {
        const associatedInsurerIds = result[claim.id];
        let totalBalanceForClaim = 0;

        for (const insurerId of associatedInsurerIds) {
          const insurer = mockInsurers.find((ins) => ins.id === insurerId);
          if (insurer) {
            totalBalanceForClaim += insurer.balance;
          }
        }

        assertEquals(totalBalanceForClaim, claim.amount);
      }
    }
  );

  Deno.test(
    `${description}: insurersPerClaim should handle empty lists`,
    () => {
      const emptyClaims: Claim[] = [];
      const emptyInsurers: Insurer[] = [];

      const emptyClaimsResult = insurersPerClaimRecursive(
        emptyClaims,
        mockInsurers
      );
      const emptyInsurersResult = insurersPerClaimRecursive(
        mockedClaims,
        emptyInsurers
      );

      assertEquals(emptyClaimsResult, {});
      assertEquals(emptyInsurersResult, {});
    }
  );
};

// Having multiple methods of the same use case is not very common.
// I do not recommend it as it redundant and it can be confusing.
// For purposes of this example, I think it is a good idea to do this to show the different approaches.
insurerPerClaimMethodTester(insurersPerClaim, "InsurerClaim Method");
insurerPerClaimMethodTester(
  insurersPerClaimRecursive,
  "Recursive InsurerClaim Method"
);
insurerPerClaimMethodTester(
  insurersPerClaimOptimized,
  "Optimized InsurerClaim Method"
);
