#!/bin/bash
set -e

# Register
TOKEN=$(curl -s -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"vp","email":"vp@vp.com","password":"pwd"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

echo "Token: $TOKEN"

# Update Profile
curl -s -X PATCH http://localhost:8000/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"VP","is_public":true}' > /dev/null

# Get Public Profile
curl -s -X GET http://localhost:8000/users/vp > /dev/null

# Create Business
BID=$(curl -s -X POST http://localhost:8000/businesses/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"VPs Shop","industry":"Retail"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo "Business ID: $BID"

# Create Product
PID=$(curl -s -X POST http://localhost:8000/businesses/$BID/products/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Apple","description":"Fruit","price":200,"cost_price":100}' | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo "Product ID: $PID"

# Create Sale
curl -s -X POST http://localhost:8000/businesses/$BID/sales/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":'$PID',"quantity":5}' > /dev/null

# Create Expense
curl -s -X POST http://localhost:8000/businesses/$BID/expenses/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount":150,"category":"Transport","description":"Bus"}' > /dev/null

# Get Analytics
curl -s -X GET http://localhost:8000/analytics/$BID/summary \
  -H "Authorization: Bearer $TOKEN"

