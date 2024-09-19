alter table [dbo].[Users] add UserName varchar(200) null;
alter table [dbo].[Users] add Password varchar(200) null;
alter table [dbo].[Users] add ChangePassword bit not null default 1;
