This is an application to demonstrate the auto deployment with AWS code pipeline and zero down time code deployment.

AWS configuration for code pipeline
Create a two stage code pipe line to access data from git hub repository to deploy it on ec2 instance using AWS code deploy. Use demoCodePipeline as the repository.

Work Flow:

Any repository make use of AWS code deploy should have appspec.yml file in the root directory. 

Code deploy agent on Ec2 instance will do the actions in yml file in order and make the deployment complete

Zero down time considerations:

This application is controlled by pm2 and it make use of pm2's clustering 
It is started with -i 2(scripts/start_server) which means two cluster workers. 
On restrat, the code deploy will be doing a pm2 reload which will be making sure to kill the old instances once the new instance are live.

Inside the application, a graceful shutdown hook is added which will make sure that before closing the process, all outstanding requests in the process are responded properly.

So pm2 reload along with graceful shutdown makes sure that the application will deploy in zero down time.
