interface HeadingProps {
  title: string;
  description: string;
}

export default function HeadingCine(props: HeadingProps) {
  const { title, description } = props;
  return (
    <div>
      <h2 className="text-xl  font-bold tracking-tight">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
