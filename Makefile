
TESTS = test/*.js
REPORTER = spec
SRC = $(shell find lib -name "*.js" -type f)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^

clean:
	rm -f chai.js

docs: clean-docs
	@./node_modules/.bin/codex build \
		-i docs
	@cp chai.js docs/out/chai.js
	@./node_modules/.bin/codex serve \
		-d docs/out

clean-docs:
	@rm -rf docs/out

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TESTS)

.PHONY: clean test docs clean-docs
