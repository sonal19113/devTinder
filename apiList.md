##authRouter
-POST /signup
-POST /login
-POST /logout

##profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

##requestRouter
status['interested','ignored','accepted','rejected'];
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


##userRoute
-GET /user/connections
-GET /user/request/received
-GET /user/feed