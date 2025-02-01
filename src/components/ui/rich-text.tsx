export function RichText({ render }: { render: any }) {
  const transformed = render.split("\n").join("<br>");
  return <span dangerouslySetInnerHTML={{ __html: transformed }}></span>;
}
