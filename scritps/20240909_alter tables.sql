alter table dbo.Complaints add ModifiedOn datetime null
alter table dbo.Complaints add TrackingEmail varchar(300) not null
alter table dbo.Attachtments add ContentType varchar(200);
alter table [dbo].[Users] add UserName varchar(200) null;
alter table [dbo].[Users] add Password varchar(200) null;
alter table [dbo].[Users] add ChangePassword bit not null default 1;

