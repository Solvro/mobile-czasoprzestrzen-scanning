# Scenariusze użycia - klient

## Logowanie
Klient loguje się do aplikacji używając swojego loginu i wprowadzając hasło. W przypadku poprawnych danych następuje przekierowanie do głównego ekranu aplikacji. W przeciwnym razie zostanie wyświetlony komunikat o błędzie.

## Rejestracja
Nowy użytkownik podaje swoje dane korzystając z panelu rejestracji: imię, nazwisko, numer telefonu, adres e-mailowy oraz hasło. W przypadku, gdy jest reprezentantem firmy, a nie osobą fizyczną, zaznacza odpowiednią opcję i podaje dane firmy takie jak NIP i REGON. W przypadku poprawnej rejestracji i poprawnie wprowadzonych danych, zostanie wyświetlony komunikat o rejestracji zakończonej sukcesem i nastąpi przekierowanie do ekranu logowania. W razie niepowodzenia wyświetli się komunikat o błędzie.

*Poniższe czynności mogą nastąpić jedynie w przypadku, gdy użytkownik jest **zalogowany***.

## Przeglądanie listy dostępnego sprzętu
Klient za pomocą przycisku **Lista sprzętu** może zostać przekierowany na ekran, na którym może przeglądać listę sprzętu. Użytkownik może przefiltrować listę dostępnego sprzętu po następujących atrybutach:

- nazwa - użytkownik wpisuje w wyszukiwarkę nazwę interesującego go sprzętu,
- kategoria - użytkownik zaznacza na liście interesującego go kategorie sprzętu, np. *mikrofony*, *kable* itp.,
- dostępność - użytkownik wybiera czy na liście ma zostać wyświetlony jedynie sprzęt dostępny w magazynie, czy też sprzęt w danej chwili wypożyczony.

Poszczególne pozycje listy będą zawierać następujące informacje: 

- dokładna nazwa przedmiotu,
- kategoria, do której przedmiot przynależy,Jeżeli wypożyczenie przebiegnie poprawnie to zostanie wyświetlony ekran, na którym użytkownik będzie
- informacja, czy dany przedmiot jest dostępny (w przypadku, gdy przedmiot został już wypożyczony, wyświetlana będzie przewidywana data zwrotu).

W przypadku, gdy użytkownik kilknie w dany przedmiot na liście nastąpi przekierowanie do ekranu ze szczegółowymi informacjami o przedmiocie, które, w stosunku do informacji dostępnych z poziomu listy, zostaną rozszerzone o **zdjęcie przedmiotu** oraz o krótki, bardziej szczegółowy **opis**.

## Przeglądanie listy sprzętu wypożyczonego przez użytkownika.
Przeglądanie sprzętu wypożyczonego w danym momencie przez użytkownika wygląda analogicznie jak **przeglądanie listy dostępnego sprzętu**.

## Przeglądanie listy z historią wypożyczeń.
Przeglądanie listy z historią wypożyczeń będzie miało podobny charakter co przeglądanie listy dostępnego sprzętu, z tą różnicą, że użytkownik nie będzie już miał możliwości przejścia do widoku ze szczegółowymi informacjiami o danym sprzęcie, a na liście będą dodatkowo wyświetlane data wypożyczenia oraz data zwrotu danego przedmiotu.

## Wypożyczanie sprzętu
Użytkownik może za pomocą przycisku **Wypożycz** na ekranie głównym aplikacji, przejść do ekranu, na którym będzie mógł zeskanować kod QR w celu wypożyczenia danego przedmiotu. Po zeskanowaniu zostanie wyświetlony ekran, na którym użytkownik będzie mógł ustawić datę zwrotu i zatwierdzić wypożyczenie. Jeżeli wypożyczenie przebignie pomyślnie, zostanie wyświetlony komunikat o poprawnie wykonanej operacji, a dany sprzęt będzie dostępny na liście wypożyczonych przedmiotów. W przypadku niepowodzenia zostanie wyświetlony komunikat o błędzie.

## Zwracanie sprzętu.
Użytkownik może za pomocą przycisku **Zwróć** na ekranie głównym aplikacji, przejść do ekranu, na którym będzie mógł zeskanować kod QR w celu zwrotu danego przedmiotu. Jeżeli zwrot przebiegnie poprawnie, sprzęt zostanie usunięty z listy z wypożyczonym aktualnie sprzętem i przeniesiony do historii wypożyczeń oraz zostanie wyświetlony stosowny komunikat. W przypadku niepowodzenia zostanie wyświetlony komunikat o błędzie.

## Informacje o profilu użytkownika
Użytkownik, z poziomu menu aplikacji będzie miał dostęp do ekranu, an którym zostaną wyświetlone wszystkie dane użytkownika podane podczas rejestracji.

## Edycja danych użytwkonika
Z poziomu ekranu z danymi użytkownik, za pomocą przycisku **zmień dane** będzie mógł zostać przekierowany do ekranu, na którym będzie mógł, za pomocą odpowiednich pół tekstowych dokonać edycji danych. Po zakończeniu zmian będzie mógł zatwierdzić swoje zmiany. W przypadku pomyślnego zakończenia operacji zostanie wyświetlony komunikat o sukcesie i nastąpi przekierowanie do ekranu głównego aplikacji. W przeciwnym wypadku zostanie wyświetlony komunikat o błędzie.

## Wylogowanie
Użytkownik będzie mógł wylogować się z aplikacji za pomocą przycisku **Wyloguj** dostępnego w menu aplikacji. W przypadku poprawnego wylogowania nastąpi przekierowanie do ekranu logowania.

## Usuwanie konta
Użytkownik będzie miał możliwość usunięcia swojego konta za pomocą przyisku **Usuń konto** dostępnego w menu aplikacji. W przypadku wyboru tej opcji zostanie wyświetlony ekran z pytaniem, czy użytkownik na pewno chce usunąć swoje konto oraz z informacją o związanych z tym konsekwencjami. W przypadku zatwierdzenia operacji przez użytkownika jego konto oraz informacje o nim zostaną usunięte z bazy i nastąpi przekierowanie do ekranu logowania.
