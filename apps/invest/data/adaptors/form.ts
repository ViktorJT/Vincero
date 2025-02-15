import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema } from "@/utils/createFormSchema";

// @todos type here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormAdapter(props: any) {
  const formSchema = createFormSchema(props.fields);
  const resolver = zodResolver(formSchema);
  return {
    ...props,
    resolver,
  };
}
