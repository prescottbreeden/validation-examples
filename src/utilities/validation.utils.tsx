import React from "react";
import { all } from "de-formed-validations";
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
} from "ramda";
import { ValidationObject } from "de-formed-validations/dist/validations/types";
import {compose, randomString, safeMap} from "./general.utils";

// isLength :: num -> xs -> boolean
export const isLength = (num: number) => compose(equals(num), length);

// isNumber :: string -> boolean
export const isNumber = compose(not, isNaN, Number);

// containsNoNumbers :: string -> boolean
export const containsNoNumbers = compose(
  all,
  map(compose(not, isNumber)),
  split("")
);

// matchString :: (string, string) -> boolean
export const matchString = (str1: string, str2: string) =>
  equals(toLower(str1), toLower(str2));

// onlyContainsNumbers :: string -> boolean
export const stringIsNumbers = compose(all, map(isNumber), split(""));

// lessThan :: num -> string -> boolean
export const stringIsLessThan = (num: number) => compose(lt(num), length, trim);

// isStringValid :: string -> boolean
export const stringIsNotEmpty = compose(gt(0), length, trim);

// validateEmail :: Email -> boolean
export const emailIsValid = (email: string) => {
  if (!email) return true;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// stringIsRequired :: string -> ValidationProps
export const stringIsRequired = (propertyName: string) => {
  return {
    errorMessage: `${propertyName} is required.`,
    validation: stringIsNotEmpty,
  };
};

export function validationErrors<T>(v: ValidationObject<T>) {
  return safeMap(
    (error: string) => (
      <p key={randomString()} style={{ color: "red" }}>
        {error}
      </p>
    ),
    v.validationErrors
  );
}

export function displayValidationError<T>(v: ValidationObject<T>) {
  return function (prop: keyof T) {
    return v.getError(prop) ? (
      <p className="form__error">{v.getError(prop)}</p>
    ) : null;
  };
}
