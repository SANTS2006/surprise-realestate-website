// The company logo, on a soft white badge so it reads on both light and dark surfaces.
export function BrandMark({ size = 40, className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-sm ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size, backgroundColor: '#fff' }}
    >
      <img src="/logo.webp" alt="" width={size} height={size} className="h-full w-full object-contain" />
    </span>
  );
}
