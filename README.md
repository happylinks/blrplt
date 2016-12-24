[![bitHound Dependencies](https://www.bithound.io/github/happylinks/blrplt/badges/dependencies.svg)](https://www.bithound.io/github/happylinks/blrplt/develop/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/happylinks/blrplt/badges/devDependencies.svg)](https://www.bithound.io/github/happylinks/blrplt/develop/dependencies/npm)  

Read more about it on Medium [here](https://medium.com/@michielwesterbeek/serverless-server-side-rendering-with-redux-saga-a0cf267dc795#.zfh6opdna).  

# BLRPLT
Blrplt is a relatively small boilerplate for [React](https://github.com/facebook/react) + [Redux](https://github.com/reactjs/redux) projects that takes care of server-side-rendering and prefetching API calls with [redux-saga](https://github.com/yelouafi/redux-saga).  
It lets you develop fast locally and will also let you create a server-script that uses redux-saga to prefetch your first api-calls and add them to your store on the server-side.  

It also provides optional scripts to deploy directly to AWS Lambda by using [AWS Serverless Express](https://github.com/awslabs/aws-serverless-express).

## Motivation
At the time of writing there aren't a lot of boilerplates that cover prefetching API-calls with redux-saga during the server-side-rendering.  
By doing this, your app will be rendered with API-data instead of fetching it when the javascript is loaded. This results in faster loading times.

Also, there aren't many boilerplates that cover running a serverless react app on AWS.  
The Serverless Express library is still very new and by providing this boilerplate I want to give more attention to the awesome stuff you can do with it.

The goal is not to provide a boilerplate that decides your React/Redux setup, but provide the rest; a great way to release your app with server-side rendering.

## Installation
To use the boilerplate, use [yarn](https://yarnpkg.com/).

Clone the repository into a folder you want:  
```
git clone git@github.com:happylinks/blrplt.git ProjectName  
```

Install all dependencies for client:  
```
yarn install  
```

Install all dependencies for server:  
```  
cd server && yarn install  
```  
(these are seperated to keep a small server bundle)  

## Get Started
To run a local server and start developing you can run:  
```
yarn run start
```

Now you can create your app and directly see the results with hot-reloading.

## Build for production
When you want to release your app, you can do this two ways.

### Use AWS S3 + Cloudfront for assets, AWS Lambda + API Gateway for server.
To provide a easy deployment of your single page application you can use S3 and Cloudfront for static files.  

1. You should make sure that the settings in package.json are correct. You can name the bucket, stack, and function whatever you want.
You can find the accountId in your AWS account settings. 
```  
"config": {  
  "s3BucketName": "blrplt",  
  "cloudFormationStackName": "blrplt",  
  "region": "eu-west-1",  
  "functionName": "blrplt",  
  "accountId": "xxxxxxxxxxxx"  
}  
```

2. You need to run the config script once:  
```
yarn run aws:config  
```
This adds the variables from the config to the lambda-script runner.  

3. You have to create a IAM user with enough permission. You can check `server/aws-policy.json` for an example.
After you have done this, you have to have your aws-cli installed and set up. Check the docs [here](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html).  

4. You run the script to setup script. This will create a new stack in cloudformation and check if everything is set up correctly.
```yarn run aws:setup```

5. Now you can finally deploy the app. Run ```yarn run deploy```.

6. Go to cloudformation and find the link to your new app.

### DIY hosting
You can also just run the `yarn run build` script to create a node server script and build all client-side files inside the build folder.  
You can put this folder on your server and run `node server.js` there.


## Help!!
If you have any issues using this, please let me know by creating a issue [here](https://github.com/happylinks/blrplt/issues/new).

## What's with the name?  
*react-redux-saga-aws-serverless-boilerplate* sounded stupid. Also, you can't have a cool project without dropping some vowels.  
