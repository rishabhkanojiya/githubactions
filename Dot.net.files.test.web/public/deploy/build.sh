#!/bin/sh

set -e


if [ -z "$AWS_S3_BUCKET" ]; then
    echo "AWS_S3_BUCKET is not set. Quitting."
    exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
    echo "AWS_ACCESS_KEY_ID is not set. Quitting."
    exit 1
fi

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "AWS_SECRET_ACCESS_KEY is not set. Quitting."
    exit 1
fi

# Default to us-east-1 if AWS_REGION not set.
if [ -z "$AWS_REGION" ]; then
    AWS_REGION="us-east-1"
fi

makeProdBackup() {

    if [[ "$IS_PROD" == "true" ]]; then
        # start chrome http://18.215.140.255/admin/Template

        echo -e "\n-----CREATING BACKUP-------\n"

        sh -c "aws s3 sync s3://${AWS_S3_BUCKET}/${SOURCE_DIR_BACKUP:-.} s3://${AWS_S3_BUCKET}/${DEST_DIR_BACKUP:-./backup}/$(date +%Y-%m-%d:%H-%M) \
              --profile s3-copy-rm-profile \
              --no-progress \
              ${args}"

        echo -e "\n-----CREATING BACKUP DONE-------\n"
    else
        echo -e "Dev Environment Not Creating Backup \n"
    fi

}

removeCode() {

    if [[ "$IS_RM" == "true" ]]; then
    
        makeProdBackup
        echo -e "\n-----Removing Files-------\n"

        sh -c "aws s3 rm s3://${AWS_S3_BUCKET}/${SOURCE_DIR_BACKUP:-.} --exclude '*' \
                ${args} --recursive \
                --profile s3-copy-rm-profile"

        echo -e "\n-----Removing Files Done-------\n"
        
    else
        echo -e "Not Removing Files \n"
    fi


}

aws configure --profile s3-copy-rm-profile <<-EOF >/dev/null 2>&1
${AWS_ACCESS_KEY_ID}
${AWS_SECRET_ACCESS_KEY}
${AWS_REGION}
text
EOF

removeCode
echo -e "\n-----Copying Files-------\n"

sh -c "aws s3 sync ${SOURCE_DIR_COPY:-.} s3://${AWS_S3_BUCKET}/${DEST_DIR_COPY} \
              --profile s3-copy-rm-profile \
              --no-progress \
              ${args}"

echo -e "\n-----Copying Files Done-------\n"

aws configure --profile s3-copy-rm-profile <<-EOF >/dev/null 2>&1
null
null
null
text
EOF
