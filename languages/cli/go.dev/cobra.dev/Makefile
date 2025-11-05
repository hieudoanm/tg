lint:
	go vet ./...

format:
	go fmt ./...

build:
	go build -o ./bin/tg ./main.go

install:
	go vet ./...
	go fmt ./...
	go build -o ./bin/tg ./main.go
	mkdir -p ~/bin
	cp ./bin/tg ~/bin/
	chmod +x ~/bin/tg
	export PATH="$(HOME)/bin:$(PATH)"
