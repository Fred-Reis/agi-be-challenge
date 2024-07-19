export class NonValidatedEmailError extends Error {
  constructor() {
    super('You must validate your email')
  }
}
