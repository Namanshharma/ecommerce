BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[address] (
    [id] INT NOT NULL IDENTITY(1,1),
    [address1] NVARCHAR(1000) NOT NULL,
    [address2] NVARCHAR(1000),
    [city] NVARCHAR(10) NOT NULL,
    [country] NVARCHAR(10) NOT NULL,
    [pinCode] INT NOT NULL,
    [userId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [address_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [address_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[address] ADD CONSTRAINT [address_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
