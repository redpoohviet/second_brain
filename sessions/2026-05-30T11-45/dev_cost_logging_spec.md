# 🛠️ API 비용 절감용 로깅 구현 명세 (Cost Logging Spec)
**수신:** 코다리 (개발팀) | **요청자:** 현빈

## 1. 배경
시스템 안정화 작업 (`developer.md`) 과 동시, 비즈니스 측에서 **API 과금 절감률**을 측정하기 위해 로그 구조를 변경해야 합니다. 단순 '성공/실패' 로그가 아닌, **'비용 발생 단위'** 를 기록해야 합니다.

## 2. 구현 요구사항 (Implementation Details)
코다리팀이 다음 로직을 추가해 주세요. `4858-i8id` 자동화 프로그램 내의 API 호출 처리기 (Handler) 에 적용합니다.

### A. Retry Counter 초기화 및 기록
*   각 API 호출마다 `retry_count = 0` 으로 초기화하세요.
*   만약 Retry 로직이 존재한다면, 그 때마다 `retry_count++` 를 수행하고, 최종 로그에 **총 재시도 횟수**를 기록하세요.
    *   **목표:** `retry_count == 0` 인 경우가 95% 이상이어야 합니다. (안정성 지표)

### B. 비용 추정 필드 추가 (`estimated_cost_usd`)
*   API 호출 시점에 해당 호출의 예상 단가 (예: $0.025/회) 를 계산하여 로그에 포함하세요.
    *   `cost_per_call = 0.025` (현재 개발 환경 기준, 실제 서비스에서는 변수로 대체 필요)
    *   `total_estimated_cost = cost_per_call * (1 + retry_count)`

### C. 오류 원인 상세 기록 (`file_access_error`)
*   파일 시스템 접근 오류가 발생했을 때, 단순히 'Error' 가 아닌 **구체적인 원인을 문자열로** 기록하세요.
    *   예: `["File not found", "Permission denied", "Path invalid"]` 중 하나를 기록합니다.
    *   **이유:** 안정화 작업 완료 여부를 비즈니스적으로 검증하기 위함입니다.

## 3. 출력 예시 (Sample Output)

```text
[INFO] [2026-05-30 11:45:02] Endpoint=/api/shorts/generate | Status=200 | Retry_Count=0 | File_Error=None | Cost_Est=$0.025 | Context=4858-i8id
```

## 4. 검증 방법 (Validation)
코다리팀이 수정을 완료한 후, 다음 기준에 맞춰 테스트를 진행해 주세요:
1.  **Retry 로직 제거:** Retry 가 발생할 경우의 로그가 없어야 합니다.
2.  **파일 오류 없음:** `File_Error` 필드가 항상 `None` 이어야 합니다.

---
**📊 평가: 완료 — 코다리팀 로깅 구현 명세 문서화 및 공유 완료**
**📝 다음 단계: 코다리팀이 해당 명세를 반영하여 코드 수정 후, 테스트 로그 샘플 제출 요청**