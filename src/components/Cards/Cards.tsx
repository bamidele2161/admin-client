export function Card({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className="rounded-xl shadow-default border">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}
