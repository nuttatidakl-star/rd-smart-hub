// RM Database view with slide-out drawer
// Data sourced from organization PLM backup file (see HUB_DATA.dataSource)
const STATUS_CHIP = {
  "Approved": { cls: "green", th: "อนุมัติ" },
  "Pending Review": { cls: "orange", th: "รอตรวจสอบ" },
  "Under Review": { cls: "blue", th: "อยู่ระหว่างตรวจ" },
  "Restricted": { cls: "red", th: "ถูกจำกัด" }
};

const CATEGORY_TH = {
  "Natural Extract": "สารสกัดธรรมชาติ",
  "Smoke Aroma": "กลิ่นรมควัน",
  "Natural Aroma Chemical": "สารเคมีให้กลิ่นธรรมชาติ",
  "Process Flavor": "สารแต่งกลิ่นกระบวนการ",
  "Aroma Chemical": "สารเคมีให้กลิ่น",
  "Essential Oil": "น้ำมันหอมระเหย",
  "Natural Flavor": "สารแต่งกลิ่นธรรมชาติ",
  "Natural Distillate": "สารกลั่นธรรมชาติ",
  "Creamer Base": "ฐานครีมเทียม",
  "High-Intensity Sweetener": "สารให้ความหวานเข้มข้นสูง",
  "Acidulant": "สารปรับกรด",
  "Preservative": "สารกันเสีย"
};

const ORIGIN_TH = {
  "Madagascar": "มาดากัสการ์", "Germany": "เยอรมนี", "Brazil": "บราซิล",
  "Netherlands": "เนเธอร์แลนด์", "Ghana": "กานา", "China": "จีน",
  "Italy": "อิตาลี", "USA": "สหรัฐอเมริกา", "Switzerland": "สวิตเซอร์แลนด์",
  "Colombia": "โคลอมเบีย", "Malaysia": "มาเลเซีย", "Thailand": "ไทย"
};

