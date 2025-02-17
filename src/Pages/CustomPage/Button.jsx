function Button({
  onClick,
  label,
  className,
  children,
  hasIcon = false,
  disabled,
  iconClassName,
}) {
  return hasIcon ? (
    <button
      className={` border rounded-lg px-3 py-2  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`flex items-center gap-2 ${iconClassName}`}>
        {children} {label}
      </p>
    </button>
  ) : (
    <button
      className={` border rounded-lg px-3 py-2  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
