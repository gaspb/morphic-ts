---
title: summoner-BASTJ.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [M (interface)](#m-interface)
- [Summoner (interface)](#summoner-interface)
- [UM (interface)](#um-interface)
- [AsOpaque (function)](#asopaque-function)
- [AsUOpaque (function)](#asuopaque-function)
- [summonFor (function)](#summonfor-function)

---

# M (interface)

Type level override to keep Morph type name short \*/
/\*\*

**Signature**

```ts
export interface M<R, L, A> extends U.Materialized<R, L, A, ProgramUnionURI, BASTJInterpreterURI> {}
```

Added in v0.0.1

# Summoner (interface)

**Signature**

```ts
export interface Summoner<R extends AnyConfigEnv> extends U.Summoners<ProgramUnionURI, BASTJInterpreterURI, R> {
  <L, A>(F: U.ProgramType<R, L, A>[ProgramUnionURI]): M<R, L, A>
}
```

Added in v0.0.1

# UM (interface)

**Signature**

```ts
export interface UM<R, A> extends M<R, {}, A> {}
```

Added in v0.0.1

# AsOpaque (function)

**Signature**

```ts
export const AsOpaque = <E, A>() => <X extends M<any, E, A>>(x: X): M<X['_R'], E, A> => ...
```

Added in v0.0.1

# AsUOpaque (function)

**Signature**

```ts
export const AsUOpaque = <A>() => <X extends UM<any, A>>(x: X): UM<X['_R'], A> => ...
```

Added in v0.0.1

# summonFor (function)

**Signature**

```ts
export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) => SummonerOps<Summoner<R>> = <R extends AnyConfigEnv = {}>(
  env: ExtractEnv<R, JsonSchemaURI | IoTsURI | FastCheckURI>
) =>
  makeSummoner<Summoner<R>>(cacheUnaryFunction, program => ...
```

Added in v0.0.1
