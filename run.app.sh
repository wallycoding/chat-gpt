if [ "$APP_ENV" = "production" ] 
then 
  sh -c "npm i && npm run build && npm run start"
else 
  sh -c "npm i && npm run dev"
fi