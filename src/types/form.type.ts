export interface FormType<T> {
  data: T;
  onChange: (event: any) => any;
  resetValidation: boolean;
  submitFailed: boolean;
}
