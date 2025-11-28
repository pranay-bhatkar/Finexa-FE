import { useState } from "react";
import type { ZodSchema } from "zod";

export function useFormValidator<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  defaultValues: T
) {
  const [form, setForm] = useState<T>(defaultValues);

  // Partial = lets us set {} safely
  const [errors, setErrors] = useState<
    Partial<Record<keyof T, string[] | undefined>>
  >({});

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Partial<
        Record<keyof T, string[]>
      >;

      setErrors(fieldErrors);
      return false;
    }

    setErrors({}); // no error now because type is Partial<>
    return true;
  };

  return {
    form,
    errors,
    onChange,
    validate,
    setForm,
  };
}
