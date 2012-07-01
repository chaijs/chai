
TESTS = test/*.js
REPORTER = dot

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

lib-cov: clean-cov
	@jscoverage lib lib-cov

clean-cov:
	@rm -f coverage.html
	@rm -fr lib-cov

.PHONY: all chai.js clean clean-cov test docs clean-docs doc-server test-cov lib-cov
