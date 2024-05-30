-- CreateTable
CREATE TABLE "PDF" (
    "id" TEXT NOT NULL,
    "id_d4sign" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "already_downloaded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PDF_pkey" PRIMARY KEY ("id")
);
