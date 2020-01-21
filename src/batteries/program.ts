import { GetAlgebra } from '../algebras/core'
import { InferredProgram, InferredAlgebra } from '../usage/programs-hkt'
import { IntersectionURI } from '../model-algebras/intersections'
import { ObjectURI } from '../model-algebras/object'
import { PrimitiveURI } from '../model-algebras/primitives'
import { RecursiveURI } from '../model-algebras/recursive'
import { SetURI } from '../model-algebras/set'
import { StrMapURI } from '../model-algebras/str-map'
import { TaggedUnionsURI } from '../model-algebras/tagged-unions'
import { UnionsURI } from '../model-algebras/unions'

export const ProgramUnionURI = Symbol()
export type ProgramUnionURI = typeof ProgramUnionURI

export interface AlgebraUnion<F> extends InferredAlgebra<F, ProgramUnionURI> {}
export interface P<E, A> extends InferredProgram<E, A, ProgramUnionURI> {}

declare module '../../src/usage/programs-hkt' {
  interface ProgramAlgebraURI {
    [ProgramUnionURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | ObjectURI | RecursiveURI | SetURI | StrMapURI | TaggedUnionsURI | UnionsURI
    >
  }
  interface ProgramAlgebra<F> {
    [ProgramUnionURI]: AlgebraUnion<F>
  }
  interface ProgramType<E, A> {
    [ProgramUnionURI]: P<E, A>
  }
  interface ProgramTypes extends Record<ProgramURI, any> {
    [ProgramUnionURI]: ProgramUnionInterpreters
  }
  interface ProgramUnionInterpreters {}
}