import { FunctionComponent } from 'react';

export interface FormType<T> {
  data: T;
  onChange: (event: any) => any;
  resetValidation: boolean;
  submitFailed: boolean;
}

export type DynamicFormProps = {
  addForm: Function;
  form: FunctionComponent<FormType<any>>;
  items: any[];
  onChange: (event: any) => any;
  removeForm: (data: any) => void;
  resetValidation: boolean;
  submitFailed: boolean;
};
