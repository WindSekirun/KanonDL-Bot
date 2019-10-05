```sequence
Actor->Telegram: ... (or supported link)
Telegram->Actor: ACK, Music will be ready
Telegram->Wrapper: request link with audio-only format
Wrapper->Telegram: ACK, Downloading
Wrapper->Telegram: Music is Ready
Telegram->Actor: Your music is ready! download link is ...
```

