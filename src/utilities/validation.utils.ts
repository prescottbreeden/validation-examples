import { all, compose } from './general.utils';
import {
  length,
  lt as gt,
  gt as lt,
  trim,
  not,
  equals,
  map,
  split,
  toLower,
  test,
} from 'ramda';
// regular expressions
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// isLength :: num -> xs -> boolean
export const isLength = (num: number) =>
  compose(
    equals(num),
    length
  );

// isNumber :: string -> boolean
export const isNumber = compose(
  not,
  isNaN,
  Number
);

// containsNoNumbers :: string -> boolean
export const containsNoNumbers = test(/^[^0-9()]+$/);

// matchString :: string string -> boolean
export const matchString = (str1: string, str2: string) =>
  equals(toLower(str1), toLower(str2));

// onlyContainsNumbers :: string -> boolean
export const stringIsNumbers = compose(
  all,
  map(isNumber),
  split('')
);

// lessThan :: num -> string -> boolean
export const stringIsLessThan = (num: number) =>
  compose(
    lt(num),
    length,
    trim
  );

// isStringValid :: string -> boolean
export const stringIsNotEmpty = compose(
  gt(0),
  length,
  trim
);

// validateEmail :: string -> boolean
export const emailIsValid = test(emailRegEx);
