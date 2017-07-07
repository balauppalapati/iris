import {autoinject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import indicative from "indicative";
import {has} from "../../../../lib/utils/has-own-property";
import {getDsnFormRules} from "../../../../../../common/dsn.js";

const _set = require('lodash/set');

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  default?: any;
  info?: string;
  control?: string;
}

export interface FormRules {
  fields: Field[];
  rules: Object;
  messages: Object;
  sanitizationRules: Object;
}

@autoinject()
export class SaveDataSource {

  controller: DialogController;

  // Template only
  dataSourceName: string = '';

  dsnFormRules: FormRules = <FormRules>{};

  formData: any = {}; // Form data - flat structure.
  formModelData: any = {}; // Form data - nested structure.

  isFormValid: boolean = false;

  constructor(controller: DialogController) {
    this.controller = controller;
  }

  private activate(model) {

    this.dataSourceName = model.name;
    this.formData.connector = model.connector;

    this.dsnFormRules = getDsnFormRules(model.connector);

    // Initialize form data with default values.
    this.dsnFormRules.fields.forEach(
      (field: Field) => has.call(field, 'default') && (this.formData[field.name] = field.default)
    );

    this.validateForm();
  }

  /**
   * Converts form data to nested structure.
   * @return {{}}
   */
  private getFormModelData() {
    let formModelData = {};
    for (let key in this.formData) {
      _set(formModelData, key, this.formData[key]);
    }
    if (has.call(this.dsnFormRules, 'sanitizationRules')) {
      formModelData = indicative.sanitize(formModelData, this.dsnFormRules.sanitizationRules);
    }
    this.formModelData = formModelData;
    return formModelData;
  }

  public validateForm() {
    indicative.validate(this.getFormModelData(), this.dsnFormRules.rules)
      .then(this.isFormValid = true).catch((errors) => {
        console.log(errors);
        this.isFormValid = false
      }
    );
  }

  public saveDataSource() {
    console.log(this.formModelData);
  }

}
