import { z } from "zod";
import { Field } from "../../../types/field.ts";
import { EditComponent } from "./edit-component.tsx";
import { ViewComponent } from "./view-component.tsx";

const schema = (field: Field) => {
  let zodSchema = z.coerce.boolean();

  return zodSchema;
};

const defaultValue = false;
const label = "Boolean";

export { defaultValue, EditComponent, label, schema, ViewComponent };
