-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_payment_type_id_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "payment_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "PaymentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
