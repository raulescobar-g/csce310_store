.PHONY: install run 

install:
	npm i --prefix frontend
	npm i --prefix backend
	
run:
	make install
	@npx concurrently \
		--names "client, server" \
		-c "blue,green" \
		"cd frontend && export NODE_ENV=development && npm run start" \
		"cd backend && export NODE_ENV=development && npm run start" \