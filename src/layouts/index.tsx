import React from "react";
export * from "./Icon.layout";
export * from "./Input.layout";

export const Label: React.FC<any> = (props) => {
  return (
    <label className="form__label" {...props}>
      {props.children}
    </label>
  );
};

export const Button: React.FC<any> = (props) => {
  return (
    <button className="button" {...props}>
      {props.children}
    </button>
  );
};

export const FlexColumn: React.FC = (props) => {
  return (
    <div className="form__group" {...props}>
      {props.children}
    </div>
  );
};

export const FlexRow: React.FC = (props) => {
  return (
    <div className="form__row" {...props}>
      {props.children}
    </div>
  );
};

export const Box: React.FC = (props) => {
  return (
    <div className="form__box" {...props}>
      {props.children}
    </div>
  );
};
