import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import type { Either } from 'fp-ts/Either'
import { isLeft, isRight } from 'fp-ts/Either'
import { eqStrict } from 'fp-ts/Eq'
import { getOrd as OgetOrd } from 'fp-ts/Option'
import type { Ord } from 'fp-ts/Ord'
import { fromCompare, ord, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
import { getOrd as getArrayOrd } from 'fp-ts/ReadonlyArray'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ordPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<OrdURI, Env> => ({
    _F: OrdURI,
    date: config => env =>
      new OrdType(
        ordApplyConfig(config)(
          ord.contramap(ordNumber, date => date.getTime()),
          env
        )
      ),
    boolean: config => env => new OrdType(ordApplyConfig(config)(ordBoolean, env)),
    string: config => env => new OrdType(ordApplyConfig(config)(ordString, env)),
    number: config => env => new OrdType(ordApplyConfig(config)(ordNumber, env)),
    bigint: config => env =>
      new OrdType<bigint>(
        ordApplyConfig(config)({ equals: eqStrict.equals, compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0) }, env)
      ),
    stringLiteral: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config)(ordString, env)),
    tag: (k, config) => env => new OrdType<typeof k>(ordApplyConfig(config)(ordString, env)),
    keysOf: (keys, config) => env =>
      new OrdType<keyof typeof keys>(
        ordApplyConfig(config)(
          ord.contramap(ordString, k => k as string),
          env
        )
      ),
    nullable: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(OgetOrd(getOrd(env).ord), env)),
    mutable: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getOrd(env).ord, env)),
    array: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getArrayOrd(getOrd(env).ord), env)),
    nonEmptyArray: (getOrd, config) => env => new OrdType(ordApplyConfig(config)(getArrayOrd(getOrd(env).ord), env)),
    uuid: config => env => new OrdType(ordApplyConfig(config)(ordString, env)),
    either: (e, a, config) => env => new OrdType(ordApplyConfig(config)(getEitherOrd(e(env).ord, a(env).ord), env)),
    option: (a, config) => env => new OrdType(ordApplyConfig(config)(OgetOrd(a(env).ord), env))
  })
)

ordBoolean
const getEitherOrd = <L, A>(ordL: Ord<L>, ordA: Ord<A>): Ord<Either<L, A>> =>
  fromCompare((a, b) =>
    isLeft(a) ? (isLeft(b) ? ordL.compare(a.left, b.left) : -1) : isRight(b) ? ordA.compare(a.right, b.right) : 1
  )
