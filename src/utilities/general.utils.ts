import { ChangeEvent } from 'react';
import { curry, isNil, reduce } from 'ramda';

// *randomString* :: () -> string
export const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

// *trace* :: string -> a -> a
export const trace = curry((txt: string, x: any) => {
  console.log(txt, x);
  return x;
});

/**
 *  Compose function that is less fussy.
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

// prop :: a -> obj -> obj[a] | undefined
export const prop = curry((a: any, obj: any) => (obj ? obj[a] : undefined));

// renderData :: obj -> string -> obj[string] | string
export function display<T>(obj: T) {
  return function(property: keyof T) {
    return compose(
      renderData,
      prop(property)
    )(obj);
  };
}

// renderData :: a -> a | string
export const renderData = (value: any) => (isNil(value) ? '' : value);

// upsert :: [a] -> b -> [a, b]
export const replaceItem = curry((list: any[], b: any) => {
  return list.map((a: any) => (a.id === b.id ? b : a));
});

// all :: [bool] -> bool
// export const all = reduce((a: boolean, b: boolean) => (a ? b : a), true);
// reduceTruthy :: bool bool -> bool
export const reduceTruthy = (acc: boolean, current: boolean) => {
  return current ? acc : false;
};

// all :: [bool] -> bool
export const all = reduce(reduceTruthy, true);
