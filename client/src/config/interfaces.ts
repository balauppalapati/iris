export interface FormGroup {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  default?: any;
  info?: string;
  control?: string;
}

export interface FormRules {
  fields: FormGroup[];
  rules: Object;
  messages: Object;
  sanitize: Object;
}
