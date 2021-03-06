import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { cacheUnaryFunction } from '@morphic-ts/common/lib/core'
// eslint-disable-next-line import/no-duplicates
import type * as U from '@morphic-ts/summoners'
// eslint-disable-next-line import/no-duplicates
import type { AnyConfigEnv, ExtractEnv, SummonerOps } from '@morphic-ts/summoners'
import { makeSummoner } from '@morphic-ts/summoners'

import type { EmptyInterpreterURI } from './interpreters-Empty'
import type { ProgramNoUnionURI } from './program-no-union'

/** Type level override to keep Morph type name short */
/**
 *  @since 0.0.1
 */
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramNoUnionURI, EmptyInterpreterURI> {}
/**
 *  @since 0.0.1
 */
export interface UM<R, A> extends M<R, {}, A> {}

/**
 *  @since 0.0.1
 */
export const AsOpaque = <E, A>() => <X extends M<any, E, A>>(x: X): M<X['_R'], E, A> => x
/**
 *  @since 0.0.1
 */
export const AsUOpaque = <A>() => <X extends UM<any, A>>(x: X): UM<X['_R'], A> => x

/**
 *  @since 0.0.1
 */
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramNoUnionURI, EmptyInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramNoUnionURI]): M<R, L, A>
}

/**
 *  @since 0.0.1
 */
export const summonFor: <R extends AnyEnv = {}>(env: ExtractEnv<R, never>) => SummonerOps<Summoner<R>> = <
  R extends AnyConfigEnv = {}
>(
  _env: ExtractEnv<R, never>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, _program => ({
    build: a => a
  }))
