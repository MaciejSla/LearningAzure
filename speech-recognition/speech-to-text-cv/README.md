# Speech to text CV project

# English

Website for Searching Records and Filling Out Forms Using Speech

### Requirements

Create an `.env` file in the **`speech-recognition\speech-to-text-cv`** directory with the following environment variables:

- `SPEECH_KEY` - Azure Speech Service key
- `SPEECH_REGION` - Azure Speech Service region
- `OPENAI_API_KEY` - Azure OpenAI Service key
- `OPENAI_API_ENDPOINT` - Azure OpenAI endpoint
- _`DATABASE_URL` (optional)_ - The default database URL is provided in `docker-compose.yml` and can be changed if necessary.

**Please note that the application won't work without these environment variables set correctly.**

### Running

To run this project, use the following command: `docker-compose up -d`.

Once both containers are up and running, you can access the website at http://localhost.

---

# Polski

Strona do Wyszukiwania Rekordów i Wypełniania Formularzy za Pomocą Mowy

### Wymagania

Należy utworzyć plik `.env` w katalogu **`speech-recognition\speech-to-text-cv`** z następującymi zmiennymi środowiskowymi:

- `SPEECH_KEY` - Klucz usługi Azure Speech
- `SPEECH_REGION` - Region usługi Azure Speech
- `OPENAI_API_KEY` - Klucz usługi Azure OpenAI
- `OPENAI_API_ENDPOINT` - Endpoint usługi Azure OpenAI
- _`DATABASE_URL` (opcjonalne)_ - Domyślny adres URL bazy danych jest dostępny w pliku `docker-compose.yml` i może być zmieniony, jeśli jest to konieczne.

**Należy pamiętać, że aplikacja nie będzie działać poprawnie bez prawidłowo ustawionych zmiennych środowiskowych.**

### Uruchamianie

Aby uruchomić ten projekt, użyj następującej komendy: `docker-compose up -d`.

Po uruchomieniu obu kontenerów, witryna będzie dostępna pod adresem http://localhost.
