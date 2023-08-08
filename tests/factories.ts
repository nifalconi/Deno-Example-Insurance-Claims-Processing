import { Factory } from "npm:rosie";
import { Claim, Insurer } from "../types.ts";
import { faker } from "npm:@faker-js/faker";

// Factories for generating mock Claim and Insurer data for testing how it works on deno and not current use.
export const ClaimFactory = new Factory<Claim>()
  .sequence("id", (i) => i)
  .attr("amount", () => faker.number.int({ min: 1, max: 1000 }));

export const InsurerFactory = new Factory<Insurer>()
  .sequence("id", (i) => i)
  .attr("balance", () => faker.number.int({ min: 1, max: 1000 }));

