# CODEX_GEO_HANDOFF: LSY entity profile, 2026-08-12

## Entity fields

| Field | Proposed value | Public source |
|---|---|---|
| Brand | Máy lọc nước LSY | iCheck product record, Facebook page |
| Legal name | CÔNG TY TNHH LSY | Thư Viện Pháp Luật tax record, MaSoThue |
| Tax ID | 0801321580 | Thư Viện Pháp Luật, MaSoThue, iCheck |
| Founding date | 2020-04-21 | Thư Viện Pháp Luật, MaSoThue |
| Phone | 0966817188 | Thư Viện Pháp Luật and iCheck |
| Current tax address | Đội 8, thôn An Điềm, xã Cẩm Giang, thành phố Hải Phòng | 2026 tax-address records |
| SameAs | https://www.facebook.com/198754154014260/ | Public page ID linked by the LSY recruitment profile |

## Sources

- https://thuvienphapluat.vn/ma-so-thue/cong-ty-tnhh-lsy-mst-0801321580.html
- https://masothue.com/0801321580-cong-ty-tnhh-lsy
- https://icheck.vn/san-pham/may-loc-nuoc-lsy-8938535347005
- https://www.facebook.com/198754154014260/

## Conflict review

iCheck still displays the older or inconsistent owner name `CÔNG TY TNHH KTKT SÁNG THỊNH` for the same tax ID, while current registry-derived sources display `CÔNG TY TNHH LSY`. The website uses the current legal name and keeps the iCheck record as an external mention, not as the legal-name authority.

Public sources also disagree on secondary phone numbers. The website uses 0966817188 because it is repeated by the product record and the registry-derived listing. Other numbers are omitted.

The email `info@lsy.vn` has no public source and the domain currently has no resolving DNS. It is treated as a deployment mailbox to provision, not a verified entity fact. The deploy owner must create the inbox or replace it before enabling live lead delivery.

## Validation status

- Local schema and JSON-LD validation: covered by `pnpm verify`.
- External Rich Results Test and Schema Validator: cannot run against `lsy.vn` until DNS and deployment exist.
- Citation baseline: deferred until the public site is reachable.

Codex decision: approve the current legal name, tax ID, founding date, address, phone and Facebook `sameAs` with the conflict note above. Do not add a representative name, LocalBusiness opening hours or additional social profiles without owner-supplied records.
