# Lubimy czytać

|Imię     |Nazwisko   |Nr indeksu   |
|---------|:----------|:------------|
|Kinga    |Baryczka   |306424       |
|Karol    |Kawalec    |306457       |

## 1. Opis projektu

Projekt dotyczy stworzenia RESTowego API dla czytelników książek. System zakłada 
istnienie użytkowników dwóch typów, administratora i zwykłego użytkownika. 
API pozwala na operacje przeszukiwania bazy książek, pozwala na wyświetlanie 
książek po gatunkach, tytule, wydawnictwie albo autorze i jest to opcja dostępna również dla 
niezalogowanego użytkownika. Dla zalogowanych użytkownikow istnieje opcja tworzenia 
własnej spersonalizowanej książek, do której dodaje się książki, które już się 
przeczytało. Ponadto, zalogowani użytkownicy mogą dodawać opinie do książek, co 
pozwoli innym użytkownikom na stwierdzenie, czy warto daną książkę przeczytać. 
Istnieje również opcja zaktualizowania swojej recenzji, a także usunięcia jej.
Administrator zajmuje się dodawaniem książek do bazy, ich aktualizacją i 
ewentualnym usuwaniem.  API operuje na logach w celu zapisywania działań użytkowników.


## 2. Baza danych

### Schemat bazy danych 
![Alt text](./resources/Schemat%20bazy.png)
Projekt wykorzystuje relacyjną bazę danych MySQL i składa się z ośmiu tabel 
wygenerowanych poprzez migrację. Połączenie z bazą danych jest ustanowione poprzez 
wykorzystnanie biblioteki knex. W projekcie został wykorzystany ORM objection.

## 3. Routingi

[dokumentacja](./resources/Swagger%20UI.html)

## 4. Wykorzystane biblioteki
#### Routing
* express
#### Obsługa danych
* knex
* objection
* mysql
#### Hashwoanie haseł
* argon2
#### Przechowanie zmiennych środowiskowych serwera i bazy danych
* dotenv
#### Autoryzacja dostępu użykownika do wybranych zasobów 
* jsonwebtoken
* cookie-parser 
#### Dokumentacja
* swagger-jsdoc
* swagger-ui-express
#### Dev
* nodemon
#### Testy
* chai
* mocha
* supertest
