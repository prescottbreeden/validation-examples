import { Phone } from 'types/Phone.type';
import { curry, map } from 'ramda';
import { ChangeEvent } from 'react';
import { prop } from 'de-formed-validations';

/**
 * Creates a random 7 character string.
 * @return string
 */
export const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

/**
 *  Compose function that is a little more friendly to use with typescript.
 *  @param fns any number of comma-separated functions
 *  @return new function
 */
export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((y: any, f: any) => f(y), x);

/**
 *  Curried function that takes the output of an event, wraps it into an
 *  object by the name of the event and then executes the onChange function
 *  providing the key/value pair as the argument.
 *  @param onChange Function to be executed with the event data
 *  @param event
 *  @return void
 */
export const handleChangeEvent = (event: ChangeEvent<any>) => {
  const { name, value } = event.target;
  return { [name]: value };
};

// renderData :: obj -> string -> a | string
export function display<T>(obj: T) {
  return function(property: keyof T) {
    return compose(
      renderData,
      prop(property)
    )(obj);
  };
}

// renderData :: a -> a | string
export const renderData = (value: any) => (value ? value : '');

/**
 *  Evaluate any two values for deep equality
 *  @param a any value
 *  @param b any value
 *  @return boolean
 */
export const deepEqual = (a: unknown, b: unknown) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// debug
export const trace = curry((txt: string, x: any) => {
  console.log(txt, x);
  return x;
});

// upsert :: [a] -> b -> [a, b]
export const upsert = (list: Phone[]) => (b: Phone) => {
  return list.map((a: Phone) => (a.id === b.id ? b : a));
};

export const safeMap = curry((fn: Function, list: any[] | undefined | null) => {
  if (!list) return list;
  return map(fn as any, list);
});
