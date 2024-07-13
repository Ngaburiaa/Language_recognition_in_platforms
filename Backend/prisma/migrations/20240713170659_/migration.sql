/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserInfo_UserName_key` ON `UserInfo`(`UserName`);
