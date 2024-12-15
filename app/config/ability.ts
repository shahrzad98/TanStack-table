import { AbilityBuilder, AnyAbility } from "@casl/ability";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { IUserResponse } from "~/types/user";

export function defineAbilitiesFor(user: IUserResponse) {
  // @ts-ignore
  const abilityBuilder = new AbilityBuilder({});

  user?.permissions?.forEach((permission) => {
    const action = permission[0][1][0];
    const subject = permission[1][1][0];
    const conditions = permission[2] ? permission[2][1] : {};

    abilityBuilder.can(action, subject, conditions);
  });
  return abilityBuilder.rules;
}

export const AbilityContext = createContext<AnyAbility | null>(null);
//todo: we are using ts ignore since the permissions from api are not convertable to Typescript
// @ts-ignore
export const Can = createContextualCan<AnyAbility>(AbilityContext.Consumer);
