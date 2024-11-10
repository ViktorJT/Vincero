import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema } from "@/utils/createFormSchema";

export function FormAdapter(props) {
  const formSchema = createFormSchema(props.fields);
  const resolver = zodResolver(formSchema);
  return {
    ...props,
    resolver,
  };
}
