# ECC Pipeline (kho `../ECC` — Everything Claude Code)

Cầu nối giữa kho **ECC** (affaan-m/ECC, MIT — 63 agents · 251 skills · 79 commands · 21 bộ rules · hooks · install profiles, multi-harness Claude/Codex/Cursor/Kiro) và bộ đồ nghề agency. KHÔNG copy kho vào toolkit — dùng thẳng repo gốc (pull upstream). File này nói **cái gì đã cài, cái gì đáng lấy thêm, và luật chồng lấn**.

## Vị trí của ECC trong dây chuyền 4 tầng

| Tầng | Kho | Trả lời câu hỏi |
|---|---|---|
| ĐẸP | design-systems + skills design (impeccable, art-direction…) | Trông có gu không? |
| BÁN ĐƯỢC | `marketingskills/` (47 skills) | Có ra khách không? |
| ĐỘI NGŨ | `agency-agents/` (~600, theo phòng ban) | Ai làm việc gì? |
| **VẬN HÀNH KỸ THUẬT** | **`ECC/`** | Code có chất lượng, harness có kỷ luật không? |

## Trạng thái ĐÃ CÀI (đừng cài lại)

- **`~/.claude/rules/ecc/`** — 9 rules `common` (agents, code-review, coding-style, testing, security, git-workflow, hooks, patterns, performance) đang nạp global cho MỌI project. Đây là "hiến pháp kỹ thuật" hiện hành.
- **Toolkit skills**: `skills/configure-ecc` (cài/cấu hình) + `skills/ecc-guide` (tra cứu ECC bằng cách đọc repo sống) — dùng `ecc-guide` khi cần tìm thành phần ECC thay vì lục tay 251 skills.
- 2 agents `~/.claude/agents/` (AI Citation, AEO Foundations) là của toolkit, KHÔNG phải ECC.

## Đáng lấy thêm — theo tình huống agency

| Tình huống | Thành phần ECC | Cách dùng |
|---|---|---|
| Review code trước merge (chassis/giftyid Next.js) | agents `code-reviewer`, `code-simplifier`; rules `typescript/`, `react/`, `web/` | copy agent .md vào `~/.claude/agents/` hoặc `.claude/agents/` của project; rules per-language cài theo project |
| Build đỏ không rõ nguyên nhân | agents `build-error-resolver` (+ bản per-language go/java/kotlin…) | gọi qua Task khi build fail |
| QA UX/a11y trước bàn giao khách | agents `a11y-architect`; skills `browser-qa`, `click-path-audit`, `accessibility` | pass cuối trước go-live, sau impeccable |
| E2E flows quan trọng (form lead, panel đặt hàng, /card) | agent `e2e-runner` | viết + chạy E2E theo flow tiền thật |
| Dựng harness/agent tự trị cho khách | skills `agent-harness-construction`, `autonomous-loops`, `agentic-engineering` | tham khảo pattern khi bán "AI operator" |
| Backend/API cho dự án ngoài chassis | skills `backend-patterns`, `api-design`, `architecture-decision-records` | lens thiết kế trước khi code |
| Giữ trí nhớ dài hạn cho máy khác | `hooks/memory-persistence` | cân nhắc khi setup máy mới |
| Cài nhanh máy mới / máy khách | `install.sh` / `install.ps1` với **profiles**: `minimal` · `core` · `developer` · `security` · `research` · `full` | `developer` cho máy dev chính; `minimal` cho máy chỉ chạy content |

## Luật chồng lấn — ai thắng mảng nào

- **Marketing**: `marketingskills/` THẮNG (chuyên sâu, có evals). ECC `marketing-agent`/`brand-voice`/`article-writing` chỉ là fallback khi cần chạy trong pipeline ECC thuần.
- **Design/gu**: toolkit design skills (impeccable, art-direction-factory…) THẮNG. ECC `accessibility`/`browser-qa` bổ phần QA kỹ thuật SAU pass thẩm mỹ, không thay thế.
- **Engineering harness** (review, build-fix, e2e, rules ngôn ngữ): ECC THẮNG — agency-agents/engineering (6 agent) mỏng hơn hẳn.
- **Đội ngũ business** (sales, strategy, phòng ban): `agency-agents/` THẮNG (ECC không có lớp này).
- **Rules global**: bộ `~/.claude/rules/ecc/` là chuẩn hiện hành — muốn đổi thì sửa Ở ĐÓ (qua skill `configure-ecc`), đừng chép bản thứ hai vào project gây lệch.

## Cách gọi từ project

1. Cần tra cứu ECC → dùng skill **`ecc-guide`** (đọc repo sống, không đoán).
2. Thành phần dùng thường xuyên cho 1 project → copy riêng vào `<project>/.claude/{agents,skills}/` (pattern giống design-skills nhúng trong chassis).
3. Update kho: `cd ECC && git pull` — rules đã cài KHÔNG tự update (chủ động diff `rules/common` vs `~/.claude/rules/ecc/` khi pull major).

## Ghi chú kích thước

ECC có 251 skills phủ mọi ngành (blender, cisco, clickhouse, healthcare…) — phần lớn KHÔNG liên quan agency này. Đừng cài `full`; chọn theo bảng tình huống ở trên. Kho để nguyên tại `D:\Workspace\A3 Landingpage\ECC` làm nguồn tra cứu.
