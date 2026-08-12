# spec-kit pipeline — khi nào ép việc qua SPEC trước khi code

> Tầng **kỷ luật đặc tả**: bù cho chỗ mà vibe-coding hay trượt — làm xong mới phát hiện
> hiểu sai đề. Nguồn: github/spec-kit (MIT), payload tại `spec-kit/`, cài chuẩn bằng
> `uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude`.

> ## ⚠ TÊN LỆNH PHỤ THUỘC LỐI CÀI — gõ sai sẽ tưởng "spec-kit chưa cài"
> | Lối cài | Dạng tên | Ví dụ |
> |---|---|---|
> | `bootstrap.ps1` (lối của toolkit) | dạng **GẠCH** | `/speckit-specify` (thư mục `skills/speckit-specify`, frontmatter `name: speckit-specify`) |
> | CLI upstream `specify init` | dạng **CHẤM** | `/speckit.specify` |
>
> Bảng dưới ghi **dạng chấm theo upstream**. Cài bằng bootstrap thì **đổi `.` thành `-`**.
> Lệnh báo không tồn tại → thử dạng còn lại TRƯỚC khi kết luận spec-kit chưa cài; đừng vì gõ sai
> một dấu mà bỏ luôn quy trình spec-trước-code. (Tên thư mục skill giữ nguyên, không đổi — đổi sẽ
> phá các project đã cài.)

## Tư tưởng lõi (từ spec-driven.md, tóm tắt)

Spec là **nguồn sự thật**, code là **sản phẩm dẫn xuất**. Chu trình 8 lệnh (+2 nhánh tùy chọn):

| Lệnh | Ra cái gì | Ghi chú |
|---|---|---|
| `/speckit.constitution` | Luật bất biến của project (nguyên tắc, stack, chuẩn chất lượng) | 1 lần/project — với clone chassis: viết từ `client.config` + DESIGN.md |
| `/speckit.specify` | `spec.md` — WHAT & WHY, user story, acceptance criteria; KHÔNG bàn tech | Mỗi feature 1 branch + 1 thư mục spec (script tự tạo) |
| `/speckit.clarify` | Bảng hỏi–đáp xóa mơ hồ trong spec | Chạy TRƯỚC plan; đỡ "làm xong mới hỏi" |
| `/speckit.plan` | `plan.md` — HOW: kiến trúc, data model, contracts theo constitution | |
| `/speckit.tasks` | `tasks.md` — việc nhỏ có thứ tự, đánh dấu song song được | |
| `/speckit.taskstoissues` *(tùy chọn)* | Biến tasks thành GitHub issue theo thứ tự phụ thuộc | **Chỉ khi** project có repo GitHub và cần theo dõi tiến độ theo issue — nối `playbooks/tien-do-du-an.md`. Không có repo GitHub thì bỏ qua, tasks.md là đủ |
| `/speckit.analyze` | Soi mâu thuẫn spec ↔ plan ↔ tasks trước khi code | Gate rẻ nhất của cả chuỗi |
| `/speckit.implement` | Code theo tasks, tick từng việc | |
| `/speckit.converge` | Soi codebase THẬT ngược lại spec/plan/tasks, append việc chưa dựng vào `tasks.md` | **Cổng nghiệm thu ngược — chạy TRƯỚC khi khai hoàn thành.** Còn append task mới = **CHƯA xong**, quay lại `/speckit.implement` rồi converge lại. Chỉ khi converge không sinh task mới mới được báo xong |
| `/speckit.checklist` *(tùy chọn)* | Checklist riêng cho một mảng (a11y, bảo mật, nội dung…) | Gọi khi feature có mảng cần soi sâu ngoài tasks |

**Luật chống "báo xong khi chưa xong":** `/speckit.implement` tick hết task ≠ xong. Xong = `/speckit.converge`
chạy sạch. Đây là chỗ AI hay trượt nhất — tick theo danh sách của chính mình thay vì đối chiếu code thật.

## Bản đồ tình huống (dùng gì, khi nào)

| Tình huống | Dùng |
|---|---|
| Feature nhiều màn/nhiều luồng trên project đang chạy (vd panel đặt hàng, hệ đăng ký khóa học + webhook) | **spec-kit trọn chu trình** |
| Dựng module mới cho chassis / clone site cho khách mới (yêu cầu khách = spec) | **spec-kit**: constitution từ client.config → specify từ brief khách |
| Sửa bug, chỉnh copy, đổi token màu, việc < 1 buổi | **KHÔNG spec-kit** — đi thẳng, khỏi nghi lễ |
| Thẩm mỹ / art direction | Art gate (DESIGN.md + CODEX_ART_HANDOFF) — spec-kit không thay được mắt người |
| Nghiên cứu/planning thuần (chưa chắc build) | planner agent hoặc `/speckit.specify` đơn lẻ làm bản nháp đề bài |

## Luật chồng lấn với các tầng sẵn có

- **development-workflow.md (ECC rules global)** — vẫn là khung ngoài (Research & Reuse → Plan
  → TDD → Review → Commit). spec-kit **thay thế bước "Plan First/planner"** khi feature đủ lớn:
  constitution/spec/plan/tasks của spec-kit = planning docs (PRD, architecture, task_list) mà
  workflow yêu cầu. TDD + code-review + git-workflow của ECC giữ nguyên quanh `/speckit.implement`.
- **superpowers** (brainstorm → plan → subagent-dev) — chọn MỘT trong hai cho mỗi đợt việc, đừng
  chạy cả hai chu trình planning chồng nhau. Mặc định: việc-cho-khách/feature sản phẩm → spec-kit
  (artefact spec nằm lại trong repo, khách soi được); việc khai phá/ý tưởng mơ hồ → superpowers.
- **ECC engineering harness** (build-error-resolver, e2e-runner…) — tầng THI CÔNG, gọi trong lúc
  `/speckit.implement`, không xung đột.

## Gotchas

- Command file trong payload có placeholder (`{SCRIPT}`, `$ARGUMENTS`) — cài bằng CLI thì được
  thay tự động; copy tay phải tự sửa. Ưu tiên CLI.
- Script tạo feature mặc định tạo **branch mới** mỗi feature — vướng luật [git ít nhánh gộp việc]
  (1 nhánh/đợt việc). Trong repo đang có nhánh làm việc chung: cứ để spec nằm trong `specs/`,
  gộp branch feature về nhánh đợt việc ngay, rồi `export SPECIFY_FEATURE=<tên-feature>` để các
  lệnh sau (plan/tasks/implement) bám đúng thư mục spec mà không cần đứng trên branch cùng tên
  (cơ chế chính thức của script — xem thông báo `To persist:` khi tạo feature).
- Spec-kit không có bước THẨM MỸ — mọi output UI vẫn phải qua design contract + art gate.
