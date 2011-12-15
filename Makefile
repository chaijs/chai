
TESTS = test/*.js
REPORTER = dot
SRC = $(shell find lib -name "*.js" -type f)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^
	@cat support/suffix.js >> chai.js

clean:
	rm -f chai.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui exports \
		$(TESTS)

.PHONY: clean test