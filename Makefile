
TESTS = test/*.js
REPORTER = dot
SRC = $(shell find lib -name "*.js" -type f | sort)

all: chai.js

chai.js: $(SRC)
	@node support/compile $^

clean:
	@rm -f chai.js

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

.PHONY: clean test docs clean-docs doc-server test-cov lib-cov
