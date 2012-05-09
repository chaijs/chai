
TESTS = test/*.js
REPORTER = dot
SRC = $(shell find lib -name "*.js" -type f | sort)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^

clean:
	@rm -f chai.js

docs: clean-docs
	@./node_modules/.bin/codex build \
		-i docs
	@cp chai.js docs/out/chai.js
	@mkdir -p docs/out/support/tests
	@mkdir docs/out/support/coverage
	@cp node_modules/mocha/mocha.js docs/out/support/tests
	@cp node_modules/mocha/mocha.css docs/out/support/tests
	@cp -R test/*.js docs/out/support/tests
	@cp test/browser/docs.html docs/out/support/tests/index.html
	@make test-cov
	@cp coverage.html docs/out/support/coverage/index.html
	@node docs/app/app.js

make doc-server:
	@node docs/app/app.js

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

test-display:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd \
		test/display/*.js

.PHONY: clean test docs clean-docs doc-server test-cov lib-cov
