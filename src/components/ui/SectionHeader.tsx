interface SectionHeaderProps {
  id?: string;
  title: string;
  meta?: string;
  metaAccent?: 'default' | 'yellow' | 'green';
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({
  id,
  title,
  meta,
  metaAccent = 'default',
  as = 'h2',
}: SectionHeaderProps) {
  const Heading = as;
  const metaClass =
    metaAccent === 'yellow'
      ? 'aw-section-header__meta aw-section-header__meta--yellow'
      : metaAccent === 'green'
        ? 'aw-section-header__meta aw-section-header__meta--green'
        : 'aw-section-header__meta';

  return (
    <div className="aw-section-header">
      <div className="aw-section-header__left">
        <span className="aw-section-header__dot" aria-hidden="true" />
        <Heading id={id} className="aw-section-header__title">
          {title}
        </Heading>
      </div>
      {meta && <span className={metaClass}>{meta}</span>}
    </div>
  );
}
