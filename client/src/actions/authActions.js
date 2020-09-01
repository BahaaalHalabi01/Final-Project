import { TEST_DISPATCH } from "./types"

//register user

export const registerUser = (userdata) => {
  return {
    type: TEST_DISPATCH,
    payload: userdata,
  }
}
