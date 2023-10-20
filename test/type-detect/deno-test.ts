/* global Deno:readonly */
// @ts-nocheck
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import typeDetect from '../index.ts';
Deno.test('type detect works', () => {
  assertEquals(typeDetect('hello'), 'string');
});
