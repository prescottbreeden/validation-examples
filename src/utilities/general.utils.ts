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

// less fussy version of compose
// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((y: any, f: any) => f(y), x);

// handleChangeEvent :: event -> obj
export const handleChangeEvent = (event: ChangeEvent<any>) => {
  const { name, value } = event.target;
  return { [name]: value };
};

// prop :: a -> obj -> obj[a] | undefined
export const prop = curry((a: any, obj: any) => (obj ? obj[a] : undefined));

// renderData :: a -> a | string
export const renderData = (value: any) => (isNil(value) ? '' : value);

// renderData :: obj -> string -> obj[string] | string
export function safeGet<T>(obj: T) {
  return function(property: keyof T) {
    return compose(
      renderData,
      prop(property)
    )(obj);
  };
}

// replaceItem :: [a] -> a -> [a]
export const replaceItem = curry((list: any[], b: any) => {
  return list.map((a: any) => (a.id === b.id ? b : a));
});

// all :: [bool] -> bool
export const all = reduce((a: boolean, b: boolean) => (a ? b : a), true);

// formatPhone :: string -> string
export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} - ${match[3]}`;
  }
  return phone;
};
