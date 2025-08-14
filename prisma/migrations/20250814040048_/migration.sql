/*
  Warnings:

  - A unique constraint covering the columns `[fieldName,ruleType]` on the table `validation_rules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "validation_rules_fieldName_ruleType_key" ON "validation_rules"("fieldName", "ruleType");
