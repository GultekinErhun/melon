pip install django djangorestframework   

python -m django startproject melon     //generates a starter pack

cd melon
python -m django startapp api


python .\manage.py makemigrations  #we need it to let database to keep our track for what we had done 
python .\manage.py migrate
python .\manage.py runserver
npm run dev// in frontend file




changed_files
mkdir urls.py  //in api   tutorial1
mkdir serializers.py // in api tutorial2

mkdir frontend
cd frontend
npm init -y //creates node modules
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @material-ui/core
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @material-ui/icons



for backend register page testing post
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
