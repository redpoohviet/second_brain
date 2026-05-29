# SEI 영상 출력 사양서 (v2.0)
## 📄 목적
영상 제작 툴(`video_production_tool.py`)이 생성하는 모든 콘텐츠는 다음의 구조화된 JSON 스키마를 따릅니다. 이 데이터는 교육 로드맵 및 진도 추적 시스템에 연동됩니다.

## 🧩 핵심 구조 (State-Transition Data)
```json
{
  "quiz_id": "Q[N]_[Module]", // 예: Q003_Module1
  "module_name": "[모듈명]",
  "state_type": "[P | C_SYSTEM_ISSUE | RESOLUTION]", // 필수 상태 유형 정의
  "content_key": "[콘텐츠 식별 키 (예: VETNAM_GRADE_2)]", // 사용 언어/레벨 지정
  "trigger_logic": "상태 전이 트리거 로직 설명 (ex: 퀴즈 실패 시 활성화)",
  "duration_seconds": [3, 7, 5], // 각 스테이지별 예상 길이 (초)
  "visual_elements": {
    "background": "[배경 이미지/색상 코드]",
    "text_overlay": ["메인 카피", "서브 타이틀"],
    "animation": ["애니메이션 유형 및 시간"]
  },
  "call_to_action": {
    "type": "Quiz / Workbook / NextVideo", // 영상이 끝난 후의 다음 액션 지정
    "link": "[상품/워크북 링크 또는 내부 진도 ID]"
  }
}
```

## 📌 개발 시 유의사항 (Must Check)
1.  모든 데이터는 반드시 `module_name`과 연동되어야 합니다.
2.  영상 파일 자체를 아카이빙할 뿐만 아니라, 해당 영상에 사용된 **핵심 로직(trigger\_logic)**을 데이터로 뽑아낼 수 있어야 합니다.