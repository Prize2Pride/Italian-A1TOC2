CREATE TABLE `chatHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userMessage` text NOT NULL,
	`assistantMessage` text NOT NULL,
	`italianStyle` varchar(50) NOT NULL DEFAULT 'informal',
	`topic` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cultureModules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleArabic` varchar(255) NOT NULL,
	`description` text,
	`category` enum('art','music','cuisine','history','dialects') NOT NULL,
	`level` varchar(10) NOT NULL DEFAULT 'A1',
	`content` text NOT NULL,
	`contentArabic` text,
	`keyPoints` json,
	`imageUrl` varchar(512),
	`videoUrl` varchar(512),
	`references` json,
	`order` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cultureModules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleItalian` varchar(255) NOT NULL,
	`description` text,
	`level` varchar(10) NOT NULL DEFAULT 'A1',
	`order` int NOT NULL,
	`vocabulary` json NOT NULL,
	`grammar` text,
	`readingComprehension` text,
	`readingComprehensionTranslation` text,
	`quizQuestions` json NOT NULL,
	`registerLevel` varchar(50) DEFAULT 'neutro',
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `literatureTimeline` (
	`id` int AUTO_INCREMENT NOT NULL,
	`period` varchar(255) NOT NULL,
	`startYear` int,
	`endYear` int,
	`title` varchar(255) NOT NULL,
	`titleArabic` varchar(255),
	`description` text NOT NULL,
	`descriptionArabic` text,
	`keyWorks` json,
	`level` varchar(10) NOT NULL DEFAULT 'B1',
	`imageUrl` varchar(512),
	`order` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `literatureTimeline_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pronunciationGuides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`word` varchar(255) NOT NULL,
	`translation` varchar(255),
	`ipa` varchar(255) NOT NULL,
	`phoneticBreakdown` text,
	`audioUrl` varchar(512),
	`lessonId` int,
	`registerLevel` varchar(50) DEFAULT 'neutro',
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pronunciationGuides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`preferredRegister` varchar(50) DEFAULT 'neutro',
	`learningPace` varchar(50) DEFAULT 'moderate',
	`enableTTS` boolean DEFAULT true,
	`ttsSpeed` int DEFAULT 100,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `userPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`isCompleted` boolean DEFAULT false,
	`quizScore` int,
	`timeSpent` int,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
