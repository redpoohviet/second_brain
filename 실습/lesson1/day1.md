# 트랜스포머(Transformer) 아키텍처 및 핵심 메커니즘 요약

## 1. 트랜스포머(Transformer) 개요
트랜스포머는 2017년 구글 연구팀의 논문 *"Attention Is All You Need"*에서 제안된 딥러닝 아키텍처로, 현대 자연어 처리(NLP) 및 거대 언어 모델(LLM)의 핵심 기반 기술입니다.

### 기존 모델(RNN, LSTM)의 한계와 혁신
* **기존 방식 (RNN/LSTM):** 텍스트 데이터를 순차적으로(Sequential) 처리하므로 문장이 길어질수록 앞쪽의 정보를 잊어버리는 **장기 의존성(Long-Term Dependency)** 문제가 발생하며, 병렬 연산이 불가능해 대규모 학습에 오랜 시간이 걸렸습니다.
* **트랜스포머 방식:** 문장 내 모든 단어를 **동시에(Parallel)** 입력받아 처리합니다. GPU의 병렬 연산 성능을 극대화할 수 있어 대규모 데이터셋을 매우 빠른 속도로 학습할 수 있습니다.

---

## 2. 핵심 메커니즘: 셀프 어텐션 (Self-Attention)
셀프 어텐션은 문장 안에서 **단어와 단어 사이의 관계 및 맥락적 유사도를 스스로 계산하여 가중치를 부여**하는 기술입니다.

### 작동 방식 및 직관적 예시
> *"그 동물은 길을 건너지 못했다. 왜냐하면 그것은 너무 **지쳤기** 때문이다."* $
ightarrow$ **'그것' = 동물**
> *"그 동물은 길을 건너지 못했다. 왜냐하면 그것은 너무 **넓었기** 때문이다."* $
ightarrow$ **'그것' = 길**

트랜스포머는 문맥 속 단어 조합을 분석하여, 서술어('지쳤기' 또는 '넓었기')에 따라 대명사('그것')가 가리키는 대상이 무엇인지 정확하게 찾아내고 해당 단어 간의 연결 고리를 강화합니다.

### 수학적 연산 구조 (Query, Key, Value)
입력된 각 단어 토큰은 고차원 벡터로 변환된 후, 세 가지 성분의 벡터로 투영되어 연산됩니다:
1. **Query ($Q$):** 현재 집중하고자 하는 기준 단어 (질문)
2. **Key ($K$):** 문장 내에 있는 모든 단어 (비교 대상)
3. **Value ($V$):** 각 단어가 지닌 실제 의미 정보 (내용물)

셀프 어텐션의 행렬 연산 공식은 다음과 같습니다:

$$	ext{Attention}(Q, K, V) = 	ext{softmax}\left(rac{QK^T}{\sqrt{d_k}}
ight)V$$

* $QK^T$: 기준 단어($Q$)와 문장 내 모든 단어($K$) 간의 유사도를 측정하는 내적 연산입니다.
* $\sqrt{d_k}$: 소프트맥스 함수 적용 시 값이 비대해져 기울기 소실(Vanishing Gradient)이 발생하는 것을 방지하기 위한 스케일링 요소입니다.
* $	ext{softmax}$: 유사도 점수를 0과 1 사이의 확률값(가중치)으로 정규화합니다.
* 최종적으로 정규화된 가중치를 실제 의미 정보($V$)에 곱해주어, 맥락이 반영된 동적 인베딩 벡터를 출력합니다.

---

## 3. 트랜스포머 구조: 인코더와 디코더
트랜스포머는 크게 정보를 압축하는 **인코더(Encoder)**와 정보를 풀어내는 **디코더(Decoder)** 블록의 쌍으로 구성됩니다.

```
[입력 문장] ──> [ 인코더 (Encoder) ] ──(맥락 벡터)──> [ 디코더 (Decoder) ] ──> [출력 문장]
```

### 1) 인코더 (Encoder)
* 입력 문장 전체를 양방향(Bi-directional)으로 동시에 훑으며 단어 간의 관계를 분석합니다.
* 문장의 언어적 특징과 의미를 깊이 있게 파악하는 데 특화되어 있으며, 대표적인 인코더 기반 모델로 **BERT**가 있습니다.

### 2) 디코더 (Decoder)
* 인코더가 전달해 준 맥락 정보와, 현재 시점까지 자신이 생성한 단어들을 기반으로 **다음에 올 가장 적절한 단어를 예측(Auto-regressive)**합니다.
* 문장 생성 및 텍스트 이어 쓰기에 특화되어 있으며, 대표적인 디코더 기반 모델로 **GPT 시리즈, Gemini** 등이 있습니다.

---

## 4. 저자들의 실습 코드 저장소 안내
Hugging Face의 주 저자들(Lewis Tunstall, Leandro von Werra, Thomas Wolf)이 집필한 《Natural Language Processing with Transformers》 도서의 모든 핵심 파이썬 및 PyTorch 실습 코드는 아래 공식 오픈소스 저장소에서 제공됩니다.

* **공식 GitHub 저장소:** [nlp-with-transformers/notebooks](https://github.com/nlp-with-transformers/notebooks)
* **주요 실습 내용:** * Hugging Face `Trainer` API 기반의 텍스트 분류 및 파인튜닝
  * PyTorch를 활용한 셀프 어텐션 및 트랜스포머 레이어 밑바닥부터 직접 구현(From Scratch)
  * 모델 최적화(양자화, 지식 증류) 및 코드 자동완성 모델(CodeParrot) 대규모 분산 학습 구현

---

## 5. 트랜스포머 파이토치(PyTorch) 구현 예제 (간단한 Self-Attention)

이 코드는 위에서 설명한 **Query, Key, Value**를 활용한 스케일드 닷 프로덕트 어텐션(Scaled Dot-Product Attention)의 핵심 동작을 보여주는 간단한 파이토치 예제입니다.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class ScaledDotProductAttention(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, query, key, value, mask=None):
        # 1. 차원 크기 d_k 추출
        d_k = query.size(-1)
        
        # 2. 내적(Dot Product)을 통한 Attention Score 계산: Q * K^T
        scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
        
        # 3. (선택) 마스킹 처리
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
            
        # 4. Softmax를 통과시켜 0~1 사이의 Attention 가중치(확률값)로 변환
        attention_weights = F.softmax(scores, dim=-1)
        
        # 5. 가중치와 Value를 곱해서 최종 문맥 벡터 생성
        output = torch.matmul(attention_weights, value)
        
        return output, attention_weights

# --- 실행 예시 ---
if __name__ == "__main__":
    batch_size = 1
    seq_len = 4   # 단어 개수
    d_model = 8   # 임베딩 차원 (Q, K, V 차원)
    
    # 임의의 단어 임베딩 값 (Q, K, V)
    Q = torch.rand(batch_size, seq_len, d_model)
    K = torch.rand(batch_size, seq_len, d_model)
    V = torch.rand(batch_size, seq_len, d_model)
    
    attention = ScaledDotProductAttention()
    context_vector, attn_weights = attention(Q, K, V)
    
    print("Context Vector Shape:", context_vector.shape)
    print("Attention Weights:\\n", attn_weights)
```