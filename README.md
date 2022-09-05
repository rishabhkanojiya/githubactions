# React Build Upload Using Github Action

<p align="center">
  <img height="450" src="https://user-images.githubusercontent.com/30200462/186758550-f19d4a0b-489c-4b20-a549-eb16e143af5b.png" />
</p>

This simple workflow for backing up and uploading code to s3 folder [vanilla AWS CLI](https://docs.aws.amazon.com/cli/index.html) to sync a directory (either from your repository or generated during your workflow) with a remote S3 bucket.

Features :-

1. [Automatically backing up and removing old files while copying new.](#automatically-backup--removing-files)
2. [Reducing build time by caching 'node modules' and 'build'.](#node-modules-and-build-caching)
3. [The ability to upload individual assets](#node_modules-and-build-caching)
4. [Obtain approval/review for the production push.](#obtain-approvalreview-for-the-production-push)
5. [Receive an alert on Slack when the workflow is completed or failed.](#slack-notification)

## Automatically Backup & Removing files

It uses a simple AWS cli command to create a folder with the format "Y-M-D:H:M" for backing up and deleting files.

Example folder Ouptup : `2022-08-25:20-27/`

## 'node_modules' and 'build' Caching

It utilises the [`actions/cache@v3`](https://github.com/actions/cache) for repository-level caching of the "build" and "node modules."

To check for cache hits, it uses the "cache-react-build" and "cache-npm" keys.

```
      - name: Cache Build
        id: cache-react-build
        uses: actions/cache@v3
        with:
          path: |
            **/build
          key: ${{ runner.os }}-cache-react-build-${{needs.readJson.outputs.versionJson}}

      - if: ${{ steps.cache-react-build.outputs.cache-hit != 'true' }}
        name: Creating Build
        run: npm run build
```

## individual Assets Upload

It determines which files to upload by using the version.json file.

    .
    ├── ...
    ├── public
    |   ├──deploy
    │       ├── version.json (to version the build and choose what to upload)
    └── ...

Files includes :

true or false for uploading only CSS files.

```
{
  "name": "github-action-build",
  "version": "4.3.3",
  "css": true,
  "trans": true,
  "images": true,
  "main": true,
  "configs": true,
  "dryrun": false
}

```

`version` : To create a new version key for the step of caching (Linux-cache-react-build-4.3.3).
`css` : 'true' or 'false' for uploading CSS files.
`main` : 'true' or 'false' for uploading Javascript files.

> `dryrun` : 'true' or 'false' in order to execute the AWS cli in 'dryrun' mode

## Obtain approval/review for the Production Push

For manual approvals and timeouts, it utilises Environment protection rules and [Environment level secret keys](#using-environents) from github.

<img align="left" width="350"  src="https://user-images.githubusercontent.com/30200462/186765074-e6f41ca4-6550-44d0-b083-372348c4a12c.png">

<img align="left" width="350"  src="https://user-images.githubusercontent.com/30200462/186766246-81ea12cc-0c28-4c1a-99fb-0b18df18a471.png">

<p align="center">
    <img align="center" width="450" src="https://user-images.githubusercontent.com/30200462/186765623-9f488298-acae-4f11-82a1-ad8f4a0b7fd6.png">
</p>

<br>

## Slack Notification

Get a slack notification on a channel by using a webhook saved in the secret `SLACK_WEBHOOK` variable.

<p align="center">
    <img align="center" width="450" src="https://user-images.githubusercontent.com/30200462/186758844-a22c2481-55fc-41b8-8759-cada62a2ff4c.png">
</p>

## VALUE USED :-

| Key               | Value | Location     | Required |
| ----------------- | ----- | ------------ | -------- |
| `INT_S3_KEY`      |       | `secret env` | **Yes**  |
| `INT_SECRET_KEY`  |       | `secret env` | **Yes**  |
| `PROD_S3_KEY`     |       | `secret env` | **Yes**  |
| `PROD_SECRET_KEY` |       | `secret env` | **Yes**  |

## Using Environents

| Key                 | Value                              | Environent   | Required |
| ------------------- | ---------------------------------- | ------------ | -------- |
| `AWS_S3_BUCKET`     | `prod-bucket-actions/prodFolder`   | `Production` | **Yes**  |
| `SOURCE_DIR`        | `./Dot.net.files.test.web/build`   | `Production` | **Yes**  |
| `DEST_DIR`          | `prod/season/static-assets/build`  | `Production` | **Yes**  |
| `BACKUP_SOURCE_DIR` | `prod/season/static-assets/build`  | `Production` | **Yes**  |
| `BACKUP_DEST_DIR`   | `prod/season/static-assets/backup` | `Production` | **Yes**  |
|                     |                                    |              |          |
| `AWS_S3_BUCKET`     | `int-bucket-actions/intFolder`     | `Dev`        | **Yes**  |
| `SOURCE_DIR`        | `./Dot.net.files.test.web/build`   | `Dev`        | **Yes**  |
| `DEST_DIR`          | `int/season/static-assets/build`   | `Dev`        | **Yes**  |
| `BACKUP_SOURCE_DIR` | `int/season/static-assets/build`   | `Dev`        | **Yes**  |
| `BACKUP_DEST_DIR`   | `int/season/static-assets/backup`  | `Dev`        | **Yes**  |

## Workflows

    .
    ├── ...
    ├── .github
    │   ├── workflows
    │       ├── newPipeline.yml (WorkFlow File for Int then on Prod - Individual)
    │       ├── pipeline.yml (WorkFlow File for Int then on Prod)
    │       ├── int.yml (WorkFlow File for Int)
    │       ├── prod.yml (WorkFlow File for Prod)
    └── ...

## Reusable Workflows

    .
    ├── ...
    ├── .github
    │   ├── workflows
    │       ├── backupCopy.yml
    │       ├── newPipeline.yml
    │       ├── removeCopy.yml
    └── ...

## Files Required :-

    .
    ├── ...
    ├── public
    |   ├──deploy
    │       ├── version.json (to version the build and choose what to upload)
    │       ├── build.sh (Simple script file to upload build)
    └── ...

Rishabh Kanojiya : [aws-copy-rm](https://github.com/rishabhkanojiya/aws-copy-rm)
