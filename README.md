# Products & Categories CRUD Task Using Laravel Framework

## Prerequisite Before Initialization
- PHP >= 8.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension

## Installation Steps
- At first, we have to run =>  composer install  <=
- Then, we have to make sure that [ .env ] file is exist by coping [ .env.example to .env ] and fill these attributes with your database name and credentials ( DB_DATABASE , DB_USERNAME , DB_PASSWORD )
- Then we have to run => php artisan key:generate <=
- Then we have to run => php artisan storage:link <=
- After that, we have to initialize our by running this command =>  php artisan app:setup --fresh --root-password=secret  <= 
- This command will migrate our database and generate a ( root-user to log in to dashboard using it ) => this will return ( email and password to login )
- Finally, for running our application please run =>  php artisan serve   <=

## Finally
- Database Dump also attached to the project.
- Thanks for your consideration of my profile.
