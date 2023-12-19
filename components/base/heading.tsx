interface HeadingProps {
  title: string;
  description: string;
}

export default function Heading(props: HeadingProps) {
  const { title, description } = props;
  return (
    <div>
      <h2 className="text-xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
