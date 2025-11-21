import { Container } from 'inversify'

export class Kernel extends Container {
  public constructor() {
    super()
  }
}
export const container = new Kernel()
