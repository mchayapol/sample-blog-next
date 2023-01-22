# Sample Blog using Next.js

for Web Application Development Class


## Get Blog List
```
curl http://localhost:3000/api/blogs
```

## Create Blog
```
curl -X POST http://localhost:3000/api/blogs \
   -H 'Content-Type: application/json' \
   -d '{"topic":"Hello, World","content":"How are you?","author":"Chayapol"}'
```

## Delete Blog
```
curl -X DELETE http://localhost:3000/api/blogs/63c0fd8d9c027acf8c40d60e
```

## Update Blog
```
curl -X PUT http://localhost:3000/api/blogs \
   -H 'Content-Type: application/json' \
   -d '{"_id":"63c1023b1548084396c292be","topic":"Hi","content":"Yes Sir!","author":"Jack"}'
```

