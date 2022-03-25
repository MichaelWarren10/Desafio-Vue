#!/usr/bin/env bash

echo "##[set-output name=aws_key;]$(echo ${DEV_AWS_ACCESS_KEY_ID})"
echo "##[set-output name=aws_secret;]$(echo ${DEV_AWS_SECRET_ACCESS_KEY})"
echo "##[set-output name=distribution_id;]$(echo ${DEV_DISTRIBUTION_ID})"
echo "##[set-output name=distribution_paths;]$(echo ${DEV_DISTRIBUTION_PATHS})"
echo "##[set-output name=bucket_name;]$(echo ${DEV_BUCKET_NAME})"
echo "##[set-output name=bucket_source_dir;]$(echo ${DEV_BUCKET_SOURCE_DIR})"
echo "##[set-output name=node_env;]development"

if [[ "$1" == "staging" ]]; then
    echo "##[set-output name=aws_key;]$(echo ${STG_AWS_ACCESS_KEY_ID})"
    echo "##[set-output name=aws_secret;]$(echo ${STG_AWS_SECRET_ACCESS_KEY})"
    echo "##[set-output name=distribution_id;]$(echo ${STG_DISTRIBUTION_ID})"
    echo "##[set-output name=distribution_path;]$(echo ${DEV_DISTRIBUTION_PATHS})"
    echo "##[set-output name=bucket_name;]$(echo ${STG_BUCKET_NAME})"
    echo "##[set-output name=bucket_source_dir;]$(echo ${DEV_BUCKET_SOURCE_DIR})"
    echo "##[set-output name=node_env;]staging"
fi

if [[ "$1" == "main" ]]; then
    echo "##[set-output name=aws_key;]$(echo ${PRD_AWS_ACCESS_KEY_ID})"
    echo "##[set-output name=aws_secret;]$(echo ${PRD_AWS_SECRET_ACCESS_KEY})"
    echo "##[set-output name=distribution_id;]$(echo ${PRD_DISTRIBUTION_ID})"
    echo "##[set-output name=distribution_paths;]$(echo ${DEV_DISTRIBUTION_PATHS})"
    echo "##[set-output name=bucket_name;]$(echo ${PRD_BUCKET_NAME})"
    echo "##[set-output name=bucket_source_dir;]$(echo ${DEV_BUCKET_SOURCE_DIR})"
    echo "##[set-output name=node_env;]production"
fi

echo "Ok"
