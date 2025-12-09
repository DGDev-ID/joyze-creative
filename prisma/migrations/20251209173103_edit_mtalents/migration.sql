/*
  Warnings:

  - Added the required column `name` to the `m_talents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_talents" ADD COLUMN     "name" TEXT NOT NULL;
