// Dashboard view
const Dashboard = ({ onNavigate }) => {
  const d = window.HUB_DATA;
  const state = useAppState();
  const isTh = state.lang === "th";
  const today = new Date(2026, 4, 22);
  const dateStr = isTh
    ? "วันศุกร์ที่ 22 พฤษภาคม 2569"
    : today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div>
      {/* Welcome band */}
      <div className="welcome-band">
        <div className="greet">
          <h2>{t("Good afternoon, Sarah", "สวัสดีตอนบ่าย คุณซาร่าห์")}</h2>
          <p>{t(
            "You have 4 meetings today across R&D, sensory, and regulatory teams.",
            "วันนี้คุณมีการประชุม 4 รายการ ร่วมกับทีม R&D เซ็นเซอรี่ และทีมกำกับ"
          )}</p>
        </div>
        <div className="meta">
          <div className="m"><b>4</b>{t("Meetings today", "ประชุมวันนี้")}</div>
          <div className="m"><b>{dateStr}</b><span style={{opacity: 0}}>·</span></div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        {d.stats.map(s => {
          const tn = tone(s.color);
          return (
            <div key={s.label} className="stat">
              <div className="icon" style={{ background: tn.bg, color: tn.fg }}>
                <Icon name={s.icon} size={20} />
              </div>
              <div>
                <div className="label">{isTh ? s.label_th : s.label}</div>
                <div className="value">{s.value}</div>
                <div className={"delta" + (s.trend === "down" ? " down" : "")}>
                  {s.trend === "up" && <Icon name="arrow_up" size={12} />}
                  {s.trend === "down" && <Icon name="arrow_down" size={12} />}
                  {isTh ? s.delta_th : s.delta}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module shortcuts */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h">
          <h3>{t("Modules", "โมดูล")}</h3>
          <span className="text-xs text-tertiary">
            {t("Click any module to jump in", "คลิกโมดูลใดก็ได้เพื่อเข้าใช้งาน")}
          </span>
        </div>
        <div className="module-grid">
          {d.modules.map(m => {
            const tn = tone(m.color);
            const isClickable = ["meetings", "rm", "guidelines", "assistant"].includes(m.id) || m.target;
            return (
              <div
                key={m.id}
                className="module"
                style={!isClickable ? { cursor: "default" } : {}}
                onClick={() => {
                  if (m.target) onNavigate(m.target, { search: m.search });
                  else if (isClickable) onNavigate(m.id);
                }}
              >
                <div className="ic-box" style={{ background: tn.bg, color: tn.fg }}>
                  <Icon name={m.icon} size={20} />
                </div>
                <div className="name">{isTh ? m.name_th : m.name}</div>
                <div className="desc">{isTh ? m.desc_th : m.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dash-grid">
        <div className="flex-col gap-16">
          <div className="card">
            <div className="card-h">
              <h3>{t("Recent RM updates", "อัปเดตวัตถุดิบล่าสุด")}</h3>
              <span className="link" onClick={() => onNavigate("rm")}>{t("View all →", "ดูทั้งหมด →")}</span>
            </div>
            <div className="card-b">
              {d.rmUpdates.map(u => {
                const map = {
                  approved: { cls: "green", lblEn: "Approved", lblTh: "อนุมัติ" },
                  pending:  { cls: "orange", lblEn: "Pending", lblTh: "รออนุมัติ" },
                  review:   { cls: "blue", lblEn: "In review", lblTh: "อยู่ระหว่างตรวจ" }
                };
                const sM = map[u.status];
                const actionTh = {
                  "Updated": "อัปเดต",
                  "Added": "เพิ่มใหม่",
                  "Spec revised": "แก้สเปก",
                  "Allergen update": "อัปเดตสารก่อภูมิแพ้",
                  "Origin changed": "เปลี่ยนแหล่งที่มา"
                };
                const whenTh = {
                  "2 hours ago": "2 ชม. ที่แล้ว",
                  "5 hours ago": "5 ชม. ที่แล้ว",
                  "Yesterday": "เมื่อวาน",
                  "2 days ago": "2 วันก่อน"
                };
                return (
                  <div key={u.code} className="rm-update">
                    <div className="av av-teal">{u.code.slice(-2)}</div>
                    <div className="info">
                      <div className="name">{u.name}</div>
                      <div className="meta">
                        <span style={{ fontFamily: "Cascadia Code, Consolas, monospace", fontSize: 11 }}>{u.code}</span>
                        <span>·</span>
                        <span>{isTh
                          ? `${actionTh[u.action] || u.action} โดย ${u.by}`
                          : `${u.action} by ${u.by}`}</span>
                        <span>·</span>
                        <span>{isTh ? (whenTh[u.when] || u.when) : u.when}</span>
                      </div>
                    </div>
                    <span className={"chip " + sM.cls}>
                      <span className={"dot " + sM.cls}></span>
                      {isTh ? sM.lblTh : sM.lblEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-h">
              <h3>{t("Today's meetings", "การประชุมวันนี้")}</h3>
              <span className="link" onClick={() => onNavigate("meetings")}>
                {t("Schedule new →", "นัดประชุมใหม่ →")}
              </span>
            </div>
            <div className="card-b">
              {d.meetings.map((m, i) => (
                <div key={i} className="meeting-item">
                  <div className="time">
                    <div className="hr">{m.time}</div>
                    <div className="dur">{isTh ? m.duration.replace("min", "นาที") : m.duration}</div>
                  </div>
                  <div className="body">
                    <div className="title">{m.title}</div>
                    <div className="who">
                      <Icon name="users" size={12} style={{verticalAlign: "-2px", marginRight: 4}}/>
                      {m.who}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-h">
            <h3 style={{display:"flex", alignItems:"center", gap:8}}>
              <Icon name="sparkle" size={16} color="var(--color-purple)" />
              {t("Popular AI questions", "คำถามยอดนิยมของ AI")}
            </h3>
            <span className="link" onClick={() => onNavigate("assistant")}>
              {t("Ask one →", "ลองถาม →")}
            </span>
          </div>
          <div className="card-b" style={{ padding: "8px 10px 14px" }}>
            {d.popularQuestions.map((q, i) => (
              <div key={i} className="q-item" onClick={() => onNavigate("assistant", { prompt: q.q })}>
                <span className="q-ic"><Icon name="sparkle" size={14} /></span>
                <span style={{ flex: 1 }}>{isTh ? q.q_th : q.q}</span>
                <span className="q-count">{q.count}×</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--color-border)", marginTop: 10, paddingTop: 10, paddingLeft: 12, paddingRight: 12 }}>
              <div className="text-xs text-tertiary fw-600" style={{textTransform:"uppercase", letterSpacing:"0.05em", marginBottom: 8}}>
                {t("Try asking…", "ลองถาม…")}
              </div>
              <button className="btn primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNavigate("assistant")}>
                <Icon name="sparkle" size={14} />
                {t("Open AI Assistant", "เปิดผู้ช่วย AI")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
