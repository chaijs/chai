
TESTS = test/*.js
REPORTER = spec
SRC = $(shell find lib -name "*.js" -type f)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^

clean:
	@rm -f chai.js

docs: clean-docs
	@./node_modules/.bin/codex build \
		-i docs
	@cp chai.js docs/out/chai.js
	@mkdir docs/out/tests
	@cp node_modules/mocha/mocha.js docs/out/tests
	@cp node_modules/mocha/mocha.css docs/out/tests
	@cp -R test/*.js docs/out/tests
	@cp test/browser/docs.html docs/out/tests.html
	@./node_modules/.bin/codex serve \
		-d docs/out

clean-docs:
	@rm -rf docs/out

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TESTS)

test-cov: lib-cov
	@CHAI_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@rm -rf lib-cov
	@jscoverage lib lib-cov

.PHONY: clean test docs clean-docs test-cov lib-cov
