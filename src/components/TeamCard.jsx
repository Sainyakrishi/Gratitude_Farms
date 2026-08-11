import { css } from '../lib/css.js';

export default function TeamCard(props) {
  return (
    <>
      <div style={css("display:flex;flex-direction:column;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(26,60,52,0.05);")}>
        <div style={css("width:100%;aspect-ratio:1;overflow:hidden;background:#EBE8E3;")}>
          <img src={props.person.photo} alt={props.person.name} style={css("width:100%;height:100%;object-fit:cover;object-position:top center;")} />
        </div>
        <div style={css("padding:20px 22px 24px;display:flex;flex-direction:column;gap:4px;")}>
          <div style={css("font-family:'Source Serif 4',serif;font-size:19px;font-weight:700;color:#1A3C34;")}>
            {props.person.name}
          </div>
          <div style={css("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.04em;color:#C5A059;text-transform:uppercase;")}>
            {props.person.role}
          </div>
          {(props.person.bio) ? (
            <>
            <p style={css("color:#414846;font-size:13.5px;line-height:1.6;margin:8px 0 0;")}>
              {props.person.bio}
            </p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
