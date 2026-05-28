<file>
# 📊 KPI 대시보드 설계안 (로컬 기반, 비개발자 모니터링용)

**작성일:** 2026-05-29  
**작성자:** 💼 현빈 (Head of Business)  
**목표:** YouTube Studio + 제휴 플랫폼 데이터를 로컬 CSV 로 수집 → Google Sheets 에서 시각화  

---

## 1. 📁 데이터 수집 구조 (로컬 파일 기반)

```text
project_root/
├── data/
│   ├── youtube_stats.csv      # YouTube Studio 데이터 (조회수, CTR, 시청 지속율)
│   ├── affiliate_sales.csv    # 제휴 플랫폼 판매 내역 (Amazon/AppSumo)
│   └── revenue_log.json        # 실시간 수익 로그 (월별/일별 합계)
├── scripts/
│   └── kpi_collector.py        # 코다리 구현: CSV 자동 수집 스크립트
└── dashboard_template.xlsx     # Google Sheets 템플릿 (시각화용)
```

### 1.1 YouTube 데이터 추출 항목 (csv 헤더)

| 열명 | 설명 | 데이터 소스 |
| :--- | :--- | :--- |
| `date` | 업로드 날짜 | YouTube Studio → "콘텐츠" 탭 |
| `video_id` | 영상 ID | YouTube Studio → "콘텐츠" 탭 |
| `views` | 조회수 | YouTube Studio → "분석" 탭 |
| `ctr` | 클릭률 (CTA 버튼) | YouTube Studio → "상세 정보" 링크 분석 |
| `avg_watch_time` | 평균 시청 지속시간 | YouTube Studio → "분석" 탭 |
| `drop_off_rate` | 이탈률 (T=10~15 초 구간) | YouTube Studio → "시청 지속율" 그래프 |

### 1.2 제휴 판매 데이터 추출 항목 (csv 헤더)

| 열명 | 설명 | 데이터 소스 |
| :--- | :--- | :--- |
| `date` | 구매 날짜 | Amazon/AppSumo Dashboard |
| `product_name` | 제품명 | 제휴 플랫폼 리포트 |
| `price_usd` | 판매 가격 | 제휴 플랫폼 리포트 |
| `commission_pct` | 수수료율 | 제휴 플랫폼 설정 |
| `revenue_usd` | 실제 수익 (수수료 후) | 제휴 플랫폼 리포트 |

---

## 2. 📈 Google Sheets 대시보드 템플릿 구조

### 2.1 탭 구성

| 탭명 | 용도 | 시각화 차트 |
| :--- | :--- | :--- |
| **Summary**<br>(요약) | 월별 수익 합계, CTR 평균, 전환율 목표 대비 달성도 | - 총 수익 (Bar)<br>- 목표 대비 달성률 (Gauge)<br>- CTR 트렌드 (Line) |
| **YouTube Performance**<br>(유튜브 성과) | 조회수, 시청 지속율, 이탈률 분석 | - 조회수 (Area Chart)<br>- 시청 지속율 (Line + Target Line 26s)<br>- 이탈률 (Bar) |
| **Affiliate Sales**<br>(제휴 판매) | 제품별 판매 내역, AOV 추이 | - 총 수익 (Stacked Bar)<br>- AOV 트렌드 (Line)<br>- 제품별 판매 수 (Pie) |
| **ROI Calculator**<br>(투자 대비 수익률) | 광고 비용 vs 수익 (확장 시) | - ROAS 그래프<br>- Break-even 분석 |

### 2.2 목표치 설정 (조건부 포맷팅 적용)

| 지표 | 목표치 | 조건부 포맷팅 규칙 |
| :--- | :--- | :--- |
| **CTR** | > 4% | < 3% → 빨간색, 3~4% → 오렌지, > 4% → 초록색 |
| **전환율** | > 15% | < 10% → 빨간색, 10~15% → 노란색, > 15% → 초록색 |
| **시청 지속율** | > 26 초 (30s 영상 기준) | < 20 초 → 빨간색, 20~26 초 → 오렌지, > 26 초 → 초록색 |

---

## 3. 🛠️ 코다리 구현 스펙 (kpi_collector.py)

### 3.1 기능 요구사항

- **CSV 자동 수집:** YouTube Studio API (또는 CSV 업로드) + 제휴 플랫폼 CSV 가져오기
- **데이터 합산:** `revenue_log.json` 에 월별/일별 수익 로그 기록
- **경고 알림:** CTR < 4% 또는 전환율 < 15% 일 때 Slack/Email 로 알림 (선택)
- **비개발자 친화적 UI:** Google Sheets 탭별로 별도 시각화

### 3.2 데이터 파이프라인 아키텍처

```python
# pseudocode 예시 - 실제 구현 시 코다리가 작성
def collect_youtube_data():
    # YouTube Studio API 또는 CSV 파일에서 데이터 추출
    youtube_stats = read_csv("data/youtube_stats.csv")
    return youtube_stats

def collect_affiliate_sales():
    # 제휴 플랫폼 CSV 파일에서 판매 내역 추출
    affiliate_sales = read_csv("data/affiliate_sales.csv")
    return affiliate_sales

def update_dashboard(youtube_stats, affiliate_sales):
    # Google Sheets API 또는 CSV 업데이트
    write_to_google_sheets("dashboard_template.xlsx", youtube_stats, affiliate_sales)
    generate_alerts_if_needed()  # CTR < 4% 시 알림
```

---

📊 평가: **완료** — KPI 대시보드 설계 및 데이터 구조가 명확히 정의됨  
📝 다음 단계: 코다리가 `kpi_collector.py` 스크립트 구현 (CSV 자동 수집 + Google Sheets 연동)