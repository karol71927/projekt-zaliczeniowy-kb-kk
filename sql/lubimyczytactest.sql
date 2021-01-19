-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Sty 2021, 23:43
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `lubimyczytactest`
--
CREATE DATABASE IF NOT EXISTS `lubimyczytactest` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lubimyczytactest`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `authors`
--

CREATE TABLE `authors` (
  `ID_author` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `info` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `authors`
--

INSERT INTO `authors` (`ID_author`, `name`, `surname`, `info`) VALUES
(1, 'Henryk', 'Sienkiewicz', 'Polski pisarz'),
(2, 'Andrzej', 'Sapkowski', 'Autor książek fantasy'),
(3, 'Fiodor', 'Dostojewski', 'Rosyjski pisarz');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `books`
--

CREATE TABLE `books` (
  `ID_book` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `pages` int(10) NOT NULL,
  `ID_publisher` int(10) UNSIGNED NOT NULL,
  `ID_genre` int(10) UNSIGNED NOT NULL,
  `releaseDate` date NOT NULL,
  `ID_author` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `books`
--

INSERT INTO `books` (`ID_book`, `title`, `description`, `pages`, `ID_publisher`, `ID_genre`, `releaseDate`, `ID_author`) VALUES
(1, 'Krzyzacy', 'Bitwa pod Grunwaldem', 500, 1, 1, '2021-01-01', 1),
(2, 'Wiedzmin', 'Pierwszy tom', 350, 2, 2, '2021-01-05', 2),
(3, 'Wiedzmin 2', 'Drugi tom', 360, 2, 2, '2021-01-03', 2),
(4, 'Zbrodnia i kara', 'Zabicie lichwiarki', 500, 1, 3, '2021-01-01', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `genres`
--

CREATE TABLE `genres` (
  `ID_genre` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `genres`
--

INSERT INTO `genres` (`ID_genre`, `name`) VALUES
(1, 'Historyczne'),
(2, 'Fantastyczne'),
(3, 'Psychologiczne');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20201230220630_authors.js', 1, '2021-01-02 19:50:42'),
(2, '20201230220638_genres.js', 1, '2021-01-02 19:50:43'),
(3, '20201230220648_publishers.js', 1, '2021-01-02 19:50:43'),
(4, '20201230220658_users.js', 1, '2021-01-02 19:50:43'),
(5, '20201230220711_books.js', 1, '2021-01-02 19:50:46'),
(6, '20201230220719_reviews.js', 1, '2021-01-02 19:50:47'),
(7, '20201230220727_lists.js', 1, '2021-01-02 19:50:49'),
(8, '20210102195715_logs.js', 1, '2021-01-02 19:50:49');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lists`
--

