export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

export const idleState: ActionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};