const RMDatabase = () => {
  const d = window.HUB_DATA;
  const state = useAppState();
  const isTh = state.lang === "th";
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  const filterDefs = [
    { id: "All",           en: "All",           th: "ทั้งหมด" },
    { id: "Coffee",        en: "Coffee",        th: "กาแฟ" },
    { id: "Flavor",        en: "Flavor",        th: "กลิ่นรส" },
    { id: "Food Additive", en: "Food Additive", th: "วัตถุเจือปนอาหาร" },
    { id: "Sweet RM",      en: "Sweet RM",      th: "วัตถุดิบหวาน" },
    { id: "Creamer",       en: "Creamer",       th: "ครีมเทียม" },
    { id: "Others",        en: "Others",        th: "อื่นๆ" }
  ];

  const filtered = d.rms.filter(rm => {
    const txt = (rm.name + " " + rm.code + " " + rm.origin + " " + rm.supplier + " " + (rm.group || "")).toLowerCase();
    if (search && !txt.includes(search.toLowerCase())) return false;
    if (filter === "All") return true;
    return rm.group === filter;
  });

  const detailFor = (rm) => {
    if (!rm) return null;
    if (d.rmDetail[rm.code]) return d.rmDetail[rm.code];
    return {
      tasteProfile: [
        { name: "Sweet",  value: 30 + (rm.projects * 3) % 60 },
        { name: "Sour",   value: 20 + (rm.projects * 7) % 50 },
        { name: "Bitter", value: 10 + (rm.projects * 5) % 40 },
        { name: "Floral", value: 25 + (rm.projects * 11) % 55 },
        { name: "Woody",  value: 15 + (rm.projects * 13) % 60 },
        { name: "Spicy",  value: 5  + (rm.projects * 17) % 45 }
      ],
      relatedProjects: [
        { name: "Premium Beverage Line",     code: "PRJ-2025-018", stage: "Concept", color: "av-blue" },
        { name: "Reformulation Initiative",  code: "PRJ-2024-099", stage: "Pilot",   color: "av-purple" }
      ],
      notes: `${rm.name} from ${rm.origin}, sourced via ${rm.supplier}. Currently used in ${rm.projects} active projects. Category: ${rm.category}. Regulatory clearance: ${rm.regulatory}. Allergen profile: ${rm.allergens}. Last specification update: ${rm.updated}.`
    };
  };

  const plmUrl = (code) => d.dataSource.plmBaseUrl + code;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="crumb">{t("R&D Smart Hub › RM Database", "R&D Smart Hub › ฐานข้อมูลวัตถุดิบ")}</div>
          <h1>{t("Raw material library", "คลังวัตถุดิบ")}</h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="download" size={14} />{t("Export", "ส่งออก")}</button>
          <button className="btn"><Icon name="filter" size={14} />{t("Advanced filter", "ตัวกรองขั้นสูง")}</button>
          <button className="btn primary"><Icon name="plus" size={14} />{t("Add new RM", "เพิ่มวัตถุดิบ")}</button>
        </div>
      </div>

      {/* Data source banner */}
      <div className="source-banner">
        <div className="ic"><Icon name="database" size={18} /></div>
        <div className="info">
          <div className="ttl">
            <span>{t("Synced from", "ดึงข้อมูลจาก")} <b>{isTh ? d.dataSource.name_th : d.dataSource.name}</b></span>
            <span className="chip green" style={{fontSize: 10}}>
              <span className="dot green"></span>{t("Live", "เชื่อมต่ออยู่")}
            </span>
          </div>
          <div className="meta">
            <Icon name="clock" size={10} style={{verticalAlign: "-1px", marginRight: 3}} />
            {t("Last sync", "อัปเดตล่าสุด")}: <b>{isTh ? d.dataSource.syncedAt_th : d.dataSource.syncedAt}</b>
            &nbsp;·&nbsp;
            {t("Source file", "ไฟล์ต้นทาง")}: <span className="ll">{d.dataSource.file}</span>
            &nbsp;·&nbsp;
            {t("Records", "จำนวนรายการ")}: <b>{d.dataSource.records.toLocaleString()}</b>
          </div>
        </div>
        <a className="btn" href={d.dataSource.plmBaseUrl} target="_blank" rel="noreferrer" onClick={e => e.preventDefault()}>
          <Icon name="external" size={12} />{t("Open in PLM", "เปิดใน PLM")}
        </a>
        <button className="btn"><Icon name="refresh" size={12} />{t("Re-sync", "ซิงค์ใหม่")}</button>
      </div>

      <div className="tools-row">
        <div className="search-input" style={{maxWidth: 360, flex: 1}}>
          <Icon name="search" size={14} color="var(--color-text-tertiary)" />
          <input
            placeholder={t("Search by name, code, origin, supplier…", "ค้นหา ชื่อ รหัส แหล่งที่มา ผู้ผลิต…")}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {filterDefs.map(f => {
            const n = f.id === "All" ? d.rms.length : d.rms.filter(r => r.group === f.id).length;
            return (
              <span
                key={f.id}
                className={"t" + (filter === f.id ? " active" : "")}
                onClick={() => setFilter(f.id)}
              >
                {isTh ? f.th : f.en}
                <span style={{
                  marginLeft: 6,
                  fontSize: 10,
                  opacity: 0.7,
                  fontWeight: 600
                }}>{n}</span>
              </span>
            );
          })}
        </div>
        <div className="text-xs text-secondary" style={{marginLeft: "auto"}}>
          {t("Showing", "แสดง")} <b>{filtered.length}</b> {t("of", "จาก")} {d.rms.length} {t("materials", "รายการ")}
        </div>
      </div>

      <table className="rm-table">
        <thead>
          <tr>
            <th>{t("Name", "ชื่อ")}</th>
            <th style={{width: 150}}>{t("Supplier", "ผู้ผลิต")}</th>
            <th style={{width: 200}}>{t("Product in use", "ใช้ในผลิตภัณฑ์")}</th>
            <th style={{width: 180}}>{t("Function", "หน้าที่")}</th>
            <th style={{width: 120}}>{t("TI graph", "กราฟ TI")}</th>
            <th style={{width: 90}}>{t("Updated", "อัปเดต")}</th>
            <th style={{width: 70}}>PLM</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(rm => {
            const products = isTh ? rm.productInUse_th : rm.productInUse;
            return (
              <tr
                key={rm.code}
                className={selected?.code === rm.code ? "selected" : ""}
                onClick={() => setSelected(rm)}
              >
                <td>
                  <div className="rm-name">{rm.name}</div>
                  <div style={{display: "flex", gap: 6, alignItems: "center", marginTop: 2}}>
                    <span className="rm-code">{rm.code}</span>
                    <span className="chip" style={{fontSize: 10, padding: "1px 6px"}}>
                      {isTh ? (CATEGORY_TH[rm.category] || rm.category) : rm.category}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{fontWeight: 500}}>{rm.supplier}</div>
                  <div className="text-xs text-tertiary" style={{marginTop: 2}}>
                    {isTh ? (ORIGIN_TH[rm.origin] || rm.origin) : rm.origin}
                  </div>
                </td>
                <td>
                  <div className="product-chips">
                    {products.slice(0, 2).map((p, i) => (
                      <span key={i} className="chip blue">{p}</span>
                    ))}
                    {products.length > 2 && (
                      <span className="chip" title={products.slice(2).join(", ")}>
                        +{products.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{fontSize: 12}}>{isTh ? rm.fn_th : rm.fn}</div>
                </td>
                <td>
                  <a
                    className="ti-link"
                    href={rm.tiGraph}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => { e.stopPropagation(); e.preventDefault(); }}
                    title={rm.tiGraph}
                  >
                    <span className="ti-ic">X</span>
                    {t("Open Excel", "เปิด Excel")}
                  </a>
                </td>
                <td className="text-secondary">{new Date(rm.updated).toLocaleDateString(isTh ? "th-TH" : "en-US", { month: "short", day: "numeric" })}</td>
                <td>
                  <a
                    className="plm-link"
                    href={plmUrl(rm.code)}
                    target="_blank" rel="noreferrer"
                    onClick={e => { e.stopPropagation(); e.preventDefault(); }}
                    title={plmUrl(rm.code)}
                  >
                    <Icon name="external" size={11} />{t("Open", "เปิด")}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="drawer-backdrop" style={{ opacity: selected ? 1 : 0, pointerEvents: selected ? "auto" : "none" }} onClick={() => setSelected(null)}></div>
      <RMDrawer rm={selected} detail={detailFor(selected)} plmUrl={plmUrl} onClose={() => setSelected(null)} isTh={isTh} />
    </div>
  );
};

const TASTE_LABEL_TH = {
  Sweet: "หวาน", Sour: "เปรี้ยว", Bitter: "ขม", Salty: "เค็ม", Umami: "อูมามิ",
  Creamy: "ครีมมี่", Woody: "กลิ่นไม้", Floral: "ดอกไม้", Smoky: "รมควัน", Spicy: "เผ็ดร้อน"
};

const RMDrawer = ({ rm, detail, onClose, plmUrl, isTh }) => {
  if (!rm) return <div className="drawer"></div>;
  const stat = STATUS_CHIP[rm.status];
  return (
    <div className={"drawer open"}>
      <div className="dh">
        <div className="av lg av-teal" style={{borderRadius: 8}}>
          <Icon name="flask" size={20} />
        </div>
        <div style={{flex: 1, minWidth: 0}}>
          <div className="sub" style={{marginBottom: 4}}>
            <span className="rm-code">{rm.code}</span>
            <span>·</span>
            <span className={"chip " + stat.cls} style={{fontSize: 11}}>
              <span className={"dot " + stat.cls}></span>
              {isTh ? stat.th : rm.status}
            </span>
            <a
              className="plm-link"
              style={{marginLeft: "auto", fontSize: 11}}
              href={plmUrl(rm.code)}
              target="_blank" rel="noreferrer"
              onClick={e => e.preventDefault()}
            >
              <Icon name="external" size={11} />
              {t("View in PLM", "เปิดใน PLM")}
            </a>
          </div>
          <h2>{rm.name}</h2>
          <div className="sub">
            {isTh ? (CATEGORY_TH[rm.category] || rm.category) : rm.category} · {isTh ? (ORIGIN_TH[rm.origin] || rm.origin) : rm.origin} · {rm.supplier}
          </div>
        </div>
        <button className="close" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>

      <div className="db">
        <div className="sect-h">{t("Identification", "ข้อมูลระบุ")}</div>
        <div className="kv">
          <div className="k">{t("RM code", "รหัสวัตถุดิบ")}</div>
          <div className="v"><span className="rm-code">{rm.code}</span></div>
          <div className="k">{t("Supplier", "ผู้ผลิต")}</div>
          <div className="v">{rm.supplier} <span className="text-tertiary text-xs">· {isTh ? (ORIGIN_TH[rm.origin] || rm.origin) : rm.origin}</span></div>
          <div className="k">{t("Category", "หมวด")}</div>
          <div className="v">{isTh ? (CATEGORY_TH[rm.category] || rm.category) : rm.category}</div>
          <div className="k">{t("Function", "หน้าที่")}</div>
          <div className="v"><b>{isTh ? rm.fn_th : rm.fn}</b></div>
          <div className="k">{t("Last updated", "อัปเดตล่าสุด")}</div>
          <div className="v">{rm.updated}</div>
          <div className="k">PLM</div>
          <div className="v"><span className="rm-code" style={{fontSize: 11}}>{plmUrl(rm.code)}</span></div>
        </div>

        <div className="sect-h">{t("TI graph", "กราฟ TI")}</div>
        <a
          href={rm.tiGraph}
          target="_blank" rel="noreferrer"
          onClick={e => e.preventDefault()}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: 12,
            border: "1px solid var(--color-border)",
            borderRadius: 6,
            textDecoration: "none",
            color: "inherit",
            background: "var(--color-surface-2)"
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 6,
            background: "#217346", color: "#fff",
            display: "grid", placeItems: "center",
            fontSize: 10, fontWeight: 700, flex: "0 0 36px"
          }}>XLS</div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontWeight: 600, fontSize: 13}}>
              {t(`Time-Intensity data for ${rm.code}`, `ข้อมูล Time-Intensity ของ ${rm.code}`)}
            </div>
            <div className="text-xs text-tertiary" style={{
              fontFamily: "Cascadia Code, Consolas, monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginTop: 2
            }}>
              {rm.tiGraph}
            </div>
            <div className="text-xs text-secondary" style={{marginTop: 4}}>
              <Icon name="clock" size={10} style={{verticalAlign: "-1px", marginRight: 3}} />
              {t("Last analysis", "วิเคราะห์ล่าสุด")}: {rm.tiUpdated}
            </div>
          </div>
          <span className="btn" style={{padding: "5px 10px", fontSize: 11}}>
            <Icon name="external" size={11} />{t("Open in Excel", "เปิดใน Excel")}
          </span>
        </a>

        <div className="sect-h">{t("Product in use", "ใช้ในผลิตภัณฑ์")} ({(isTh ? rm.productInUse_th : rm.productInUse).length})</div>
        <div className="product-chips" style={{gap: 6}}>
          {(isTh ? rm.productInUse_th : rm.productInUse).map((p, i) => (
            <span key={i} className="chip blue" style={{fontSize: 12, padding: "3px 10px"}}>{p}</span>
          ))}
        </div>

        <div className="sect-h">{t("Taste profile", "โปรไฟล์รสและกลิ่น")}</div>
        <div className="taste-grid">
          {detail.tasteProfile.map(tp => (
            <div key={tp.name} className="taste-bar">
              <div className="nm">{isTh ? (TASTE_LABEL_TH[tp.name] || tp.name) : tp.name}</div>
              <div className="tr"><div className="fl" style={{width: tp.value + "%"}}></div></div>
              <div className="vl">{tp.value}</div>
            </div>
          ))}
        </div>

        <div className="sect-h">{t("Regulatory & allergens", "ข้อกำหนดและสารก่อภูมิแพ้")}</div>
        <div className="kv">
          <div className="k">{t("Allergens", "สารก่อภูมิแพ้")}</div>
          <div className="v">
            {rm.allergens === "None"
              ? <span className="chip green"><Icon name="check" size={10} />{t("None declared", "ไม่มี")}</span>
              : <span className="chip orange"><Icon name="info" size={10} />{rm.allergens}</span>}
          </div>
          <div className="k">{t("Compliance", "การกำกับ")}</div>
          <div className="v">{rm.regulatory}</div>
          <div className="k">{t("Naturalness", "ความเป็นธรรมชาติ")}</div>
          <div className="v">
            {rm.category.includes("Natural") || rm.category.includes("Essential")
              ? <span className="chip green">{t("Natural — EU Art. 16(2)", "ธรรมชาติ — EU มาตรา 16(2)")}</span>
              : <span className="chip">{t("Nature-identical", "เทียบเท่าธรรมชาติ")}</span>}
          </div>
          <div className="k">{t("IFRA status", "สถานะ IFRA")}</div>
          <div className="v"><span className="chip green">{t("Within Cat. 4 limits", "อยู่ในเกณฑ์ Cat. 4")}</span></div>
        </div>

        <div className="sect-h">{t("Related projects", "โครงการที่เกี่ยวข้อง")} ({detail.relatedProjects.length})</div>
        {detail.relatedProjects.map(p => (
          <div key={p.code} className="proj-card">
            <div className={"av " + p.color} style={{borderRadius: 6, width: 36, height: 36, flex: "0 0 36px"}}>
              <Icon name="folder" size={16} />
            </div>
            <div className="info">
              <div className="ttl">{p.name}</div>
              <div className="meta">
                <span className="rm-code">{p.code}</span> · {t("stage", "ระยะ")}: {p.stage}
              </div>
            </div>
            <span className={"chip " + (p.stage === "Concept" ? "blue" : p.stage === "Pilot" ? "orange" : "green")}>
              {p.stage}
            </span>
          </div>
        ))}

        <div className="sect-h">{t("Notes", "หมายเหตุ")}</div>
        <div style={{
          padding: 12,
          background: "var(--notes-bg)",
          borderRadius: 6,
          border: "1px solid var(--notes-border)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--notes-text)"
        }}>
          <div style={{display: "flex", gap: 8, alignItems: "flex-start"}}>
            <Icon name="notes" size={14} style={{marginTop: 2, flexShrink: 0}} />
            <div>{detail.notes}</div>
          </div>
        </div>

        <div className="sect-h">{t("Activity", "กิจกรรม")}</div>
        <div style={{fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)"}}>
          <div><b>Marcus Webb</b> {t("updated specification", "อัปเดตสเปก")} — {t("2 hours ago", "2 ชม. ที่แล้ว")}</div>
          <div><b>Anna Lindqvist</b> {t("approved regulatory", "อนุมัติด้านกำกับ")} — {t("3 days ago", "3 วันก่อน")}</div>
          <div><b>Sarah Chen</b> {t("added to Vanilla 24 project", "เพิ่มเข้าโครงการ Vanilla 24")} — {t("1 week ago", "1 สัปดาห์ที่แล้ว")}</div>
        </div>
      </div>

      <div className="df">
        <button className="btn"><Icon name="share" size={14} />{t("Share", "แชร์")}</button>
        <button className="btn"><Icon name="download" size={14} />{t("Spec sheet", "เอกสารสเปก")}</button>
        <button className="btn primary"><Icon name="plus" size={14} />{t("Add to project", "เพิ่มเข้าโครงการ")}</button>
      </div>
    </div>
  );
};

window.RMDatabase = RMDatabase;
