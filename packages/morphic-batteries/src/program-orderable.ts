import type { GetAlgebra } from '@morphic-ts/algebras/lib/core'
import type { URIS } from '@morphic-ts/common/lib/HKT'
import type { IntersectionURI } from '@morphic-ts/model-algebras/lib/intersections'
import type { NewtypeURI } from '@morphic-ts/model-algebras/lib/newtype'
import type { PrimitiveURI } from '@morphic-ts/model-algebras/lib/primitives'
import type { RefinedURI } from '@morphic-ts/model-algebras/lib/refined'
import type { SetURI } from '@morphic-ts/model-algebras/lib/set'
import type { StrMapURI } from '@morphic-ts/model-algebras/lib/str-map'
import type { TaggedUnionsURI } from '@morphic-ts/model-algebras/lib/tagged-unions'
import type { AnyConfigEnv, InferredAlgebra, InferredProgram } from '@morphic-ts/summoners'

/**
 *  @since 0.0.1
 */
export const ProgramOrderableURI = 'ProgramOrderableURI' as const
/**
 *  @since 0.0.1
 */
export type ProgramOrderableURI = typeof ProgramOrderableURI

/**
 *  @since 0.0.1
 */
export interface AlgebraNoUnion<F extends URIS, Env> extends InferredAlgebra<F, ProgramOrderableURI, Env> {}
/**
 *  @since 0.0.1
 */
export interface P<R extends AnyConfigEnv, E, A> extends InferredProgram<R, E, A, ProgramOrderableURI> {}

declare module '@morphic-ts/summoners/lib/ProgramType' {
  interface ProgramAlgebraURI {
    [ProgramOrderableURI]: GetAlgebra<
      PrimitiveURI | IntersectionURI | SetURI | StrMapURI | TaggedUnionsURI | NewtypeURI | RefinedURI
    >
  }

  interface ProgramAlgebra<F, Env> {
    [ProgramOrderableURI]: AlgebraNoUnion<F, Env>
  }

  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramOrderableURI]: P<R, E, A>
  }
}
