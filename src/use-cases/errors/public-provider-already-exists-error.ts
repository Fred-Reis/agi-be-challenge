export class PublicProviderAlreadyExistsError extends Error {
  constructor() {
    super('Public Provider already exists')
  }
}
