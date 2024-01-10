import { pathfind } from "../src/pathfind"
import { Vector } from "../src/Vector.type"

describe("Pathfind", () => {
  it("start and end the same", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { x: 0, y: 0 }
    const Q: Vector = { x: 0, y: 0 }

    expect(pathfind(A, P, Q)).toBe(0)
  })

  it("example case", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { x: 1, y: 0 }
    const Q: Vector = { x: 2, y: 3 }

    expect(pathfind(A, P, Q)).toBe(6)
  })

  it("example case 2", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, true, true, true],
      [false, false, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { x: 1, y: 0 }
    const Q: Vector = { x: 2, y: 3 }

    expect(pathfind(A, P, Q)).toBe(8)
  })

  it("example case 3", () => {
    const A = [
      [true, true, true, true, true, true, true, true, true, true],
      [true, false, false, false, true, false, false, true, false, false],
      [true, false, true, true, true, false, true, true, true, false],
      [false, false, true, true, true, false, false, false, false, false],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
    ]
    const P: Vector = { x: 1, y: 0 }
    const Q: Vector = { x: 8, y: 9 }

    expect(pathfind(A, P, Q)).toBe(16)
  })

  it("example case 4", () => {
    const A = [
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true, true, true],
    ]
    const P: Vector = { x: 0, y: 0 }
    const Q: Vector = { x: 9, y: 9 }

    expect(pathfind(A, P, Q)).toBe(18)
  })
})
