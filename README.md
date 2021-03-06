# Prosta aplikacja do katalogowania książek

Aplikacja napisana w React Creat App, oparta o pseudo-bazę **json-server**.

## Pobranie aplikacji na komputer lokalny

Aby pobrać aplikację należy użyć pobrać ją z publicznego repozytorium git. W tym celu otwórz konsolę na komputerze a nastęnie utwórz folder o dowolnej nazwie i przejdź do niego. Następnie wpisujemy polecenie i zatwierdzamy:

### `git clone https://github.com/pjadczak/zadanie-rekrutacyjne.git .`

Dane bazy mieszczą się w pliku db.json. Jeśli nie posiadasz pakietu serwera json-server musisz go zainstalowac polecenirm:

### `npm install -g json-server`

Aby go uruchomić należy w folderze aplikacji wykonać polecenie:

### `json-server --watch db.json --port 3004`

Domyślnie port ustawiony jest na 3000, jednak jest on nam potrzebny do naszej głównej aplikacji.

## Pobranie pakietów

Gdy już pobierzemy aplikację uruchamiamy w folderze aplikacji polecenie

### `npm install`

Dzięki temu powinniśmy pobrać wszystkie potrzebne pakiety.

## Uruchomienie aplikacji

Aby uruchomić aplikację należy posiadać w nowszej wersji śrowisko node.js. Aby lokanie projekt uruchomić należy wejś w konsoli do folderu projektu i wykonać polecenie:

### `npm start`

Polecenie to uruchomi wirtualne serwer. po uruchomieniu powinna się domyślnie uruchomić domyślna przeglądarka z adresem http://localhost:3000/. Jeśli tego nie zrobiłem skopiuj ten adres i wklej do przeglądarki

## Aplikacja

Aplikacja służy do katalogowania książek. Możemy niej:

- Dodawać nowe książki
- Usuwać książki
- Edytować książki

Na liście książek możemy filtrować dane. Są one filtrowane po kategorii oraz po frazach. Frazy są porównywane z polami:

- autor książki
- tagi
- nazwy (pobierane ze wszystkich języków)

Aplikacja nie ma możliwości edycji kategorii oraz wersji językowych. Te dane są wstawione razem z domyślną bazą. Dodatkowo z domyślną bazą są przykładowe rekordy. Listowanie książek nie posiada paginacji.

Jeśli usuniemy za dużo danych i chcemy przywrócić stan pierwotny to w folderze aplikacji znajduje się kopia bazy **db copy.json**, z której możemy skorzystać.

## Omówienie użytych dodatkowych pakietów

- @fortawesome, ikony FontAwesome
- axios, biblioteka obsługująca żądania http
- lottie-react, gotowe animacje
- react-datepicker, picker daty dla formularza
- react-modal, komunikat modal
- react-router-dom, obsługa routingu
- react-toast-notifications, wyskakujące powiadomiania 
- styled-components, obsługa styli scss

## Omówienie technologiczne

Aplikacja została wykonana w React-js poprzez React Create App. Stan globalny aplikacji propagowany jest poprzez Context API, zmiana stanu jest przeprowadzona przez Reducera useReducer. Mniejsze komponenty jeśli używają lokalnego stanu używają zwykłego useState. Aplikacja ma 2 widoki, listy oraz edycji.