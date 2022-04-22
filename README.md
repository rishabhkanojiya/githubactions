# React Build Upload Using Github Action

This simple workflow for backing up and uploading code to s3 folder [vanilla AWS CLI](https://docs.aws.amazon.com/cli/index.html) to sync a directory (either from your repository or generated during your workflow) with a remote S3 bucket.

```

env files Used :-
AWS_S3_BUCKET : copy-rm-test-bucket
SOURCE_DIR : ./build
DEST_DIR : season/static-assets/build
SOURCE_DIR (backup): season/static-assets/build
DEST_DIR (backup : key : BACKUP_DIR): season/static-assets/backup


```
