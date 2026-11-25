export function HudBackdrop() {
  return (
    <div className="aw-backdrop" aria-hidden="true">
      <div className="aw-backdrop__bokeh" />
      <div className="aw-backdrop__crosshairs" />
      <div className="aw-backdrop__vignette" />
    </div>
  );
}
