react projesi ini login sayfası oluştur.
LIVE 
apikey : ak_7ecf83631d10baf2f968b1b9ee4ba5bd

local ya da test için apikey : ak_7ecf83631d10baf2f968b1b9ee4ba5MT


login olsun,

curl --location 'http://techauth.eu:3000/api/auth/login' \
--header 'x-api-key: ak_7ecf83631d10baf2f968b1b9ee4ba5bd' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjOGJkOWY1OS00OWUxLTQ0ZDYtYmNiYi0zNzFiYzZlNTk4Y2YiLCJlbWFpbCI6ImFkbWluQGJlbGVrdmlsbGFzLmNvbSIsImlhdCI6MTc3MTAxOTI2OCwiZXhwIjoxNzcxMDIwMTY4fQ.r1MQcJt--MZf34RE0rc1wzCFj938dbTx3V3LVuWQaTo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@belekvillas.com",
    "password": "Mt96121337."
}'

ve kullanıcıları listelesin.


curl --location 'http://techauth.eu:3000/api/admin/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjOGJkOWY1OS00OWUxLTQ0ZDYtYmNiYi0zNzFiYzZlNTk4Y2YiLCJlbWFpbCI6ImFkbWluQGJlbGVrdmlsbGFzLmNvbSIsImlhdCI6MTc3MTAxOTI2OCwiZXhwIjoxNzcxMDIwMTY4fQ.r1MQcJt--MZf34RE0rc1wzCFj938dbTx3V3LVuWQaTo' \
--header 'x-api-key: ak_7ecf83631d10baf2f968b1b9ee4ba5bd' \
--data ''


Sen ui/ux yönü çok güçlü bir frontend uzmanısın. güzel bir tasarım uygula.