-- CreateTable
CREATE TABLE `sessions` (
    `sessionId` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NULL,
    `scope` VARCHAR(191) NULL,
    `pfp` VARCHAR(191) NULL DEFAULT 'https://cdn.discordapp.com/embed/avatars/0.png',
    `accent` VARCHAR(191) NULL,

    UNIQUE INDEX `sessionId`(`sessionId`),
    UNIQUE INDEX `accessToken`(`accessToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `guildId` VARCHAR(191) NOT NULL,
    `logChannelID` VARCHAR(191) NOT NULL DEFAULT 'false',
    `nsfw` BOOLEAN NOT NULL DEFAULT false,
    `leavemessage` VARCHAR(191) NOT NULL DEFAULT '{"message":"","channel":"false"}',
    `joinmessage` VARCHAR(191) NOT NULL DEFAULT '{"message":"","channel":"false"}',
    `membercount` VARCHAR(191) NOT NULL DEFAULT '{"channel": "false","text": "Members: {COUNT}"}',
    `staffRole` VARCHAR(191) NOT NULL DEFAULT 'false',
    `counting` LONGTEXT NOT NULL DEFAULT '{"channel": "false","countnumber": "1","countmax": "1"}',
    `ticketId` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `guildId`(`guildId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
