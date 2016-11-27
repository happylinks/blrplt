To setup:

Create user with permissions:
cloudformation:CreateStack
s3:*
iam:CreateRole

One time:
yarn run aws:setup

For new updates:
yarn run deploy
