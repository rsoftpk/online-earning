import { serviceSignIn } from "./apiServices";

export async function LogIn(user) {
  const response = await serviceSignIn(user);
  return response;
}
