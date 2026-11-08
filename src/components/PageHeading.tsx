interface PageHeadingProps {
  title: string;
  description: string;
}

export default function PageHeading({
  title,
  description,
}: PageHeadingProps) {
  return (
    <div className="page-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}