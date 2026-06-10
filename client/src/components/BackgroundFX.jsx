import './BackgroundFX.css';

export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-orb bg-orb-gold" />
      <div className="bg-orb bg-orb-purple" />
      <div className="bg-grid" />
    </div>
  );
}
