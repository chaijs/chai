
TESTS = test/*.js
REPORTER = dot
SRC = $(shell find lib -name "*.js" -type f)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^
	@cat support/suffix.js >> chai.js

clean:
	rm -f chai.js

docs: clean-docs
	@./node_modules/.bin/codex build docs \
		--out docs/out
	@./node_modules/.bin/codex serve \
		--out docs/out --static /chai

clean-docs:
	@rm -rf docs/out

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui exports \
		$(TESTS)

.PHONY: clean test docs clean-docs