CREATE TABLE `lists` (
  `ID_book` int(10) UNSIGNED NOT NULL,
  `ID_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `lists`
--

INSERT INTO `lists` (`ID_book`, `ID_user`) VALUES
(2, 29),
(3, 29);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logs`
--

CREATE TABLE `logs` (
  `ID_log` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `code` varchar(5) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `logs`
--

INSERT INTO `logs` (`ID_log`, `description`, `code`, `createdAt`) VALUES
(1, 'User user2 successfully signed in', '201', '2021-01-02 19:51:28'),
(2, 'User user1 successfully signed in', '201', '2021-01-02 20:10:14'),
(6, 'User user4 successfully signed in', '201', '2021-01-02 21:33:19'),
(7, 'User user1@mail.com successfully logged in', '200', '2021-01-02 21:42:15'),
(8, 'User user1@mail.comfailed to log in because of wrong password', '401', '2021-01-02 21:42:20'),
(9, 'User undefined added review to the book: 1', '201', '2021-01-02 22:20:35'),
(10, 'User user1 successfully logged in', '200', '2021-01-02 22:26:48'),
(11, 'User undefined added review to the book: 1', '201', '2021-01-02 22:26:58'),
(12, 'User user1 successfully logged in', '200', '2021-01-02 22:27:27'),
(13, 'User undefined added review to the book: 1', '201', '2021-01-02 22:27:30'),
(14, 'User user1 successfully logged in', '200', '2021-01-02 22:28:48'),
(15, 'User user1 added review to the book: 1', '201', '2021-01-02 22:28:56'),
(16, 'User user1 updated review of the book: 1', '201', '2021-01-02 22:31:46'),
(17, 'User user1 deleted review of the book: 1', '204', '2021-01-02 22:32:01'),
(18, 'User user1 added book to the list', '201', '2021-01-02 22:38:55'),
(19, 'User user1 added book to the list', '201', '2021-01-02 22:46:29'),
(20, 'User user1 added book to the list', '201', '2021-01-02 22:46:57'),
(21, 'User user1 tried to modify user undefined list', '401', '2021-01-02 22:47:23'),
(22, 'User user1 added book to the list', '201', '2021-01-02 22:55:47'),
(23, 'User user1 tried to modify user 9 list', '401', '2021-01-02 22:55:57'),
(24, 'User user1 deleted book from the list', '204', '2021-01-02 22:57:35'),
(25, 'User user1 tried to modify user 9 list', '401', '2021-01-02 22:57:56'),
(26, 'User user1 tried to modify the review of the user: undefined', '401', '2021-01-02 23:11:13'),
(27, 'User user1 tried to modify the review of the user: [object Object]', '401', '2021-01-02 23:13:00'),
(28, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:16:58'),
(29, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:18:41'),
(30, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:18:42'),
(31, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:18:43'),
(32, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:20:44'),
(33, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:20:56'),
(34, 'User user1 tried to modify the review of the user: 1', '401', '2021-01-02 23:21:39'),
(35, 'User user1 updated review of the book: 1', '201', '2021-01-02 23:23:53'),
(36, 'User user2 successfully logged in', '200', '2021-01-03 17:22:55'),
(37, 'User adminuser successfully signed in', '201', '2021-01-06 16:45:30'),
(38, 'User testuser successfully signed in', '201', '2021-01-06 16:46:43'),
(39, '127.0.0.1 : testuser1 : successfully signed in', '201', '2021-01-06 19:35:00'),
(40, '127.0.0.1 : testuser21 : successfully signed in', '201', '2021-01-06 19:36:48'),
(41, '127.0.0.1 : testadmin : successfully signed in', '201', '2021-01-13 13:37:40'),
(42, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 14:40:15'),
(43, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 14:41:42'),
(44, '127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 14:43:33'),
(45, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 15:21:11'),
(46, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 15:26:57'),
(47, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 15:27:34'),
(48, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 15:48:05'),
(49, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 15:48:41'),
(50, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 16:29:26'),
(51, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-13 16:30:09'),
(52, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-19 23:18:29'),
(53, '::ffff:127.0.0.1 : testadmin : successfully logged in', '200', '2021-01-19 23:20:56'),
(54, '127.0.0.1 : testadmin : successfully logged in', '201', '2021-01-19 23:40:28'),
(55, '127.0.0.1 : testuser : successfully logged in', '201', '2021-01-19 23:40:58');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `publishers`
--

CREATE TABLE `publishers` (
  `ID_publisher` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `publishers`
--

INSERT INTO `publishers` (`ID_publisher`, `name`) VALUES
(1, 'Greg'),
(2, 'superNOWA');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reviews`
--

CREATE TABLE `reviews` (
  `ID_review` int(10) UNSIGNED NOT NULL,
  `ID_book` int(10) UNSIGNED NOT NULL,
  `ID_user` int(10) UNSIGNED NOT NULL,
  `contents` varchar(1000) DEFAULT NULL,
  `date` date NOT NULL,
  `rate` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `reviews`
--

INSERT INTO `reviews` (`ID_review`, `ID_book`, `ID_user`, `contents`, `date`, `rate`) VALUES
(1, 2, 29, 'Fajna ksiazka', '2020-12-21', 5),
(2, 3, 29, 'Ciekawa ksiazka', '2021-01-05', 5),
(3, 1, 29, 'Glupia', '2021-01-02', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ID_user` int(10) UNSIGNED NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`ID_user`, `nickname`, `login`, `password`, `status`, `email`) VALUES
(29, 'testuser', 'testuser', '$argon2id$v=19$m=4096,t=3,p=1$y4gQg6S6uwAtNnjYC62XEw$dn31dPt6OHWaim8kFnltpZQrrwW61OnJgeG/wDAIMlA', 'user', 'testuser@mail.com'),
(32, 'testadmin', 'testadmin', '$argon2id$v=19$m=4096,t=3,p=1$5jr9GsyKqaC+EcDWN3/x7w$hzLMFYxQ9ZeVmFPLCAic8lghCzXggr7hl+1ncFMwvDU', 'admin', 'testadmin@mail.com');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID_author`);

--
-- Indeksy dla tabeli `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID_book`),
  ADD KEY `books_id_publisher_index` (`ID_publisher`),
  ADD KEY `books_id_genre_index` (`ID_genre`),
  ADD KEY `books_id_author_index` (`ID_author`);

--
-- Indeksy dla tabeli `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID_genre`);

--
-- Indeksy dla tabeli `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indeksy dla tabeli `lists`
--
ALTER TABLE `lists`
  ADD KEY `lists_id_book_index` (`ID_book`),
  ADD KEY `lists_id_user_index` (`ID_user`);

--
-- Indeksy dla tabeli `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`ID_log`);

--
-- Indeksy dla tabeli `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`ID_publisher`);

--
-- Indeksy dla tabeli `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ID_review`),
  ADD KEY `reviews_id_book_index` (`ID_book`),
  ADD KEY `reviews_id_user_index` (`ID_user`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_user`),
  ADD UNIQUE KEY `users_login_unique` (`login`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `authors`
--
ALTER TABLE `authors`
  MODIFY `ID_author` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `books`
--
ALTER TABLE `books`
  MODIFY `ID_book` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT dla tabeli `genres`
--
ALTER TABLE `genres`
  MODIFY `ID_genre` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `logs`
--
ALTER TABLE `logs`
  MODIFY `ID_log` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT dla tabeli `publishers`
--
ALTER TABLE `publishers`
  MODIFY `ID_publisher` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `reviews`
--
ALTER TABLE `reviews`
  MODIFY `ID_review` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `ID_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_id_author_foreign` FOREIGN KEY (`ID_author`) REFERENCES `authors` (`ID_author`),
  ADD CONSTRAINT `books_id_genre_foreign` FOREIGN KEY (`ID_genre`) REFERENCES `genres` (`ID_genre`),
  ADD CONSTRAINT `books_id_publisher_foreign` FOREIGN KEY (`ID_publisher`) REFERENCES `publishers` (`ID_publisher`);

--
-- Ograniczenia dla tabeli `lists`
--
ALTER TABLE `lists`
  ADD CONSTRAINT `lists_id_book_foreign` FOREIGN KEY (`ID_book`) REFERENCES `books` (`ID_book`),
  ADD CONSTRAINT `lists_id_user_foreign` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID_user`);

--
-- Ograniczenia dla tabeli `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_id_book_foreign` FOREIGN KEY (`ID_book`) REFERENCES `books` (`ID_book`),
  ADD CONSTRAINT `reviews_id_user_foreign` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
