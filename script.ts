import { Claim, Insurer, InsurersPerClaim } from "./types.ts";
import { mapIdsToEmptyArrays } from "./lib.ts";

// Complexity: O(n**2) and O(1) space (no extra space). Being n the biggest between claims and insurers lists.
export const insurersPerClaim = (
  claims: Claim[],
  insurers: Insurer[]
): InsurersPerClaim => {
  if (claims.length === 0 || insurers.length === 0) return {};

  let insurersPerClaim: InsurersPerClaim = mapIdsToEmptyArrays(claims);

  while (claims.length != 0 && insurers.length != 0) {
    const [currentClaim, currentInsurer] = [claims[0], insurers[0]];

    const maxInsurerPayment = Math.min(
      currentClaim.amount,
      currentInsurer.balance
    );

    currentClaim.amount -= maxInsurerPayment;
    currentInsurer.balance -= maxInsurerPayment;

    if (currentClaim.amount === 0) claims.shift();
    if (currentInsurer.balance === 0) insurers.shift();

    insurersPerClaim[currentClaim.id].push(currentInsurer.id);
  }

  return insurersPerClaim;
};

// Complexity: O(n) and O(1) space (no extra space). Being n the biggest between claims and insurers lists.
// Because we don't create new arrays.
export const insurersPerClaimOptimized = (
  claims: Claim[],
  insurers: Insurer[]
): InsurersPerClaim => {
  if (claims.length === 0 || insurers.length === 0) return {};

  let insurersPerClaim: InsurersPerClaim = mapIdsToEmptyArrays(claims);

  let claimIndex = 0;
  let insurerIndex = 0;

  while (claimIndex < claims.length && insurerIndex < insurers.length) {
    const currentClaim = claims[claimIndex];
    const currentInsurer = insurers[insurerIndex];

    const maxInsurerPayment = Math.min(
      currentClaim.amount,
      currentInsurer.balance
    );

    currentClaim.amount -= maxInsurerPayment;
    currentInsurer.balance -= maxInsurerPayment;

    if (currentClaim.amount === 0) claimIndex++;
    if (currentInsurer.balance === 0) insurerIndex++;

    insurersPerClaim[currentClaim.id].push(currentInsurer.id);
  }

  return insurersPerClaim;
};

// Complexity: O(n) and O(n) space (extra space). Extra space due to the recursive call
export const insurersPerClaimRecursive = (
  claims: Claim[],
  insurers: Insurer[],
  insurersPerClaim: InsurersPerClaim = {}
): InsurersPerClaim => {
  if (claims.length === 0 || insurers.length === 0) return insurersPerClaim;

  const [currentClaim, currentInsurer] = [claims[0], insurers[0]];

  const { id: claimId, amount: claimAmount } = currentClaim;
  const { id: insurerId, balance: insurerBalance } = currentInsurer;

  if (!insurersPerClaim[claimId]) insurersPerClaim[claimId] = [];

  const maxInsurerPayment = Math.min(claimAmount, insurerBalance);

  currentClaim.amount -= maxInsurerPayment;
  currentInsurer.balance -= maxInsurerPayment;

  insurersPerClaim[claimId].push(insurerId);

  if (currentClaim.amount === 0) claims = claims.slice(1);
  if (currentInsurer.balance === 0) insurers = insurers.slice(1);

  return insurersPerClaimRecursive(claims, insurers, insurersPerClaim);
};
