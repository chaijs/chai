/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * @author The Blacksmith (a.k.a. Saulo Vallory) <me@saulovallory.com>
 */

module.exports = {
  default: 'expected {{this}} to [-:not ]{{exp}}',
  defaultBut: 'expected {{this}} to [-:not ]{{exp}} but got {{act}}',
  defaultButIts: 'expected {{this}} to [-:not ]{{exp}} but it\'s [@:{{act}}]',

  a: 'expected {{this}} [-:not ]to be [@:{{exp}}]',
  above: 'expected {{this}} to be [+:above][-:at most] {{exp}}',
  aboveLength: 'expected {{this}} to [-:not ]have a length above {{exp}} but got {{act}}',
  arguments: 'expected {{this}} to [-:not ]be arguments',
  atLeast: 'expected {{this}} to be [+:at least][-:below] {{exp}}',
  atLeastLength: 'expected {{this}} to have a length [+:at least][-:below] {{exp}} but got {{act}}',
  atMost: 'expected {{this}} to be [+:at most][-:above] {{exp}}',
  atMostLength: 'expected {{this}} to have a length [+:at most][-:above] {{exp}} but got {{act}}',
  below: 'expected {{this}} to be [+:below][-:at least] {{exp}}',
  belowLength: 'expected {{this}} to have a length [+:below][-:at least] {{exp}} but got {{act}}',
  closeTo: 'expected {{this}} [-:not ]to be close to {{exp}}',
  contain: 'expected {{this}} to [-:not ]contain {{exp}}',
  deeplyEqual: 'expected {{this}} to [-:not ]deeply equal {{exp}}',
  empty: 'expected {{this}} [-:not ]to be empty',
  equal: 'expected {{this}} to [-:not ]equal {{exp}}',
  exist: 'expected {{this}} to [-:not ]exist',
  false: 'expected {{this}} to be [+:false][-:true]',
  include: 'expected {{this}} to [-:not ]include {{exp}}',
  instanceOf: 'expected {{this}} to [-:not ]be an instance of {{exp}}',
  keys: 'expected {{this}} to [-:not ][contains?:contain|have] [#nkeys:key|keys] {{exp}}',
  lengthOf: 'expected {{this}} to [-:not ]have a length of {{exp}}[+: but got {{act}}]',
  match: 'expected {{this}} [-:not ]to match {{exp}}',
  members: 'expected {{this}} to [-:not ]have the same members as {{act}}',
  null: 'expected {{this}} to [-:not ]be null',
  ok: 'expected {{this}} to be [+:truthy][-:falsy]',
  operator: 'expected {{this}} to [-:not ]be {{op}} ',
  ownProperty: 'expected {{this}} to [-:not ]have own property {{exp}}',
  property: 'expected {{this}} to [-:not ]have a [deep?:deep ]property {{exp}}',
  propertyWithValue: 'expected {{this}} to [-:not ]have a [deep?:deep ]property \'{{prop}}\' with value {{exp}}[+:, but got {{act}}]',
  respondTo: 'expected {{this}} [-:not ]to respond to {{exp}}',
  satisfy: 'expected {{this}} to [-:not ]satisfy {{exp}}',
  superset: 'expected {{this}} to [-:not ]be a superset of {{act}}',
  true: 'expected {{this}} to be [+:true][-:false]',
  throw: 'expected {{this}} to [-:not ]throw {{exp}}[-: but {{act}} was thrown]',
  throwAnError: 'expected {{this}} to [-:not ]throw {{exp}}[-: but {{act}} was thrown]',
  throwMatching: 'expected {{this}} to [-:not ]throw error matching {{exp}} but got {{act}}',
  throwIncluding: 'expected {{this}} to [-:not ]throw error including {{exp}} but got {{act}}',
  undefined: 'expected {{this}} [-:not ]to be undefined',
  within: 'expected {{this}} to [-:not ]be within {{exp}}',
  withinLength: 'expected {{this}} to [-:not ]have a length within {{exp}}',
}
