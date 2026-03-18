import { TokenDescription } from '@gamepark/react-game'
import cube from '../images/cube.png'

export class CubeDescription extends TokenDescription {
  width = 1.5

  image = cube
  transparency = true
}

export const cubeDescription = new CubeDescription()
