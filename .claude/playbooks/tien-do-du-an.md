# TIẾN ĐỘ DỰ ÁN — chuẩn `TIEN-DO.md` (biết % hoàn thiện không cần hỏi AI)

> Vấn đề: giao việc qua chat thì tiến độ nằm trong memory của từng AI — người giao không thấy,
> AI khác (Codex/ChatGPT) cũng không thấy. Giải pháp: **1 file `TIEN-DO.md` ở root mỗi project**,
> AI nào làm việc thì cập nhật cuối đợt, người mở file là biết đang ở đâu / tắc ở đâu / xong bao nhiêu.

## Luật
1. **Mỗi project 1 file `TIEN-DO.md` ở root repo** (cạnh `CODEX_ART_HANDOFF.md`). Commit cùng đợt việc.
2. **AI kết thúc đợt việc = cập nhật file này TRƯỚC khi báo cáo** (Claude, Codex, bất kỳ ai). Không cập nhật = đợt việc chưa xong.
3. Trạng thái chỉ dùng **4 giá trị**: `⬜ chưa tới` · `🔧 đang làm` · `🔶 CHỜ DUYỆT (ghi rõ chờ ai)` · `✅ xong (kèm ngày)`. Không chế thêm.
4. **% hoàn thiện = đếm ô ✅ / tổng ô áp dụng** — không tự phán "gần xong". Ô không áp dụng cho project thì ghi `—` và loại khỏi mẫu số.
5. Số liệu trong file phải **truy được** (commit hash, ngày, tên nhánh, link handoff) — khớp luật "gate verify không tự khẳng định".
6. Nhật ký đợt: mới nhất trên cùng, mỗi đợt 1 dòng, có commit hash. Dòng nhật ký KHÔNG thay được việc cập nhật bảng.

## Hai tầng theo dõi (khớp công cụ sẵn có)
- **Stage kỹ thuật** = 7 stage của `tools/factory-dashboard` (Provision → Config → Content → Verify → Deploy → GEO-audit → Live). Clone chuẩn của chassis thì dashboard tự quét được; project ngoài chuẩn (event.config, app thuần…) thì bảng trong `TIEN-DO.md` là nguồn duy nhất.
- **Cổng duyệt** = 4 cổng `codex-gates.md` (ART · COPY · SEO · GEO) + điều kiện vào cổng (copy-craft ≥8/10, review-animations cho motion). Đây là chỗ tắc người-thật — dashboard không thấy, bảng này phải thấy.

## Template (copy nguyên, sửa nội dung)
```markdown
# TIẾN ĐỘ — <tên project>
> Cập nhật: <YYYY-MM-DD> · Nhánh chính đang làm: `<branch>` · **Hoàn thiện: <n>/<m> ô ✅**
> Đợt đang chạy: <1 câu — làm gì, tắc gì>

## Stage kỹ thuật
| Stage | Trạng thái | Ghi chú (commit/ngày/bằng chứng) |
|---|---|---|
| Provision (repo + config) | | |
| Config (brand) | | |
| Content | | |
| Verify (`pnpm verify` xanh) | | |
| Deploy (domain sống) | | |
| GEO-audit | | |
| Live | | |

## Cổng duyệt (người/Codex quyết — 🔶 = đang tắc ở người)
| Cổng | Trạng thái | Handoff / điều kiện vào cổng |
|---|---|---|
| ART (gu thị giác) | | CODEX_ART_HANDOFF.md · motion phải qua review-animations trước |
| COPY (định vị/giọng) | | CODEX_COPY_HANDOFF.md · copy-craft ≥8/10 trước |
| SEO (từ khóa/title/slug) | | CODEX_SEO_HANDOFF.md |
| GEO (thực thể/llms.txt) | | CODEX_GEO_HANDOFF.md |

## Nhật ký đợt (mới nhất trên cùng)
- <YYYY-MM-DD> — <đợt gì> — <kết quả> (`<commit>`)
```

## Cách hỏi tiến độ (cho người giao việc)
- Mở `TIEN-DO.md` của project → dòng đầu có % và chỗ tắc. Không cần mở chat.
- Hỏi tổng quan mọi project: chạy `node tools/factory-dashboard/scan.mjs` (clone chuẩn) — project ngoài chuẩn xem tay từng `TIEN-DO.md` (nâng cấp scanner đọc TIEN-DO.md: ghi sổ, chưa làm).
