#!/usr/bin/env node
'use strict';
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const args = process.argv.slice(2);
const accountId = args[0];
const bucketName = args[1];
const region = args[2] || 'eu-west-1';
const functionName = args[3];
const availableRegions = [
  'us-east-1',
  'us-west-2',
  'eu-west-1',
  'eu-central-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2'
];

if (!accountId || accountId.length !== 12) {
    console.error('You must supply a 12 digit account id as the first argument');
    return;
}

if (!bucketName) {
    console.error('You must supply a bucket name as the second argument');
    return;
}

if (availableRegions.indexOf(region) === -1) {
    console.error(`Amazon API Gateway and Lambda are not available in the ${region} region. Available regions: ${availableRegions.join(',')}`)
    return;
}

if (!functionName) {
    console.error('You must supply a function name as the fourth argument');
    return;
}

modifySimpleProxyFile();
modifyCloudformationFile();

function modifySimpleProxyFile() {
    const simpleProxyApiTemplatePath = path.resolve(__dirname, 'simple-proxy-api.yaml.tmpl');
    const simpleProxyApiPath = path.resolve(__dirname, 'simple-proxy-api.yaml');
    const simpleProxyApi = fs.readFileSync(simpleProxyApiTemplatePath, 'utf8');
    const simpleProxyApiModified = simpleProxyApi
        .replace(/YOUR_ACCOUNT_ID/g, accountId)
        .replace(/YOUR_AWS_REGION/g, region)
        .replace(/YOUR_FUNCTION_NAME/g, functionName);

    fs.writeFileSync(simpleProxyApiPath, simpleProxyApiModified, 'utf8');
}

function modifyCloudformationFile() {
    const cloudformationTemplatePath = path.resolve(__dirname, 'cloudformation.json.tmpl');
    const cloudformationPath = path.resolve(__dirname, 'cloudformation.json');
    const cloudformation = fs.readFileSync(cloudformationTemplatePath, 'utf8');
    const cloudformationModified = cloudformation
        .replace(/YOUR_FUNCTION_NAME/g, functionName);

    fs.writeFileSync(cloudformationPath, cloudformationModified, 'utf8');
}
