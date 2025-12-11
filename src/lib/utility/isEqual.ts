/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

import { Temporal } from '@js-temporal/polyfill'

const hasElementType = typeof Element !== 'undefined'
const hasMap = typeof Map === 'function'
const hasSet = typeof Set === 'function'
const hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js
/**
 * cloned from `react-fast-compare` and modified to be support `Temporal.ZonedDateTime`
 */
function equal<T>(a: T, b: T) {
  // START: fast-deep-equal es6/index.js 3.1.3
  if (a === b) return true

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false

    let length, i
    if (Array.isArray(a)) {
      length = a.length
      if (length != (b as typeof a).length) return false
      for (i = length; i-- !== 0; ) if (!equal(a[i], (b as typeof a)[i])) return false
      return true
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    let it
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false
      return true
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false
      return true
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      //@ts-expect-error
      length = a.length
      //@ts-expect-error
      if (length != b.length) return false
      //@ts-expect-error
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false
      return true
    }

    if (a.constructor === RegExp)
      return (
        (a as RegExp).source === (b as unknown as RegExp).source &&
        (a as unknown as RegExp).flags === (b as unknown as RegExp).flags
      )

    if (a.constructor === Temporal.ZonedDateTime) {
      return (a as unknown as Temporal.ZonedDateTime).equals(b as unknown as Temporal.ZonedDateTime)
    }
    // START: Modifications:
    // Apply guards for `Object.create(null)` handling. See:
    // - https://github.com/FormidableLabs/react-fast-compare/issues/64
    // - https://github.com/epoberezkin/fast-deep-equal/issues/49
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === 'function' && typeof b.valueOf === 'function')
      return a.valueOf() === b.valueOf()
    if (
      a.toString !== Object.prototype.toString &&
      typeof a.toString === 'function' &&
      typeof b.toString === 'function'
    )
      return a.toString() === b.toString()
    // END: Modifications

    const keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false

    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false

    // custom handling for React/Preact
    for (i = length; i-- !== 0; ) {
      // @ts-expect-error
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue
      }

      // @ts-expect-error
      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true
  }

  return a !== a && b !== b
}
// end fast-deep-equal

export default function isEqual<T>(a: T, b: T) {
  try {
    return equal(a, b)
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string' &&
      (error.message || '').match(/stack|recursion/i)
    ) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs')
      return false
    }
    // some other error. we should definitely know about these
    throw error
  }
}
