alter table dbo.Complaints add ModifiedOn datetime null
alter table dbo.Attachtments add ContentType varchar(200);
alter table [dbo].[Users] add UserName varchar(200) null;
alter table [dbo].[Users] add Password varchar(200) null;
alter table [dbo].[Users] add ChangePassword bit not null default 1;
alter table [dbo].[Complaints] add ComplaintNumber varchar(100) not null;

