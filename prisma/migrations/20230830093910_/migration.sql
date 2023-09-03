-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `userId` INTEGER NOT NULL,
    `fullname` TEXT NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `workplace` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `relation` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mode` (
    `modeId` INTEGER NOT NULL AUTO_INCREMENT,
    `modeName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`modeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` TEXT NULL,
    `imageUrl` VARCHAR(200) NULL,
    `createAt` DATETIME(3) NOT NULL,
    `modeId` INTEGER NULL,
    `reactionId` INTEGER NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Post_modeId_key`(`modeId`),
    UNIQUE INDEX `Post_reactionId_key`(`reactionId`),
    UNIQUE INDEX `Post_userId_key`(`userId`),
    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reaction` (
    `reactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameReaction` VARCHAR(191) NOT NULL,
    `imageReaction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`reactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_modeId_fkey` FOREIGN KEY (`modeId`) REFERENCES `Mode`(`modeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_reactionId_fkey` FOREIGN KEY (`reactionId`) REFERENCES `Reaction`(`reactionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
