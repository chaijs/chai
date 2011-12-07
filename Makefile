
SRC = $(shell find lib -name "*.js" -type f)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^
	@cat support/suffix.js >> chai.js

clean:
	rm -f chai.js