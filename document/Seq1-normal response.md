```sequence
Title: 하나의 video를 요청하기 위한 Sequence
Actor->Bot: /start
Bot->Actor: ACK: 안녕하세요, {USER}님!
Actor->Bot: /dl {link}
Bot->Actor: 알겠어요, 어떤 것을 요청하시겠어요? 1) video 2) audio 3) link
Actor->Bot: 1) video
Bot->Actor: ACK: 준비를 시작할게요.
Bot->Wrapper: extract_info(link)
Note over Bot,Wrapper: 정보 추출 대기
Wrapper->Bot: extractComplete(filePath)
Bot->Actor: 준비가 완료되었어요. 바로 보내드릴게요.
Bot->Actor: sendFile(filePath)
```

