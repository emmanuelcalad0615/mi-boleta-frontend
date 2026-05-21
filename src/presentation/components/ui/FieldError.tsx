type FieldErrorProps = { id?: string; message?: string };

export function FieldError({ id, message }: Readonly<FieldErrorProps>) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-[#FF6B6B]">
      {message}
    </p>
  );
}
