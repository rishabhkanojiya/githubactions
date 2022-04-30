# React Build Upload Using Github Action

This simple workflow for backing up and uploading code to s3 folder [vanilla AWS CLI](https://docs.aws.amazon.com/cli/index.html) to sync a directory (either from your repository or generated during your workflow) with a remote S3 bucket.

## VALUE USED :-

| Key                      | Value                              | Location     | Required |
| ------------------------ | ---------------------------------- | ------------ | -------- |
| `AWS_ACCESS_KEY_ID`      |                                    | `secret env` | **Yes**  |
| `AWS_SECRET_ACCESS_KEY`  |                                    | `secret env` | **Yes**  |
| `AWS_S3_BUCKET`          | `copy-rm-test-bucket`              | `secret env` | **Yes**  |
| `PROD_SOURCE_DIR`        | `./Dot.net.files.test.web/build`   | `secret env` | **Yes**  |
| `PORD_DEST_DIR`          | `prod/season/static-assets/build`  | `secret env` | **Yes**  |
| `PROD_BACKUP_SOURCE_DIR` | `prod/season/static-assets/build`  | `secret env` | **Yes**  |
| `PROD_BACKUP_DEST_DIR`   | `prod/season/static-assets/backup` | `secret env` | **Yes**  |
| `INT_SOURCE_DIR`         | `./Dot.net.files.test.web/build`   | `secret env` | **Yes**  |
| `INT_DEST_DIR`           | `int/season/static-assets/build`   | `secret env` | **Yes**  |
| `INT_BACKUP_SOURCE_DIR`  | `int/season/static-assets/build`   | `secret env` | **Yes**  |
| `INT_BACKUP_DEST_DIR`    | `int/season/static-assets/backup`  | `secret env` | **Yes**  |

## Workflows

    .
    ├── ...
    ├── .github
    │   ├── workflows
    │       ├── int.yml (WorkFlow File for Int)
    │       ├── prod.yml (WorkFlow File for Prod)
    └── ...

Rishabh Kanojiya : [aws-copy-rm](https://github.com/rishabhkanojiya/aws-copy-rm)
