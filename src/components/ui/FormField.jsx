/**
 * One labelled form control with its error message.
 * `children` is the input, select or textarea itself.
 */
const FormField = ({ id, label, hint, error, children }) => (
  <div className={`field ${error ? "field--invalid" : ""}`}>
    <label htmlFor={id}>{label}</label>
    {children}
    {hint && !error && (
      <p className="field-hint" id={`${id}-hint`}>
        {hint}
      </p>
    )}
    {error && (
      <p className="field-error" id={`${id}-error`} role="alert">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
