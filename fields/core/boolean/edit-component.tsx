"use client";

import { forwardRef } from "react";
import { Switch } from "../../../components/ui/switch.tsx";

const EditComponent = forwardRef((props: any, ref: React.Ref<HTMLInputElement>) => {
  const { field, value, onChange, ...restProps } = props;
  return (
    <div>
      <Switch
        {...restProps}
        ref={ref}
        checked={value}
        onCheckedChange={onChange}
        disabled={field?.readonly}
      />
    </div>
  );
});

export { EditComponent };
