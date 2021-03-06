import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import type { URIS } from '@morphic-ts/common/lib/HKT'
import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { ObjectURI } from '@morphic-ts/model-algebras/lib/object'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RecursiveURI } from '@morphic-ts/model-algebras/lib/recursive'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { UnknownURI } from '@morphic-ts/model-algebras/lib/unknown'
import type { AnyConfigEnv, InferredAlgebra, InferredProgram } from '@morphic-ts/summoners'

/**
 *  @since 0.0.1
 */
export const ProgramNoUnionURI = 'ProgramNoUnionURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramNoUnionURI = typeof ProgramNoUnionURI

/**
 *  @since 0.0.1
 */
export interface AlgebraNoUnion<F extends URIS, Env> extends InferredAlgebra<F, ProgramNoUnionURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramNoUnionURI> {}

declare module '@morphic-ts/summoners/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramNoUnionURI]: GetAlgebra<
      | PrimitiveURI
      | IntersectionURI
      | ObjectURI
      | RecursiveURI
      | SetURI
      | StrMapURI
      | TaggedUnionsURI
      | UnknownURI
      | NewtypeURI
      | RefinedURI
    >
  }

  interface ProgramAlgebra<F extends URIS, Env> {
    [ProgramNoUnionURI]: AlgebraNoUnion<F, Env>
  }

  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramNoUnionURI]: P<R, E, A>
  }
}
