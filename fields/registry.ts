import { Field } from "../types/field.ts";
import { z } from "zod";
import * as booleanField from "./core/boolean/index.tsx";
import * as codeField from "./core/code/index.ts";
import * as dateField from "./core/date/index.ts";
import * as fileField from "./core/file/index.tsx";
import * as imageField from "./core/image/index.tsx";
import * as numberField from "./core/number/index.tsx";
import * as referenceField from "./core/reference/index.tsx";
import * as richTextField from "./core/rich-text/index.tsx";
import * as selectField from "./core/select/index.tsx";
import * as stringField from "./core/string/index.tsx";
import * as textField from "./core/text/index.tsx";
import * as uuidField from "./core/uuid/index.tsx";

type FieldModule = {
  label?: string;
  schema?: (...args: any[]) => z.ZodTypeAny;
  defaultValue?: any;
  read?: (...args: any[]) => any;
  write?: (...args: any[]) => any;
  EditComponent?: React.ComponentType<any>;
  ViewComponent?: React.ComponentType<any>;
};

const fieldTypes = new Set<string>();
const labels: Record<string, string> = {};
const schemas: Record<string, (field: Field, configObject?: Record<string, any>) => z.ZodTypeAny> =
  {};
const defaultValues: Record<string, any> = {};
const readFns: Record<
  string,
  (value: any, field: Field, configObject?: Record<string, any>) => void
> = {};
const writeFns: Record<
  string,
  (value: any, field: Field, configObject?: Record<string, any>) => void
> = {};
const editComponents: Record<string, React.ComponentType<any>> = {};
const viewComponents: Record<string, React.ComponentType<any>> = {};

const registerField = (fieldName: string, fieldModule: FieldModule) => {
  fieldTypes.add(fieldName);

  if (fieldModule.label) labels[fieldName] = fieldModule.label;
  if (fieldModule.schema) schemas[fieldName] = fieldModule.schema;
  if (fieldModule.defaultValue !== undefined) {
    defaultValues[fieldName] = fieldModule.defaultValue;
  }
  if (fieldModule.read) readFns[fieldName] = fieldModule.read;
  if (fieldModule.write) writeFns[fieldName] = fieldModule.write;
  if (fieldModule.EditComponent) {
    editComponents[fieldName] = fieldModule.EditComponent;
  }
  if (fieldModule.ViewComponent) {
    viewComponents[fieldName] = fieldModule.ViewComponent;
  }
};

registerField("boolean", booleanField);
registerField("code", codeField);
registerField("date", dateField);
registerField("file", fileField);
registerField("image", imageField);
registerField("number", numberField);
registerField("reference", referenceField);
registerField("rich-text", richTextField);
registerField("select", selectField);
registerField("string", stringField);
registerField("text", textField);
registerField("uuid", uuidField);

export {
  defaultValues,
  editComponents,
  fieldTypes,
  labels,
  readFns,
  schemas,
  viewComponents,
  writeFns,
};
