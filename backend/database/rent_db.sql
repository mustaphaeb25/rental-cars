-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 24 juil. 2025 à 19:06
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
-- Base de données : `rent_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `statut` enum('en attente','validée','refusée') DEFAULT 'en attente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'mus', 'mustapha@gmail.com', '$2b$10$lBTAa5mahDXMFI0pvV7A6eB.gd6WQPL6VmDEudHKfzl72GQ32MAkW', 'client', '2025-07-24 15:16:57');

-- --------------------------------------------------------

--
-- Structure de la table `voitures`
--

CREATE TABLE `voitures` (
  `id` int(11) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `statut` enum('disponible','réservée','indisponible') DEFAULT 'disponible',
  `prix_par_jour` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `voitures`
--

INSERT INTO `voitures` (`id`, `marque`, `modele`, `statut`, `prix_par_jour`, `image_url`, `description`, `created_at`) VALUES
(1, 'Toyota', 'Corolla', 'disponible', 45.00, 'toyota_corolla.jpg', 'Compacte fiable et économique, idéale pour la ville', '2025-07-24 15:16:03'),
(2, 'Renault', 'Clio', 'disponible', 35.00, 'renault_clio.jpg', 'Citadine polyvalente avec faible consommation', '2025-07-24 15:16:03'),
(3, 'Peugeot', '208', 'disponible', 38.00, 'peugeot_208.jpg', 'Design moderne et technologies embarquées', '2025-07-24 15:16:03'),
(4, 'Volkswagen', 'Golf', 'disponible', 55.00, 'vw_golf.jpg', 'Légendaire compacte allemande, confort et performance', '2025-07-24 15:16:03'),
(5, 'Ford', 'Focus', 'disponible', 48.00, 'ford_focus.jpg', 'Dynamique et spacieuse, parfaite pour les familles', '2025-07-24 15:16:03'),
(6, 'Fiat', '500', 'disponible', 42.00, 'fiat_500.jpg', 'Icone italienne, parfaite pour la ville', '2025-07-24 15:16:03'),
(7, 'Citroën', 'C3', 'disponible', 36.00, 'citroen_c3.jpg', 'Confort exceptionnel et design unique', '2025-07-24 15:16:03'),
(8, 'Hyundai', 'i30', 'disponible', 47.00, 'hyundai_i30.jpg', 'Fiabilité coréenne avec garantie longue durée', '2025-07-24 15:16:03'),
(9, 'Kia', 'Ceed', 'disponible', 46.00, 'kia_ceed.jpg', 'Design moderne et espace intérieur généreux', '2025-07-24 15:16:03'),
(10, 'Skoda', 'Octavia', 'disponible', 52.00, 'skoda_octavia.jpg', 'Grande habitabilité et coffre spacieux', '2025-07-24 15:16:03'),
(11, 'BMW', 'Série 3', 'réservée', 85.00, 'bmw_serie3.jpg', 'Luxe allemand et performance sportive', '2025-07-24 15:16:03'),
(12, 'Mercedes', 'Classe A', 'réservée', 80.00, 'mercedes_classeA.jpg', 'Élégance et technologie premium', '2025-07-24 15:16:03'),
(13, 'Audi', 'A4', 'réservée', 82.00, 'audi_a4.jpg', 'Prestige et conduite agréable', '2025-07-24 15:16:03'),
(14, 'Tesla', 'Model 3', 'réservée', 95.00, 'tesla_model3.jpg', 'Électrique performante avec autonomie impressionnante', '2025-07-24 15:16:03'),
(15, 'Land Rover', 'Range Rover Evoque', 'réservée', 110.00, 'range_rover_evoque.jpg', 'SUV premium tout-terrain', '2025-07-24 15:16:03'),
(16, 'Volvo', 'XC60', 'réservée', 75.00, 'volvo_xc60.jpg', 'Sécurité suédoise et confort exceptionnel', '2025-07-24 15:16:03'),
(17, 'Nissan', 'Qashqai', 'disponible', 58.00, 'nissan_qashqai.jpg', 'SUV compact populaire et polyvalent', '2025-07-24 15:16:03');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
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
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
