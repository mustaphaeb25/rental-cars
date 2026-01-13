-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 27 juil. 2025 à 00:08
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `location_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'ali', 'ali@gmail.com', 'ddd', 'msmmsm', '2025-07-25 19:40:07');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_voiture` int(11) NOT NULL,
  `date_début` date NOT NULL,
  `date_fin` date NOT NULL,
  `statut` varchar(20) NOT NULL DEFAULT 'en attente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `id_utilisateur`, `id_voiture`, `date_début`, `date_fin`, `statut`, `created_at`) VALUES
(1, 1, 1, '2025-07-29', '2025-07-31', 'annulée', '2025-07-25 18:25:54'),
(2, 1, 3, '2025-07-26', '2025-07-31', 'validée', '2025-07-26 18:22:32');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('client','admin') DEFAULT 'client',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mot_de_passe`, `role`, `created_at`) VALUES
(1, 'ali', 'ali@gmail.com', '$2b$10$lziagWXEc4RQW9nT.S7sFulFthTaFLWU4okP1MZn7FUNCZKmNwutW', 'client', '2025-07-25 18:24:49'),
(2, 'mustapha', 'mustapha@gmail.com', '$2b$10$OkBhRCBWl2DFHP1.qMkSYu9SYu//2LvQojlComIq9USm2EhZd.qwS', 'admin', '2025-07-25 19:45:05');

-- --------------------------------------------------------

--
-- Structure de la table `voitures`
--

CREATE TABLE `voitures` (
  `id` int(11) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `statut` enum('disponible','réservée','en maintenance') DEFAULT 'disponible',
  `prix_par_jour` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `voitures`
--

INSERT INTO `voitures` (`id`, `marque`, `modele`, `statut`, `prix_par_jour`, `image_url`, `description`, `created_at`) VALUES
(1, 'Toyota', 'Corolla', 'disponible', 45.00, '/uploads/image-1753479684834.jpg', 'Compacte fiable et économique, idéale pour la ville', '2025-07-23 21:07:48'),
(2, 'Renault', 'Clio', 'disponible', 35.00, '/uploads/image-1753479724527.jpeg', 'Citadine polyvalente avec faible consommation', '2025-07-23 21:07:48'),
(3, 'Peugeot', '208', 'disponible', 38.00, '/uploads/image-1753479775658.jpg', 'Design moderne et technologies embarquées', '2025-07-23 21:07:48'),
(4, 'Volkswagen', 'Golf', 'disponible', 55.00, '/uploads/image-1753479899973.jpg', 'Légendaire compacte allemande, confort et performance', '2025-07-23 21:07:48'),
(5, 'Ford', 'Focus', 'disponible', 48.00, '/uploads/image-1753479924792.jpg', 'Dynamique et spacieuse, parfaite pour les familles', '2025-07-23 21:07:48'),
(6, 'Fiat', '500', 'disponible', 42.00, '/uploads/image-1753479951084.jpg', 'Icone italienne, parfaite pour la ville', '2025-07-23 21:07:48'),
(7, 'Citroën', 'C3', 'disponible', 36.00, '/uploads/image-1753479978003.jpg', 'Confort exceptionnel et design unique', '2025-07-23 21:07:48'),
(8, 'Hyundai', 'i30', 'disponible', 47.00, '/uploads/image-1753480004911.jpg', 'Fiabilité coréenne avec garantie longue durée', '2025-07-23 21:07:48'),
(9, 'Kia', 'Ceed', 'disponible', 46.00, '/uploads/image-1753480025042.jpg', 'Design moderne et espace intérieur généreux', '2025-07-23 21:07:48'),
(10, 'Skoda', 'Octavia', 'disponible', 52.00, '/uploads/image-1753480045239.jpg', 'Grande habitabilité et coffre spacieux', '2025-07-23 21:07:48'),
(11, 'BMW', 'Série 3', 'réservée', 85.00, '/uploads/image-1753480068382.jpg', 'Luxe allemand et performance sportive', '2025-07-23 21:07:49'),
(12, 'Mercedes', 'Classe A', 'réservée', 80.00, '/uploads/image-1753480100636.jpg', 'Élégance et technologie premium', '2025-07-23 21:07:49'),
(13, 'Audi', 'A4', 'réservée', 82.00, '/uploads/image-1753480125705.jpg', 'Prestige et conduite agréable', '2025-07-23 21:07:49'),
(14, 'Tesla', 'Model 3', 'réservée', 95.00, '/uploads/image-1753480168840.jpg', 'Électrique performante avec autonomie impressionnante', '2025-07-23 21:07:49'),
(15, 'Land Rover', 'Range Rover Evoque', 'réservée', 110.00, '/uploads/image-1753480192513.jpg', 'SUV premium tout-terrain', '2025-07-23 21:07:49'),
(16, 'Volvo', 'XC60', 'en maintenance', 75.00, '/uploads/image-1753480217586.jpg', 'Sécurité suédoise et confort exceptionnel', '2025-07-23 21:07:49'),
(17, 'Nissan', 'Qashqai', 'en maintenance', 58.00, '/uploads/image-1753480241998.jpg', 'SUV compact populaire et polyvalent', '2025-07-23 21:07:49'),
(18, 'dacia', 'logan', 'disponible', 20.00, '/uploads/image-1753478639651.jpg', NULL, '2025-07-25 21:23:59');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_voiture` (`id_voiture`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `voitures`
--
ALTER TABLE `voitures`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`id_voiture`) REFERENCES `voitures` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
